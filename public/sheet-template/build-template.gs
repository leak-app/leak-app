/**
 * Leak App — Google Sheets report template builder (Google Apps Script).
 *
 * Paste into Extensions → Apps Script of the spreadsheet Leak created for you, then run
 * `buildTemplate`. Optionally run `loadSampleData` to preview the report with fake data
 * (the next nightly sync overwrites it with your real data).
 *
 * Design:
 *  - `_`-prefixed tabs hold plain values written by the API sync (full snapshot each run).
 *  - Every other tab is formulas only, so the sync can never overwrite a formula.
 *  - Re-running `buildTemplate` rebuilds the report tabs and keeps the synced data.
 *
 * Schema contract for the sync module: wiki/sheet-template/README.md.
 */

const TIMEZONE = 'Asia/Ho_Chi_Minh';
const MONEY = '#,##0 "₫"';
const PERCENT = '0.0%';
const YEAR_MONTH = '0000"-"00'; // 202610 → 2026-10
const SCHEMA_VERSION = 1;

const COLOR = {
  header: '#1E293B',
  headerText: '#FFFFFF',
  tile: '#F1F5F9',
  muted: '#64748B',
  accent: '#38BDF8',
  leak: '#F87171',
  rawTab: '#94A3B8',
  reportTab: '#38BDF8',
  over: '#FECACA',
  overText: '#991B1B',
  warn: '#FEF3C7',
  warnText: '#92400E',
};

const REPORT = {
  overview: 'Tổng quan',
  monthly: 'Theo tháng',
  budget: 'Ngân sách',
  leaks: 'Rò rỉ',
  accounts: 'Tài khoản',
  goals: 'Mục tiêu',
};
const LISTS = '_lists';

// Raw data tabs. Column letters are referenced by the formulas below — keep them in sync.
const RAW = {
  _transactions: {
    headers: [
      'id', 'date', 'year_month', 'type', 'amount', 'category',
      'account', 'description', 'outcome', 'leak_reason', 'reviewed_at',
    ],
    formats: { 2: 'dd/MM/yyyy', 3: '0', 5: '#,##0.##', 11: 'dd/MM/yyyy HH:mm' },
    rows: 20000,
  },
  _accounts: {
    headers: ['id', 'name', 'type', 'initial_balance', 'current_balance'],
    formats: { 4: '#,##0.##', 5: '#,##0.##' },
    rows: 500,
  },
  _budgets: {
    headers: ['year_month', 'category', 'amount'],
    formats: { 1: '0', 3: '#,##0.##' },
    rows: 5000,
  },
  _goals: {
    headers: ['id', 'name', 'target_amount', 'saved_amount', 'target_date'],
    formats: { 3: '#,##0.##', 4: '#,##0.##', 5: 'dd/MM/yyyy' },
    rows: 500,
  },
  _meta: {
    headers: ['key', 'value'],
    formats: { 2: '@' },
    rows: 100,
  },
};

// Open-ended column references into the raw tabs (all start at row 2, so they have equal size).
const rawCol = (sheet, letter) => `'${sheet}'!$${letter}$2:$${letter}`;
const TX = {
  date: rawCol('_transactions', 'B'),
  month: rawCol('_transactions', 'C'),
  type: rawCol('_transactions', 'D'),
  amount: rawCol('_transactions', 'E'),
  category: rawCol('_transactions', 'F'),
  outcome: rawCol('_transactions', 'I'),
  reason: rawCol('_transactions', 'J'),
};
const TX_TABLE = "'_transactions'!$A$1:$K"; // for QUERY, header in row 1
const BUDGET = {
  month: rawCol('_budgets', 'A'),
  category: rawCol('_budgets', 'B'),
  amount: rawCol('_budgets', 'C'),
};
const ACCOUNT = {
  name: rawCol('_accounts', 'B'),
  type: rawCol('_accounts', 'C'),
  initial: rawCol('_accounts', 'D'),
  current: rawCol('_accounts', 'E'),
};
const MONTH = `'${REPORT.overview}'!$B$3`; // the month picked on the overview tab

const LEAK_REASONS = [
  ['IMPULSIVE', 'Bốc đồng'],
  ['UNUSED', 'Mua về không dùng'],
  ['OVERPRICED', 'Quá đắt so với giá trị'],
  ['SOCIAL_PRESSURE', 'Áp lực xã hội'],
  ['FORGOTTEN_SUB', 'Quên hủy đăng ký'],
  ['OTHER', 'Lý do khác'],
];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Leak')
    .addItem('Dựng lại mẫu báo cáo', 'buildTemplate')
    .addItem('Nạp dữ liệu mẫu', 'loadSampleData')
    .addItem('Xóa dữ liệu đồng bộ', 'clearSyncedData')
    .addToUi();
}

// ───────────────────────────── Entry points ─────────────────────────────

function buildTemplate() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setSpreadsheetTimeZone(TIMEZONE);
  // setFormula() parses argument separators using the spreadsheet locale (vi_VN expects ';'),
  // so build under en_US and switch to vi_VN at the end. Stored formulas are locale independent.
  ss.setSpreadsheetLocale('en_US');

  Object.keys(RAW).forEach((name) => ensureRawSheet_(ss, name));

  // Report tabs are formulas only: drop and recreate them (references stay valid because
  // every sheet exists before any formula is written).
  const names = Object.keys(REPORT).map((k) => REPORT[k]).concat([LISTS]);
  names.forEach((name) => {
    const old = ss.getSheetByName(name);
    if (old) ss.deleteSheet(old);
  });
  const sheets = {};
  names.forEach((name) => (sheets[name] = ss.insertSheet(name)));

  buildLists_(sheets[LISTS]);
  buildOverview_(ss, sheets[REPORT.overview]);
  buildMonthly_(sheets[REPORT.monthly]);
  buildBudget_(sheets[REPORT.budget]);
  buildLeaks_(sheets[REPORT.leaks]);
  buildAccounts_(sheets[REPORT.accounts]);
  buildGoals_(sheets[REPORT.goals]);

  removeDefaultSheets_(ss);
  orderSheets_(ss);
  sheets[LISTS].hideSheet();
  ss.setActiveSheet(sheets[REPORT.overview]);
  SpreadsheetApp.flush();
  try {
    ss.setSpreadsheetLocale('vi_VN'); // display only: 1.500.000 ₫
  } catch (e) {
    console.warn('Could not set locale vi_VN: ' + e);
  }
}

function loadSampleData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  if (ss.getSheetByName('_transactions') === null) {
    throw new Error('Run buildTemplate first.');
  }
  if (ss.getSheetByName('_transactions').getLastRow() > 1) {
    const answer = ui.alert(
      'Dữ liệu hiện có sẽ bị ghi đè',
      'Các tab _transactions, _accounts, _budgets, _goals, _meta đã có dữ liệu. Thay bằng dữ liệu mẫu?',
      ui.ButtonSet.YES_NO,
    );
    if (answer !== ui.Button.YES) return;
  }
  clearRawData_(ss);

  const sample = generateSample_(new Date());
  writeRows_(ss, '_transactions', sample.transactions);
  writeRows_(ss, '_accounts', sample.accounts);
  writeRows_(ss, '_budgets', sample.budgets);
  writeRows_(ss, '_goals', sample.goals);
  writeRows_(ss, '_meta', sample.meta);

  // Point the overview at the latest month that has data.
  const months = sample.transactions.map((r) => r[2]);
  ss.getSheetByName(REPORT.overview).getRange('B3').setValue(Math.max.apply(null, months));
}

function clearSyncedData() {
  const ui = SpreadsheetApp.getUi();
  const answer = ui.alert(
    'Xóa dữ liệu đồng bộ',
    'Xóa toàn bộ hàng dữ liệu trong các tab bắt đầu bằng "_"? Lần đồng bộ tiếp theo sẽ ghi lại.',
    ui.ButtonSet.YES_NO,
  );
  if (answer === ui.Button.YES) clearRawData_(SpreadsheetApp.getActiveSpreadsheet());
}

// ───────────────────────────── Raw tabs ─────────────────────────────

function ensureRawSheet_(ss, name) {
  const spec = RAW[name];
  const sheet = ss.getSheetByName(name) || ss.insertSheet(name);

  if (sheet.getMaxRows() < spec.rows) {
    sheet.insertRowsAfter(sheet.getMaxRows(), spec.rows - sheet.getMaxRows());
  }
  sheet
    .getRange(1, 1, 1, spec.headers.length)
    .setValues([spec.headers])
    .setBackground(COLOR.header)
    .setFontColor(COLOR.headerText)
    .setFontWeight('bold');
  Object.keys(spec.formats).forEach((column) => {
    sheet.getRange(2, Number(column), sheet.getMaxRows() - 1, 1).setNumberFormat(spec.formats[column]);
  });
  sheet.setFrozenRows(1);
  sheet.setTabColor(COLOR.rawTab);

  sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach((p) => p.remove());
  sheet.protect().setDescription('Ghi bởi Leak sync — không sửa tay').setWarningOnly(true);
}

function clearRawData_(ss) {
  Object.keys(RAW).forEach((name) => {
    const sheet = ss.getSheetByName(name);
    if (sheet && sheet.getMaxRows() > 1) {
      sheet.getRange(2, 1, sheet.getMaxRows() - 1, RAW[name].headers.length).clearContent();
    }
  });
}

function writeRows_(ss, name, rows) {
  if (rows.length === 0) return;
  ss.getSheetByName(name).getRange(2, 1, rows.length, rows[0].length).setValues(rows);
}

// ───────────────────────────── Shared styling ─────────────────────────────

function styleTitle_(sheet, text) {
  sheet.getRange('A1').setValue(text).setFontSize(16).setFontWeight('bold');
  sheet.setHiddenGridlines(true);
  sheet.setTabColor(COLOR.reportTab);
}

function styleHeader_(range) {
  range
    .setBackground(COLOR.header)
    .setFontColor(COLOR.headerText)
    .setFontWeight('bold')
    .setVerticalAlignment('middle');
}

function styleSection_(range) {
  range.setFontWeight('bold').setFontSize(12);
}

function styleTiles_(labels, values) {
  labels.setFontColor(COLOR.muted).setFontSize(9).setBackground(COLOR.tile);
  values.setFontSize(16).setFontWeight('bold').setBackground(COLOR.tile);
}

// ───────────────────────────── Helper list ─────────────────────────────

function buildLists_(sheet) {
  sheet.getRange('A1').setValue('months (desc)');
  sheet
    .getRange('A2')
    .setFormula(
      `=IFERROR(SORT(UNIQUE(FILTER(${TX.month},${TX.month}<>"")),1,FALSE),YEAR(TODAY())*100+MONTH(TODAY()))`,
    );
  sheet.getRange('A2:A').setNumberFormat(YEAR_MONTH);
}

// ───────────────────────────── Tổng quan ─────────────────────────────

function buildOverview_(ss, sheet) {
  styleTitle_(sheet, 'Leak — Tổng quan');
  sheet.setColumnWidths(1, 7, 150);

  sheet.getRange('A2').setValue('Cập nhật lần cuối').setFontColor(COLOR.muted);
  sheet
    .getRange('B2')
    .setFormula(`=IFERROR(VLOOKUP("last_synced_at",'_meta'!$A:$B,2,FALSE),"Chưa đồng bộ")`)
    .setHorizontalAlignment('left');

  const now = new Date();
  sheet.getRange('A3').setValue('Tháng').setFontWeight('bold');
  sheet
    .getRange('B3')
    .setValue(now.getFullYear() * 100 + (now.getMonth() + 1))
    .setNumberFormat(YEAR_MONTH)
    .setHorizontalAlignment('left')
    .setFontWeight('bold')
    .setBackground('#E0F2FE')
    .setDataValidation(
      SpreadsheetApp.newDataValidation()
        .requireValueInRange(ss.getSheetByName(LISTS).getRange('A2:A'), true)
        .setAllowInvalid(true)
        .build(),
    );
  sheet.getRange('C3').setValue('← chọn tháng để xem báo cáo').setFontColor(COLOR.muted).setFontSize(9);

  const expense = (extra) =>
    `=SUMIFS(${TX.amount},${TX.month},${MONTH},${TX.type},"EXPENSE"${extra || ''})`;
  sheet
    .getRange('A5:G5')
    .setValues([['Thu nhập', 'Chi tiêu', 'Chênh lệch', 'Chi rò rỉ', 'Tỷ lệ rò rỉ', 'Chưa đánh giá', 'Tổng tài sản']]);
  sheet.getRange('A6:G6').setFormulas([
    [
      `=SUMIFS(${TX.amount},${TX.month},${MONTH},${TX.type},"INCOME")`,
      expense(),
      '=A6-B6',
      expense(`,${TX.outcome},"LEAK"`),
      '=IFERROR(D6/B6,0)',
      `=COUNTIFS(${TX.month},${MONTH},${TX.type},"EXPENSE",${TX.outcome},"UNREVIEWED")`,
      `=SUM(${ACCOUNT.current})`,
    ],
  ]);
  styleTiles_(sheet.getRange('A5:G5'), sheet.getRange('A6:G6'));
  sheet.getRange('A6:D6').setNumberFormat(MONEY);
  sheet.getRange('E6').setNumberFormat(PERCENT);
  sheet.getRange('F6').setNumberFormat('0');
  sheet.getRange('G6').setNumberFormat(MONEY);
  sheet.getRange('D6').setFontColor(COLOR.leak);
  sheet.getRange('A6:G6').setHorizontalAlignment('left');

  // Spending by category
  styleSection_(sheet.getRange('A8').setValue('Chi tiêu theo danh mục'));
  sheet
    .getRange('A9')
    .setFormula(
      `=IFERROR(QUERY(${TX_TABLE},"select F, sum(E) where C = "&${MONTH}&" and D = 'EXPENSE' group by F order by sum(E) desc label F 'Danh mục', sum(E) 'Số tiền'",1),"")`,
    );
  styleHeader_(sheet.getRange('A9:B9'));
  sheet.getRange('B10:B24').setNumberFormat(MONEY);
  sheet.insertChart(
    sheet
      .newChart()
      .setChartType(Charts.ChartType.BAR)
      .addRange(sheet.getRange('A9:B24'))
      .setNumHeaders(1)
      .setPosition(8, 4, 0, 0)
      .setOption('title', 'Chi tiêu theo danh mục')
      .setOption('legend', { position: 'none' })
      .setOption('colors', [COLOR.accent])
      .setOption('reverseCategories', true)
      .setOption('width', 600)
      .setOption('height', 320)
      .build(),
  );

  // Spending by day
  styleSection_(sheet.getRange('A27').setValue('Chi tiêu theo ngày'));
  sheet
    .getRange('A28')
    .setFormula(
      `=IFERROR(QUERY(${TX_TABLE},"select B, sum(E) where C = "&${MONTH}&" and D = 'EXPENSE' group by B order by B label B 'Ngày', sum(E) 'Chi tiêu'",1),"")`,
    );
  styleHeader_(sheet.getRange('A28:B28'));
  sheet.getRange('A29:A59').setNumberFormat('dd/MM').setHorizontalAlignment('left');
  sheet.getRange('B29:B59').setNumberFormat(MONEY);
  sheet.insertChart(
    sheet
      .newChart()
      .setChartType(Charts.ChartType.COLUMN)
      .addRange(sheet.getRange('A28:B59'))
      .setNumHeaders(1)
      .setPosition(27, 4, 0, 0)
      .setOption('title', 'Chi tiêu theo ngày')
      .setOption('legend', { position: 'none' })
      .setOption('colors', [COLOR.accent])
      .setOption('width', 600)
      .setOption('height', 300)
      .build(),
  );
}

// ───────────────────────────── Theo tháng ─────────────────────────────

function buildMonthly_(sheet) {
  styleTitle_(sheet, 'Leak — Theo tháng');
  sheet.setColumnWidths(1, 1, 100);
  sheet.setColumnWidths(2, 5, 140);
  sheet.setColumnWidths(7, 1, 180);

  sheet
    .getRange('A3:G3')
    .setValues([['Tháng', 'Thu nhập', 'Chi tiêu', 'Chênh lệch', 'Chi rò rỉ', 'Tỷ lệ rò rỉ', 'So với tháng chi nhiều nhất']]);
  styleHeader_(sheet.getRange('A3:G3'));

  // SUMIFS does not expand array criteria inside ARRAYFORMULA, so these are per-row formulas.
  // Only column A (the month list) is a spilled formula.
  sheet.getRange('A4').setFormula(`=IFERROR(SORT(UNIQUE(FILTER(${TX.month},${TX.month}<>"")),1,FALSE),"")`);
  const monthRows = [];
  for (let row = 4; row <= 39; row++) {
    const byMonth = (type, extra) =>
      `=IF($A${row}="","",SUMIFS(${TX.amount},${TX.month},$A${row},${TX.type},"${type}"${extra || ''}))`;
    monthRows.push([
      byMonth('INCOME'),
      byMonth('EXPENSE'),
      `=IF($A${row}="","",B${row}-C${row})`,
      byMonth('EXPENSE', `,${TX.outcome},"LEAK"`),
      `=IF($A${row}="","",IFERROR(E${row}/C${row},0))`,
      `=IF($A${row}="","",SPARKLINE($C${row},{"charttype","bar";"max",MAX($C$4:$C);"color1","${COLOR.accent}"}))`,
    ]);
  }
  sheet.getRange(4, 2, monthRows.length, 6).setFormulas(monthRows);

  sheet.getRange('A4:A39').setNumberFormat(YEAR_MONTH).setHorizontalAlignment('left');
  sheet.getRange('B4:E39').setNumberFormat(MONEY);
  sheet.getRange('F4:F39').setNumberFormat(PERCENT);
  sheet.getRange('E4:E39').setFontColor(COLOR.leak);
  sheet.setFrozenRows(3);

  // Latest 12 months (the table is newest first, so the axis is reversed).
  sheet.insertChart(
    sheet
      .newChart()
      .setChartType(Charts.ChartType.COLUMN)
      .addRange(sheet.getRange('A3:A15'))
      .addRange(sheet.getRange('C3:C15'))
      .addRange(sheet.getRange('E3:E15'))
      .setNumHeaders(1)
      .setOption('useFirstColumnAsDomain', true)
      .setPosition(3, 9, 0, 0)
      .setOption('title', 'Chi tiêu và chi rò rỉ theo tháng')
      .setOption('colors', [COLOR.accent, COLOR.leak])
      .setOption('reverseCategories', true)
      .setOption('legend', { position: 'bottom' })
      .setOption('width', 620)
      .setOption('height', 320)
      .build(),
  );
}

// ───────────────────────────── Ngân sách ─────────────────────────────

function buildBudget_(sheet) {
  styleTitle_(sheet, 'Leak — Ngân sách');
  sheet.setColumnWidths(1, 1, 220);
  sheet.setColumnWidths(2, 4, 150);

  sheet.getRange('A2').setValue('Tháng').setFontWeight('bold');
  sheet.getRange('B2').setFormula(`=${MONTH}`).setNumberFormat(YEAR_MONTH).setHorizontalAlignment('left');
  sheet.getRange('D2').setValue('Chi ngoài ngân sách').setFontColor(COLOR.muted);
  sheet
    .getRange('E2')
    .setFormula(
      `=SUMIFS(${TX.amount},${TX.month},${MONTH},${TX.type},"EXPENSE")-SUM(C5:C)`,
    )
    .setNumberFormat(MONEY);

  sheet.getRange('A3').setValue('Tổng cộng');
  sheet.getRange('B3:E3').setFormulas([['=SUM(B5:B)', '=SUM(C5:C)', '=B3-C3', '=IFERROR(C3/B3,0)']]);
  sheet.getRange('A3:E3').setFontWeight('bold').setBackground(COLOR.tile);
  sheet.getRange('B3:D3').setNumberFormat(MONEY);
  sheet.getRange('E3').setNumberFormat('0%');

  sheet.getRange('A4:E4').setValues([['Danh mục', 'Ngân sách', 'Thực chi', 'Còn lại', '% đã dùng']]);
  styleHeader_(sheet.getRange('A4:E4'));

  sheet
    .getRange('A5')
    .setFormula(
      `=IFERROR(FILTER(${BUDGET.category},${BUDGET.month}=${MONTH},${BUDGET.amount}>0),"")`,
    );
  // Per-row formulas: SUMIFS does not expand array criteria inside ARRAYFORMULA.
  const budgetRows = [];
  for (let row = 5; row <= 44; row++) {
    budgetRows.push([
      `=IF($A${row}="","",SUMIFS(${BUDGET.amount},${BUDGET.month},${MONTH},${BUDGET.category},$A${row}))`,
      `=IF($A${row}="","",SUMIFS(${TX.amount},${TX.month},${MONTH},${TX.type},"EXPENSE",${TX.category},$A${row}))`,
      `=IF($A${row}="","",B${row}-C${row})`,
      `=IF($A${row}="","",IFERROR(C${row}/B${row},0))`,
    ]);
  }
  sheet.getRange(5, 2, budgetRows.length, 4).setFormulas(budgetRows);
  sheet.getRange('B5:D200').setNumberFormat(MONEY);
  sheet.getRange('E5:E200').setNumberFormat('0%');

  const range = sheet.getRange('E3:E200');
  sheet.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule()
      .whenNumberGreaterThanOrEqualTo(1)
      .setBackground(COLOR.over)
      .setFontColor(COLOR.overText)
      .setRanges([range])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenNumberBetween(0.8, 0.9999)
      .setBackground(COLOR.warn)
      .setFontColor(COLOR.warnText)
      .setRanges([range])
      .build(),
  ]);
  sheet.setFrozenRows(4);
}

// ───────────────────────────── Rò rỉ ─────────────────────────────

function buildLeaks_(sheet) {
  styleTitle_(sheet, 'Leak — Báo cáo rò rỉ');
  sheet.setColumnWidths(1, 1, 220);
  sheet.setColumnWidths(2, 1, 160);
  sheet.setColumnWidths(3, 1, 240);
  sheet.setColumnWidths(4, 1, 140);
  sheet.setColumnWidths(5, 1, 30);
  sheet.setColumnWidths(6, 1, 180);
  sheet.setColumnWidths(7, 2, 120);

  sheet.getRange('A2').setValue('Tháng').setFontWeight('bold');
  sheet.getRange('B2').setFormula(`=${MONTH}`).setNumberFormat(YEAR_MONTH).setHorizontalAlignment('left');

  const leakFilter = `${TX.month},${MONTH},${TX.type},"EXPENSE",${TX.outcome},"LEAK"`;

  styleSection_(sheet.getRange('A3').setValue('Theo lý do'));
  sheet.getRange('A4:D4').setValues([['Lý do', 'Số tiền', 'Số khoản', 'Mã']]);
  styleHeader_(sheet.getRange('A4:D4'));

  const labels = LEAK_REASONS.map(([key, label]) => [label, key]);
  const amounts = LEAK_REASONS.map((_, i) => {
    const row = 5 + i;
    return [
      `=SUMIFS(${TX.amount},${leakFilter},${TX.reason},$D${row})`,
      `=COUNTIFS(${leakFilter},${TX.reason},$D${row})`,
    ];
  });
  const lastReason = 4 + LEAK_REASONS.length; // 10
  sheet.getRange(5, 1, labels.length, 1).setValues(labels.map((r) => [r[0]]));
  sheet.getRange(5, 4, labels.length, 1).setValues(labels.map((r) => [r[1]]));
  sheet.getRange(5, 2, amounts.length, 2).setFormulas(amounts);
  sheet.getRange(lastReason + 1, 1, 2, 1).setValues([['Chưa ghi lý do'], ['Tổng rò rỉ']]);
  sheet.getRange(lastReason + 1, 2, 2, 2).setFormulas([
    [`=B${lastReason + 2}-SUM(B5:B${lastReason})`, `=C${lastReason + 2}-SUM(C5:C${lastReason})`],
    [`=SUMIFS(${TX.amount},${leakFilter})`, `=COUNTIFS(${leakFilter})`],
  ]);
  sheet.getRange(`A${lastReason + 2}:D${lastReason + 2}`).setFontWeight('bold').setBackground(COLOR.tile);
  sheet.getRange(`B5:B${lastReason + 2}`).setNumberFormat(MONEY).setFontColor(COLOR.leak);
  sheet.getRange(`C5:C${lastReason + 2}`).setNumberFormat('0').setHorizontalAlignment('left');
  sheet.getRange(`D5:D${lastReason}`).setFontColor(COLOR.muted).setFontSize(9);

  styleSection_(sheet.getRange('F3').setValue('Theo danh mục'));
  sheet
    .getRange('F4')
    .setFormula(
      `=IFERROR(QUERY(${TX_TABLE},"select F, sum(E), count(E) where C = "&${MONTH}&" and D = 'EXPENSE' and I = 'LEAK' group by F order by sum(E) desc label F 'Danh mục', sum(E) 'Số tiền', count(E) 'Số khoản'",1),"")`,
    );
  styleHeader_(sheet.getRange('F4:H4'));
  sheet.getRange('G5:G20').setNumberFormat(MONEY);

  styleSection_(sheet.getRange('A15').setValue('10 khoản rò rỉ lớn nhất'));
  sheet
    .getRange('A16')
    .setFormula(
      `=IFERROR(QUERY(${TX_TABLE},"select B, F, H, E where C = "&${MONTH}&" and D = 'EXPENSE' and I = 'LEAK' order by E desc limit 10 label B 'Ngày', F 'Danh mục', H 'Mô tả', E 'Số tiền'",1),"")`,
    );
  styleHeader_(sheet.getRange('A16:D16'));
  sheet.getRange('A17:A26').setNumberFormat('dd/MM/yyyy').setHorizontalAlignment('left');
  sheet.getRange('D17:D26').setNumberFormat(MONEY);
}

// ───────────────────────────── Tài khoản ─────────────────────────────

function buildAccounts_(sheet) {
  styleTitle_(sheet, 'Leak — Tài khoản');
  sheet.setColumnWidths(1, 5, 170);

  sheet.getRange('A3:C3').setValues([['Tổng tài sản', 'Ví tiền mặt', 'Ví đầu tư']]);
  sheet.getRange('A4:C4').setFormulas([
    [
      `=SUM(${ACCOUNT.current})`,
      `=SUMIFS(${ACCOUNT.current},${ACCOUNT.type},"LIQUID")`,
      `=SUMIFS(${ACCOUNT.current},${ACCOUNT.type},"INVESTMENT")`,
    ],
  ]);
  styleTiles_(sheet.getRange('A3:C3'), sheet.getRange('A4:C4'));
  sheet.getRange('A4:C4').setNumberFormat(MONEY).setHorizontalAlignment('left');

  sheet.getRange('A6:E6').setValues([['Tài khoản', 'Loại', 'Số dư đầu kỳ', 'Số dư hiện tại', 'Thay đổi']]);
  styleHeader_(sheet.getRange('A6:E6'));

  const blank = `${ACCOUNT.name}=""`;
  sheet.getRange('A7').setFormula(`=ARRAYFORMULA(IF(${blank},,${ACCOUNT.name}))`);
  sheet
    .getRange('B7')
    .setFormula(`=ARRAYFORMULA(IF(${blank},,IF(${ACCOUNT.type}="LIQUID","Ví tiền mặt","Ví đầu tư")))`);
  sheet.getRange('C7').setFormula(`=ARRAYFORMULA(IF(${blank},,${ACCOUNT.initial}))`);
  sheet.getRange('D7').setFormula(`=ARRAYFORMULA(IF(${blank},,${ACCOUNT.current}))`);
  sheet.getRange('E7').setFormula(`=ARRAYFORMULA(IF(${blank},,${ACCOUNT.current}-${ACCOUNT.initial}))`);
  sheet.getRange('C7:E200').setNumberFormat(MONEY);
  sheet.setFrozenRows(6);
}

// ───────────────────────────── Mục tiêu ─────────────────────────────

function buildGoals_(sheet) {
  styleTitle_(sheet, 'Leak — Mục tiêu tiết kiệm');
  sheet.setColumnWidths(1, 1, 220);
  sheet.setColumnWidths(2, 3, 150);
  sheet.setColumnWidths(5, 1, 90);
  sheet.setColumnWidths(6, 1, 180);
  sheet.setColumnWidths(7, 2, 120);

  sheet
    .getRange('A3:H3')
    .setValues([['Mục tiêu', 'Số tiền mục tiêu', 'Đã tiết kiệm', 'Còn thiếu', 'Tiến độ', '', 'Hạn', 'Còn lại (ngày)']]);
  styleHeader_(sheet.getRange('A3:H3'));

  const formulas = [];
  for (let i = 0; i < 30; i++) {
    const row = 4 + i;
    const source = 2 + i;
    formulas.push([
      `=IF('_goals'!$B$${source}="","",'_goals'!$B$${source})`,
      `=IF($A${row}="","",'_goals'!$C$${source})`,
      `=IF($A${row}="","",'_goals'!$D$${source})`,
      `=IF($A${row}="","",MAX(B${row}-C${row},0))`,
      `=IF($A${row}="","",IFERROR(C${row}/B${row},0))`,
      `=IF($A${row}="","",SPARKLINE(C${row},{"charttype","bar";"max",MAX(B${row},1);"color1","${COLOR.accent}"}))`,
      `=IF(OR($A${row}="",'_goals'!$E$${source}=""),"",'_goals'!$E$${source})`,
      `=IF(G${row}="","",G${row}-TODAY())`,
    ]);
  }
  sheet.getRange(4, 1, formulas.length, 8).setFormulas(formulas);
  sheet.getRange('B4:D33').setNumberFormat(MONEY);
  sheet.getRange('E4:E33').setNumberFormat('0%');
  sheet.getRange('G4:G33').setNumberFormat('dd/MM/yyyy');
  sheet.getRange('H4:H33').setNumberFormat('0');
  sheet.setFrozenRows(3);
}

// ───────────────────────────── Sheet housekeeping ─────────────────────────────

function removeDefaultSheets_(ss) {
  ['Sheet1', 'Trang tính1', 'Trang tính 1'].forEach((name) => {
    const sheet = ss.getSheetByName(name);
    if (sheet && ss.getSheets().length > 1 && sheet.getLastRow() === 0) ss.deleteSheet(sheet);
  });
}

function orderSheets_(ss) {
  const order = Object.keys(REPORT)
    .map((k) => REPORT[k])
    .concat(Object.keys(RAW), [LISTS]);
  order.forEach((name, index) => {
    const sheet = ss.getSheetByName(name);
    if (!sheet) return;
    ss.setActiveSheet(sheet);
    ss.moveActiveSheet(index + 1);
  });
}

// ───────────────────────────── Sample data ─────────────────────────────

function generateSample_(today) {
  let seed = 42;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const pick = (list) => list[Math.floor(random() * list.length)];
  const pad = (n) => (n < 10 ? '0' + n : '' + n);

  const categories = [
    ['Ăn uống', 30000, 180000, 0.5],
    ['Đi lại', 20000, 120000, 0.15],
    ['Mua sắm', 80000, 900000, 0.1],
    ['Bạn bè', 100000, 500000, 0.1],
    ['Dịch vụ', 50000, 300000, 0.08],
    ['Sức khỏe', 50000, 400000, 0.04],
    ['Khác', 20000, 200000, 0.03],
  ];
  const accounts = ['Tiền mặt', 'Techcombank', 'Momo'];
  const reasons = LEAK_REASONS.map((r) => r[0]);

  const transactions = [];
  const months = [-2, -1, 0].map((offset) => {
    const d = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    return { year: d.getFullYear(), month: d.getMonth() + 1, current: offset === 0 };
  });

  let counter = 0;
  months.forEach(({ year, month, current }) => {
    const ym = year * 100 + month;
    const lastDay = current ? today.getDate() : 28;
    const dateText = (day) => `${year}-${pad(month)}-${pad(day)}`;

    transactions.push([
      `sample-${++counter}`, dateText(Math.min(5, lastDay)), ym, 'INCOME', 15000000,
      'Lương', 'Techcombank', 'Lương tháng', 'UNREVIEWED', '', '',
    ]);

    for (let day = 1; day <= lastDay; day++) {
      const count = random() < 0.35 ? 2 : 1;
      for (let n = 0; n < count; n++) {
        let roll = random();
        let category = categories[categories.length - 1];
        for (let i = 0; i < categories.length; i++) {
          roll -= categories[i][3];
          if (roll <= 0) {
            category = categories[i];
            break;
          }
        }
        const amount = Math.round((category[1] + random() * (category[2] - category[1])) / 1000) * 1000;
        const reviewable = !current || day < lastDay - 2;
        let outcome = 'UNREVIEWED';
        let reason = '';
        let reviewedAt = '';
        if (reviewable) {
          const r = random();
          outcome = r < 0.2 ? 'LEAK' : r < 0.55 ? 'NEUTRAL' : 'WORTH_IT';
          if (outcome === 'LEAK') reason = random() < 0.85 ? pick(reasons) : '';
          reviewedAt = `${dateText(Math.min(day + 2, 28))} 20:00:00`;
        }
        transactions.push([
          `sample-${++counter}`, dateText(day), ym, 'EXPENSE', amount,
          category[0], pick(accounts), '', outcome, reason, reviewedAt,
        ]);
      }
    }
  });

  const budgetAmounts = [
    ['Ăn uống', 3500000], ['Đi lại', 800000], ['Mua sắm', 1500000],
    ['Bạn bè', 1000000], ['Dịch vụ', 600000],
  ];
  const budgets = [];
  months.forEach(({ year, month }) => {
    budgetAmounts.forEach(([category, amount]) => budgets.push([year * 100 + month, category, amount]));
  });

  const expenseTotal = transactions
    .filter((r) => r[3] === 'EXPENSE')
    .reduce((sum, r) => sum + r[4], 0);

  return {
    transactions,
    budgets,
    accounts: [
      ['sample-acc-1', 'Tiền mặt', 'LIQUID', 2000000, 1500000],
      ['sample-acc-2', 'Techcombank', 'LIQUID', 20000000, 28500000],
      ['sample-acc-3', 'Momo', 'LIQUID', 500000, 320000],
      ['sample-acc-4', 'DNSE', 'INVESTMENT', 30000000, 34000000],
    ],
    goals: [
      ['sample-goal-1', 'Quỹ khẩn cấp', 60000000, 24500000, `${today.getFullYear() + 1}-06-30`],
      ['sample-goal-2', 'Du lịch Đà Lạt', 12000000, 3000000, ''],
    ],
    meta: [
      ['schema_version', String(SCHEMA_VERSION)],
      ['last_synced_at', Utilities.formatDate(today, TIMEZONE, 'yyyy-MM-dd HH:mm:ss')],
      ['timezone', TIMEZONE],
      ['currency', 'VND'],
      ['tx_count', String(transactions.length)],
      ['expense_total', String(expenseTotal)],
    ],
  };
}
