import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SpendingService } from '../../services/spending.service';


@Component({
  selector: 'app-layout',
  standalone: true,          // ✅ MUST be true
  imports: [RouterModule], 
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  customerName: string = '';
  customer: any;


  constructor(private router: Router,private http: HttpClient,private spendingService: SpendingService,) {}
 ngOnInit() {
    this.loadCustomerProfile();
  }
  loadCustomerProfile() {
     this.spendingService.getCustomerProfile().subscribe(data => {
      this.customer = data;
      this.customerName = this.customer.name;

    });
  }
}
