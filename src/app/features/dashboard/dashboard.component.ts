import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Chart, registerables } from 'chart.js';
import { SpendingService } from '../../services/spending.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // ✅ Data loaded from API
   searchTerm: string = '';
  customer: any;
  summary: any;

  categories: any[] = [];
  transactions: any[] = [];
  goals: any[] = [];

  // Modal selection
  selectedCard:
    | 'profile'
    | 'summary'
    | 'categories'
    | 'transactions'
    | 'goals'
    | null = null;

  // Chat summaries
  profileChat: string[] = [];
  summaryChat: string[] = [];
  categoryChat: string[] = [];
  transactionChat: string[] = [];
  goalChat: string[] = [];

   // Filtered arrays
  filteredTransactions: any[] = [];
  filteredCategories: any[] = [];
  filteredGoals: any[] = [];
  

  constructor(private spendingService: SpendingService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }



  // ✅ Load all mock API data
  loadDashboardData() {

   //Customer
    this.spendingService.getCustomerProfile().subscribe(data => {
      this.customer = data;

      this.profileChat = [
        `Customer ${data.name} has a ${data.accountType} account.`,
        `Joined on ${data.joinDate}, Total spent R${data.totalSpent}`
      ];
    });


    // Summary
    this.spendingService.getSpendingSummary().subscribe(data => {
      this.summary = data;

      this.summaryChat = [
        `In the last ${data.period}, total spent R${data.totalSpent}`,
        `Transactions: ${data.transactionCount}`,
        `Top category: ${data.topCategory}`
      ];
    });

    // Categories + Chart
  
    this.spendingService.getCategories().subscribe((data: any) => {
      this.categories = data;

      this.categoryChat = data.map((cat: any) =>
        `Spent R${cat.amount} on ${cat.name} (${cat.percentage}%)`
      );

      setTimeout(() => this.renderCategoryChart(), 0);
    });

    // Transactions + Chart
    this.spendingService.getTransactions().subscribe(data => {
      this.transactions = data;

      this.transactionChat = data.map((txn: any) =>
        `Spent R${txn.amount} at ${txn.merchant} on ${txn.date}`
      );

      setTimeout(() => this.renderTransactionChart(), 0);
    });

   // Goals + Chart
    this.spendingService.getGoals().subscribe(data => {
      this.goals = data;

      this.goalChat = data.map(goal =>
        `Goal: ${goal.category} → R${goal.spent}/${goal.budget}`
      );

      setTimeout(() => this.renderGoalsChart(), 0);
    });
  }
// CHART FUNCTIONS

  renderCategoryChart(elementId: string = 'categoryChart') {
    const ctx: any = document.getElementById(elementId);

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.categories.map(c => c.name),
        datasets: [
          {
            data: this.categories.map(c => c.amount)
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  renderTransactionChart(elementId: string = 'transactionChart') {
    const ctx: any = document.getElementById(elementId);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.transactions.map(t => t.merchant),
        datasets: [
          {
            label: 'Amount (R)',
            data: this.transactions.map(t => t.amount)
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

  renderGoalsChart(elementId: string = 'goalsChart') {
    const ctx: any = document.getElementById(elementId);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.goals.map(g => g.category),
        datasets: [
          {
            label: 'Spent vs Budget',
            data: this.goals.map(g => g.spent)
          }
        ]
      },
      options: {
        responsive: true,
        indexAxis: 'y'
      }
    });
  }
// MODAL OPEN + CLOSE
  openCard(card: any) {
    this.selectedCard = card;

    setTimeout(() => {
      if (card === 'categories') {
        this.renderCategoryChart('categoryChartModal');
      }

      if (card === 'transactions') {
        this.renderTransactionChart('transactionChartModal');
      }

      if (card === 'goals') {
        this.renderGoalsChart('goalsChartModal');
      }
    }, 200);
  }

  closeCard() {
    this.selectedCard = null;
  }


filter = {
  startDate: '',
  endDate: '',
  category: ''
};

applyFilters() {
  // Filter transactions
  this.filteredTransactions = this.transactions.filter(txn => {
    const txnDate = new Date(txn.date);
    const startOk = this.filter.startDate ? txnDate >= new Date(this.filter.startDate) : true;
    const endOk = this.filter.endDate ? txnDate <= new Date(this.filter.endDate) : true;
    const categoryOk = this.filter.category ? txn.category === this.filter.category : true;
    return startOk && endOk && categoryOk;
  });

  // Filter categories (optional: only show selected category)
  this.filteredCategories = this.filter.category
    ? this.categories.filter(cat => cat.name === this.filter.category)
    : [...this.categories];
}

}
