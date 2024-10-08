import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {NotAuthoriredComponent} from "./not-authorired/not-authorired.component";
import {EditCustomerComponent} from "./edit-customer/edit-customer.component";
import {CustomerAccountComponent} from "./customer-account/customer-account.component";
import {UtilisateurComponent} from "./utilisateur/utilisateur.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: "/login", pathMatch: 'full'},
  {path: 'admin', component: AdminTemplateComponent, canActivate: [AuthenticationGuard],
    children:[
      {path: 'users', component: UtilisateurComponent, canActivate: [AuthorizationGuard], data: {role: "ADMIN"}},
      {path: 'new-user', component: UtilisateurComponent, canActivate: [AuthorizationGuard], data: {role: "ADMIN"}},
      {path: 'edit-user/:id-user', component: UtilisateurComponent, canActivate: [AuthorizationGuard], data: {role: "ADMIN"}},
      {path: 'customers', component: CustomersComponent},
      {path: 'accounts', component: AccountsComponent},
      {path: 'customer-accounts/:id', component: CustomerAccountComponent},
      {path: 'new-customer', component: NewCustomerComponent, canActivate: [AuthorizationGuard], data: {role: "ADMIN"}},
      {path: 'edit-customer/:id-customer', component: EditCustomerComponent, canActivate: [AuthorizationGuard], data: {role: "ADMIN"}},
      {path: 'notAuthorized', component: NotAuthoriredComponent},
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
