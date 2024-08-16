import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer.model";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent implements OnInit{
  editCustomerFormGroup!: FormGroup;
  errorMessage: string = "";
  customer!: Customer;

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.editCustomerFormGroup = this.fb.group({
      nom: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
    });
    let customerId = this.activatedRoute.snapshot.params['id-customer'];
    // console.log("EDIT CUSTOMER :: " + customerId)
    this.findCustomerById(customerId);
  }

  private findCustomerById(customerId: number) {
    this.customerService.findById(customerId).subscribe({
      next: customer => {
        //console.log(customer);
        this.customer = customer;
        this.editCustomerFormGroup.controls['nom'].setValue(  customer.nom );
        this.editCustomerFormGroup.controls['email'].setValue(  customer.email );
      },
      error: err => {
        console.log(err);
      }
    });
  }

  handleSaveCustomer() {

    this.customer.nom = this.editCustomerFormGroup.controls['nom'].value;
    this.customer.email = this.editCustomerFormGroup.controls['email'].value;
    // console.log(this.customer); return;
    this.customerService.saveCustomer(this.customer).subscribe({
      next: customer => {
        alert("customer has been successfully updated !");
        //this.newCustomerFormGroup.reset();
        this.router.navigateByUrl('/admin/customers');
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
