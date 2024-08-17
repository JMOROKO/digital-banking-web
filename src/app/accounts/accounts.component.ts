import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
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
    this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.pageSize);
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
    let accountId: string = this.accountFormGroup.value.accountId;
    let operationType = this.operationFormGroup.value.operationType;
    if(operationType == "DEBIT") {
      // https://www.youtube.com/watch?v=zzVYvLzZvRE 1:21:54
      //this.accountService.debit(accountId, this.form)
    }
    else if (operationType == "CREDIT"){

    }
    else if(operationType == "TRANSFER"){

    }
  }
}
