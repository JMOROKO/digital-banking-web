import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {Customer} from "../model/customer.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  constructor(private http: HttpClient) {
  }



  getCustomers(): Observable<any>{
    return this.http.get<Customer[]>(`${environment.backendHost}/customers`);
  }
  findById(id: number): Observable<any>{
    return this.http.get<Customer>(`${environment.backendHost}/customers/${id}`);
  }
  searchCustomers(keyword: string): Observable<any>{
    return this.http.get<Customer[]>(`${environment.backendHost}/customers/search?keyword=${keyword}`);
  }
  saveCustomer(customer: Customer): Observable<any>{
    return this.http.post<Customer>(`${environment.backendHost}/customers`, customer);
  }
  deleteCustomer(id: number): Observable<any>{
    return this.http.delete<void>(`${environment.backendHost}/customers/${id}`);
  }
}
