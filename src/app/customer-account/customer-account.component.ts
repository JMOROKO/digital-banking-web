import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer.model";

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrl: './customer-account.component.css'
})
export class CustomerAccountComponent implements OnInit{
  customerId!: string;
  customer!: Customer;
  constructor(private router: Router, private activatedRouter: ActivatedRoute) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
        this.customerId = this.activatedRouter.snapshot.queryParams['id'];

    }
}
