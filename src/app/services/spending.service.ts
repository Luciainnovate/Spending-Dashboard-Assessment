import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Customer } from '../models/customer';
import { Category } from '../models/category';
import { Transaction } from '../models/transaction';

import { mockCustomerProfile } from '../mock-data/mock-customer';
import { mockSummary } from '../mock-data/mock-summary';
import { mockCategories } from '../mock-data/mock-categories';
import { mockTransactions } from '../mock-data/mock-transactions';
import { mockGoals } from '../mock-data/mock-goals';

@Injectable({ providedIn: 'root' })
export class SpendingService {

  getCustomerProfile(): Observable<Customer> {
    return of(mockCustomerProfile).pipe(delay(500));
  }

  getSpendingSummary(): Observable<any> {
    return of(mockSummary).pipe(delay(500));
  }

  getCategories(): Observable<Category[]> {
    return of(mockCategories).pipe(delay(500));
  }

  getTransactions(): Observable<Transaction[]> {
    return of(mockTransactions).pipe(delay(500));
  }

  getGoals(): Observable<any[]> {
    return of(mockGoals).pipe(delay(500));
  }
}
