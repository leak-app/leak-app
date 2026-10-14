import { clsx } from 'clsx';
import type { ComponentPropsWithRef, ElementType } from 'react';

type CardVariant = 'glass' | 'elevated' | 'tint' | 'danger';

interface CardProps extends ComponentPropsWithRef<'div'> {
  /**
   * glass: the default card. elevated: the reflection card, a step lighter and rounder.
   * tint: sage-tinted, for the "Bịt chỗ rò rỉ" card. danger: apricot-tinted, for a gentle problem.
   * Never put glass on glass.
   */
  variant?: CardVariant;
  as?: ElementType;
}

const VARIANT_CLASS: Record<CardVariant, string> = {
  glass: 'rounded-card border-border bg-surface',
  elevated: 'rounded-sheet border-border bg-surface-elevated',
  tint: 'rounded-card border-primary/20 bg-primary/8',
  danger: 'rounded-card border-danger/30 bg-danger/7',
};

export function Card({
  variant = 'glass',
  as: Tag = 'div',
  className,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={clsx('border p-5', VARIANT_CLASS[variant], className)}
      {...rest}
    />
  );
}
