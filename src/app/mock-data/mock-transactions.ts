import { Transaction } from '../models/transaction';

export const mockTransactions: Transaction[] = [
  {
    merchant: 'Pick n Pay',
    category: 'Groceries',
    amount: 245.8,
    date: '2024-09-16'
  },
  {
    merchant: 'Netflix',
    category: 'Entertainment',
    amount: 199.0,
    date: '2024-09-15'
  }
];
