import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../model/account.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit{
  accountFormGroup!: FormGroup;
  operationFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  accountObservable!: Observable<AccountDetails>;
  errorMessage!: string;

  constructor(private fb: FormBuilder, private accountService: AccountsService) {
  }

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control('', [Validators.required]),
    });
    this.operationFormGroup = this.fb.group({
      accountId: this.fb.control('', [Validators.required]),
      operationType: this.fb.control(null, [Validators.required]),
      amount: this.fb.control(0, [Validators.required]),
      description: this.fb.control(null, [Validators.required]),
      accountDestination: this.fb.control(null, [Validators.required]),
    });
  }
  handleSearchAccount() {
    let accountId: string = this.accountFormGroup.value.accountId;
    this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err;
        return throwError(err);
      })
    );
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
    let accountId: string = this.accountFormGroup.value.accountId;
    let operationType = this.operationFormGroup.value.operationType;
    let amount: number = this.operationFormGroup.value.amount;
    let description: string = this.operationFormGroup.value.description;
    let accountDestination: string = this.operationFormGroup.value.accountDestination;
    if(operationType == "DEBIT") {
      this.accountService.debit(accountId, amount, description).subscribe({
        next: customer => {
          this.handleSearchAccount();
          this.operationFormGroup.reset();
          alert("L'opération de débit c'est terminé avec succès.");
        },
        error: err => {
          console.log(err);
        }
      });
    }
    else if (operationType == "CREDIT"){
      this.accountService.credit(accountId, amount, description).subscribe({
        next: customer => {
          this.handleSearchAccount();
          this.operationFormGroup.reset();
          alert("L'opération de crédit c'est terminé avec succès.");
        },
        error: err => {
          console.log(err);
        }
      });
    }
    else if(operationType == "TRANSFER"){
      this.accountService.transfert(accountId, accountDestination, amount, description).subscribe({
        next: customer => {
          this.handleSearchAccount();
          this.operationFormGroup.reset();
          alert("L'opération de transfert c'est terminé avec succès.");
        },
        error: err => {
          console.log(err);
        }
      });
    }

  }
}
