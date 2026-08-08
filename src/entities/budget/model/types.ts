import type { CategoryModel } from '@/entities/category';

export interface BudgetModel {
  id: string;
  amount: number;
  month: number;
  year: number;
  categoryId: string;
  category?: CategoryModel | null;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetCategoryReportModel {
  categoryId: string;
  categoryName: string;
  emoji: string | null;
  budgetAmount: number;
  spentAmount: number;
  remainingAmount: number;
  percentage: number;
  isWarning: boolean;
  formattedBudget?: string;
  formattedSpent?: string;
  formattedRemaining?: string;
  progressPercent?: number;
  progressColorClass?: string;
  warningBadgeText?: string;
}

export interface BudgetReportModel {
  month: number;
  year: number;
  totalBudget: number;
  totalSpent: number;
  categories: BudgetCategoryReportModel[];
  savingsInsight: string;
}

export interface UpsertBudgetParamsModel {
  categoryId: string;
  amount: number;
  month: number;
  year: number;
}

export interface QueryBudgetParamsModel {
  month?: number;
  year?: number;
}
