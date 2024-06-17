import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    this.authService.loadJwtTokenFromLocalStorage();
  }
  constructor(private authService: AuthService) {
  }
  title = 'digital-banking-web';
}
