import { Component } from '@angular/core';

@Component({
  selector: 'app-transactions',
  imports: [],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
   categories = [
    { name: 'Groceries', color: '#FF6B6B', icon: 'shopping-cart' },
    { name: 'Entertainment', color: '#4ECDC4', icon: 'film' },
    { name: 'Transportation', color: '#45B7D1', icon: 'car' },
    { name: 'Dining', color: '#F7DC6F', icon: 'utensils' },
    { name: 'Shopping', color: '#BB8FCE', icon: 'shopping-bag' },
    { name: 'Utilities', color: '#85C1E9', icon: 'bolt' }
  ];

  transactions: Array<{ date: Date; merchant: string; category: string; amount: number; paymentMethod: string; description: string; icon: string; categoryColor: string; }> = [];
  filteredTransactions: Array<{ date: Date; merchant: string; category: string; amount: number; paymentMethod: string; description: string; icon: string; categoryColor: string; }> = [];

  selectedCategory = '';
  startDate: string = '';
  endDate: string = '';

  page = 1;
  limit = 20;
  totalPages = 1;

  ngOnInit() {
    // Example mocked transactions
    this.transactions = [
      {
        date: new Date('2024-09-16'),
        merchant: 'Pick n Pay',
        category: 'Groceries',
        amount: 245.80,
        paymentMethod: 'Credit Card',
        description: 'Weekly groceries',
        icon: 'shopping-cart',
        categoryColor: '#FF6B6B'
      },
      {
        date: new Date('2024-09-15'),
        merchant: 'Netflix',
        category: 'Entertainment',
        amount: 199.00,
        paymentMethod: 'Debit Order',
        description: 'Monthly subscription',
        icon: 'film',
        categoryColor: '#4ECDC4'
      }
      // add more mock transactions...
    ];

    this.applyFilters();
  }

  applyFilters() {
    this.filteredTransactions = this.transactions.filter(txn => {
      let match = true;
      if(this.selectedCategory) {
        match = match && txn.category === this.selectedCategory;
      }
      if(this.startDate) {
        match = match && new Date(txn.date) >= new Date(this.startDate);
      }
      if(this.endDate) {
        match = match && new Date(txn.date) <= new Date(this.endDate);
      }
      return match;
    });

    this.totalPages = Math.ceil(this.filteredTransactions.length / this.limit);
  }

  prevPage() {
    if(this.page > 1) this.page--;
  }

  nextPage() {
    if(this.page < this.totalPages) this.page++;
  }
}
