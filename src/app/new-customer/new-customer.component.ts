import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../model/customer.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements OnInit{
  newCustomerFormGroup!: FormGroup;
  errorMessage: string = "";

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router) {
  }
  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      nom: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
    })
  }

  handleSaveCustomer() {
    let customer: Customer = this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next: customer => {
        //@TODO Comment faire pour afficher des messages de succès qui viendrons depuis le backend afin de ne pas mettre des message en dure dans le front ?
        alert("customer has been successfully saved !");
        //this.newCustomerFormGroup.reset();
        this.router.navigateByUrl('customers');
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
