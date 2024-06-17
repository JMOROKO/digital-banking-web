import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  ngOnInit(): void {
  }
  constructor(private router: Router, public authService: AuthService) {
  }

  handleLogout() {
    this.authService.logout();
  }
}
