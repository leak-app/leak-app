import type {
  TransactionModel,
  TransactionType,
  UpdateTransactionParamsModel,
} from '@/entities/transaction';

/** The fields the edit form changes. Strings are what the user typed. */
export interface EditState {
  type: TransactionType;
  /** Digits as typed on the numpad, "0" when empty. */
  amount: string;
  /** Empty while the user still has to pick one (after a type change). */
  categoryId: string;
  accountId: string;
  note: string;
  /** "YYYY-MM-DD" */
  occurredOn: string;
}

export type UpdatePatch = Omit<UpdateTransactionParamsModel, 'id'>;

type EditSource = Pick<
  TransactionModel,
  'type' | 'amount' | 'categoryId' | 'accountId' | 'note' | 'occurredOn'
>;

const MAX_DIGITS = 12;

/** Starting values: the transaction exactly as stored. VND has no cents, so the amount is whole. */
export function initialEditState(tx: EditSource): EditState {
  return {
    type: tx.type,
    amount: String(Math.round(tx.amount)),
    categoryId: tx.categoryId,
    accountId: tx.accountId,
    note: tx.note,
    occurredOn: tx.occurredOn,
  };
}

/** Digits of whatever was typed or pasted into the amount field. */
export function amountFromText(text: string): string {
  const digits = text.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
  return digits.slice(0, MAX_DIGITS) || '0';
}

/**
 * Switching type clears the category, because an expense category cannot stay on an income.
 * Switching back to the original type restores the original category.
 */
export function withType(
  current: EditState,
  initial: EditState,
  type: TransactionType
): EditState {
  if (type === current.type) return current;
  return {
    ...current,
    type,
    categoryId: type === initial.type ? initial.categoryId : '',
  };
}

export function isEditValid(state: EditState): boolean {
  return parseInt(state.amount, 10) > 0 && state.categoryId !== '';
}

/**
 * Only what changed, or null when nothing did. Sending unchanged fields would make
 * the server re-check them, and a transaction in an archived wallet or under a
 * deleted category could then no longer be edited at all.
 */
export function buildUpdatePatch(
  initial: EditState,
  current: EditState
): UpdatePatch | null {
  const patch: UpdatePatch = {};

  if (current.amount !== initial.amount) {
    patch.amount = parseInt(current.amount, 10);
  }
  if (current.type !== initial.type) {
    patch.type = current.type;
  }
  // The server checks the category against the resulting type, so the two travel together.
  if (
    current.categoryId !== initial.categoryId ||
    current.type !== initial.type
  ) {
    patch.categoryId = current.categoryId;
  }
  if (current.accountId !== initial.accountId) {
    patch.accountId = current.accountId;
  }
  if (current.note.trim() !== initial.note.trim()) {
    // A blank note clears it.
    patch.description = current.note.trim();
  }
  if (current.occurredOn !== initial.occurredOn) {
    patch.occurredOn = current.occurredOn;
  }

  return Object.keys(patch).length > 0 ? patch : null;
}
