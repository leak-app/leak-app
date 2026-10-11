import { ArrowRight, Mic, Plus, Settings } from 'lucide-react';
import { useState, type ReactNode } from 'react';

import { ICON } from '@/shared/icons';
import {
  BackButton,
  HeaderIconButton,
  HeaderPill,
  MainLayout,
  Screen,
  ScreenHeader,
} from '@/shared/layout';
import { formatIncomeVnd, formatVnd, formatVndParts } from '@/shared/lib';
import {
  Amount,
  BottomSheet,
  Button,
  Card,
  Chip,
  Choice,
  EmptyState,
  Input,
  Meter,
  Numpad,
  OutcomeBadge,
  TransactionRow,
  type ChoiceTone,
} from '@/shared/ui';

const SWATCHES = [
  ['bg', 'bg-bg'],
  ['surface', 'bg-surface'],
  ['surface-elevated', 'bg-surface-elevated'],
  ['primary', 'bg-primary'],
  ['secondary', 'bg-secondary'],
  ['danger', 'bg-danger'],
  ['pebble', 'bg-pebble'],
  ['text', 'bg-text'],
  ['soft', 'bg-soft'],
  ['muted', 'bg-muted'],
  ['subtle', 'bg-subtle'],
] as const;

const CHOICES: { tone: ChoiceTone; label: string; hint: string }[] = [
  {
    tone: 'worth',
    label: 'Đáng giá',
    hint: 'Mang lại niềm vui hoặc giá trị thật',
  },
  {
    tone: 'neutral',
    label: 'Bình thường',
    hint: 'Chi tiêu cần thiết, không có gì đặc biệt',
  },
  { tone: 'leak', label: 'Rò rỉ', hint: 'Bốc đồng, lãng phí hoặc không đáng' },
];

const CATEGORIES = ['Ăn uống', 'Cà phê', 'Đi lại', 'Mua sắm', 'Giải trí'];
const REASONS = ['Bốc đồng', 'Không dùng đến', 'Quá đắt', 'Áp lực xã hội'];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-eyebrow text-muted">{title}</h2>
      {children}
    </section>
  );
}

/** Development only (route /dev/kit): every kit component in its states, for visual checks. */
export default function KitGallery() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [reason, setReason] = useState(REASONS[0]);
  const [choice, setChoice] = useState<ChoiceTone>('leak');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [typed, setTyped] = useState('');

  const hero = formatVndParts(285000);

  return (
    <MainLayout>
      <Screen
        className="pb-32"
        header={
          <ScreenHeader
            eyebrow="Chủ nhật, 11 tháng 10"
            title="Chào buổi tối"
            rightAction={
              <HeaderIconButton
                icon={Settings}
                label="Cài đặt"
              />
            }
          />
        }
      >
        <div className="flex flex-col gap-8">
          <Section title="Header có nút quay lại">
            <ScreenHeader
              className="!px-0 !pt-0"
              title="Ví & tài khoản"
              leftAction={<BackButton />}
              rightAction={
                <HeaderPill>
                  <Plus
                    size={16}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  Thêm ví
                </HeaderPill>
              }
            />
          </Section>

          <Section title="Màu">
            <div className="grid grid-cols-4 gap-2">
              {SWATCHES.map(([name, className]) => (
                <div
                  key={name}
                  className="flex flex-col gap-1"
                >
                  <div
                    className={`h-10 rounded-tile border border-border ${className}`}
                  />
                  <span className="text-caption text-muted">{name}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Chữ">
            <p className="text-page-title">Chào buổi tối</p>
            <p className="text-section-title">
              4 khoản chi tuần này đang chờ bạn nhìn lại
            </p>
            <p className="text-heading">Gần đây</p>
            <p className="text-body">
              Bạn đã bớt 600,000₫ tiền cà phê so với tháng trước.
            </p>
            <p className="text-description text-muted">
              Khoảng một phút. Không có câu trả lời sai.
            </p>
            <p className="text-label text-muted">Đã chi hôm nay</p>
            <p className="text-caption text-muted">
              Ăn uống · 08:15 · Đáng giá
            </p>
            <p className="text-eyebrow text-secondary">Nhìn lại chi tiêu</p>
          </Section>

          <Section title="Amount">
            <Amount
              value={hero.value}
              symbol={hero.symbol}
              size="xl"
            />
            <Amount
              value="45,000"
              symbol="₫"
              size="lg"
            />
            <Amount
              value="115,000"
              symbol="₫"
              size="md"
            />
            <Amount
              value="55,000"
              symbol="₫"
              size="row"
            />
            <Amount
              value="600,000"
              symbol="₫"
              sign="+"
              size="md"
              className="text-primary"
            />
            <p className="text-caption text-muted">
              {formatVnd(850000)} · {formatIncomeVnd(600000)}
            </p>
          </Section>

          <Section title="Button">
            <Button
              size="lg"
              fullWidth
            >
              Lưu khoản chi
            </Button>
            <div className="flex flex-wrap gap-3">
              <Button
                trailingIcon={
                  <ArrowRight
                    size={ICON.size.row}
                    strokeWidth={ICON.stroke.onPrimary}
                    aria-hidden="true"
                  />
                }
              >
                Bắt đầu
              </Button>
              <Button variant="secondary">Để sau</Button>
              <Button variant="ghost">Bỏ qua</Button>
              <Button loading>Đang lưu</Button>
              <Button disabled>Không dùng được</Button>
            </div>
          </Section>

          <Section title="Chip">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((name) => (
                <Chip
                  key={name}
                  selected={category === name}
                  onClick={() => setCategory(name)}
                >
                  {name}
                </Chip>
              ))}
            </div>
            <p className="text-label text-muted">Vì sao? (không bắt buộc)</p>
            <div className="flex flex-wrap gap-2">
              {REASONS.map((name) => (
                <Chip
                  key={name}
                  compact
                  tone="danger"
                  selected={reason === name}
                  onClick={() => setReason(name)}
                >
                  {name}
                </Chip>
              ))}
            </div>
          </Section>

          <Section title="Choice">
            <div className="flex flex-col gap-2">
              {CHOICES.map((item) => (
                <Choice
                  key={item.tone}
                  {...item}
                  selected={choice === item.tone}
                  onSelect={() => setChoice(item.tone)}
                />
              ))}
            </div>
          </Section>

          <Section title="Input">
            <Input
              label="Nói hoặc gõ tự nhiên"
              placeholder="55k phở bò ví tiền mặt"
              value={typed}
              onChange={(event) => setTyped(event.target.value)}
              trailing={
                <button
                  type="button"
                  aria-label="Nói"
                  className="flex size-touch items-center justify-center rounded-full bg-primary-tint text-primary"
                >
                  <Mic
                    size={ICON.size.ui}
                    strokeWidth={ICON.stroke.idle}
                    aria-hidden="true"
                  />
                </button>
              }
            />
            <Input
              label="Số tiền"
              helper="Chỉ nhập số, không cần dấu chấm."
            />
            <Input
              label="Tên ví"
              defaultValue=""
              error="Bạn chưa nhập tên ví."
            />
          </Section>

          <Section title="Meter và OutcomeBadge">
            <Meter
              value={71}
              label="Ngân sách tháng đã dùng"
            />
            <Meter
              value={42}
              tone="danger"
              thin
              label="Tỷ lệ rò rỉ"
            />
            <div className="flex flex-wrap gap-2">
              <OutcomeBadge
                tone="worth"
                label="Đáng giá"
              />
              <OutcomeBadge
                tone="neutral"
                label="Bình thường"
              />
              <OutcomeBadge
                tone="leak"
                label="Rò rỉ"
              />
              <OutcomeBadge
                tone="pending"
                label="Chờ nhìn lại"
              />
            </div>
          </Section>

          <Section title="Card và TransactionRow">
            <Card>
              <ul>
                <TransactionRow
                  icon="☕"
                  title="Phở bò"
                  category="Ăn uống"
                  time="08:15"
                  outcome={{ tone: 'worth', label: 'Đáng giá' }}
                  amount="55,000₫"
                />
                <TransactionRow
                  divider
                  icon="🛍️"
                  title="Tai nghe không dây chống ồn dùng cho cả điện thoại và máy tính xách tay"
                  category="Mua sắm"
                  time="Hôm qua"
                  outcome={{ tone: 'pending', label: 'Chờ nhìn lại' }}
                  amount="1,690,000₫"
                />
                <TransactionRow
                  divider
                  icon="🛵"
                  title="Grab"
                  category="Đi lại"
                  time="19:02"
                  outcome={{ tone: 'leak', label: 'Rò rỉ' }}
                  amount="42,000₫"
                  onClick={() => undefined}
                />
              </ul>
            </Card>
            <Card variant="elevated">Thẻ nâng (reflection)</Card>
            <Card variant="tint">Thẻ sage nhạt (Bịt chỗ rò rỉ)</Card>
          </Section>

          <Section title="EmptyState">
            <EmptyState
              title="Chưa có khoản chi nào"
              description="Ghi khoản chi đầu tiên của bạn để bắt đầu."
              action={<Button>Ghi khoản chi</Button>}
            />
          </Section>

          <Section title="BottomSheet và Numpad">
            <Button
              variant="secondary"
              onClick={() => setSheetOpen(true)}
            >
              Mở sheet
            </Button>
            <BottomSheet
              open={sheetOpen}
              onClose={() => setSheetOpen(false)}
              title="Nhìn lại chi tiêu"
            >
              <p className="text-description text-muted">Nội dung của sheet.</p>
            </BottomSheet>
            <Numpad
              onKeyPress={(key) =>
                setTyped((value) =>
                  key === 'Backspace' ? value.slice(0, -1) : value + key
                )
              }
            />
          </Section>
        </div>
      </Screen>
    </MainLayout>
  );
}
