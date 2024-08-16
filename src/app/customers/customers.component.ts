import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {Customer} from "../model/customer.model";
import {catchError, map, Observable, throwError} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  customers!: Observable<Customer[]>;
  errorMessage!: string;
  searchFormGroup!: FormGroup;
  constructor(private customerService: CustomerService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(""),
    })
    this.handleSearchCustomers();
  }


  handleSearchCustomers() {
    let keyWord = this.searchFormGroup.value.keyword;
    this.customers = this.customerService.searchCustomers(keyWord).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteCustomer(c: Customer) {
    let confirmSup = confirm("Voulez-vous vraiment effectuer cette suppression ?");
    if(!confirmSup) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next: value => {
        this.customers = this.customers.pipe( //@TODO que signifie l'utilisation de pipe sur customers ?
          map(data=>{ //@TODO à quoi sert la méthode map ?
            let index = data.indexOf(c);
            data.splice(index, 1);
            return data;
          })
        )
      },
      error: err => {
        console.log(err);
      }
    });
  }

  editCustomer(customer: Customer) {
    this.router.navigateByUrl(`/admin/edit-customer/${customer.id}`);
  }
}
