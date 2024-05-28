import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  customers!: any;
  ngOnInit(): void {
    this.http.get('http://localhost:8085/customers').subscribe({
      next: data => {
        this.customers = data; //@TODO 1:00:00
      },
      error: err => {
        console.log(err);
      }
    })
  }

  constructor(private http: HttpClient) {

  }

}
