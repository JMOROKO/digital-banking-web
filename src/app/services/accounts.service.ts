import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {AccountDetails} from "../model/account.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  constructor(private http: HttpClient) {
  }

  public getAccount(accountId: string, page: number, size: number): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(environment.backendHost+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }
  public debit(accountId: string, amount: number, description: string) {
    return this.http.post(environment.backendHost+"/accounts/debit", {accountId:accountId, amount:amount, description:description});
  }
  public credit(accountId: string, amount: number, description: string) {
    return this.http.post(environment.backendHost+"/accounts/credit", {accountId:accountId, amount:amount, description:description});
  }
  public transfert(accountSource: string, accountDestination: string, amount: number, description: string) {
    return this.http.post(environment.backendHost+"/accounts/transfert", {accountSource:accountSource, accountDestination: accountDestination, amount:amount, description:description});
  }
}
