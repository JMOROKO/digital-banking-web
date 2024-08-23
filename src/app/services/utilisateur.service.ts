import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Utilisateur} from "../model/utilisateur.model";
import {Role} from "../model/role.model";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient) { }

  create(formData: any): Observable<any>{
    return this.http.post<any>(`${environment.backendHost}/create-user`, formData);
  }
  update(formData: any): Observable<any>{
    return this.http.post<Utilisateur>(`${environment.backendHost}/update-user`, formData);
  }
  findAll(): Observable<Utilisateur[]>{
    return this.http.get<Utilisateur[]>(`${environment.backendHost}/users`);
  }
  findAllRole(): Observable<Role[]>{
    return this.http.get<Role[]>(`${environment.backendHost}/roles`);
  }
  findById(userId: string): Observable<Utilisateur>{
    return this.http.get<Utilisateur>(`${environment.backendHost}/users/${userId}`);
  }

  getPhotoByUserId(userId: number): Observable<Blob> {
    return this.http.get(`${environment.backendHost}/user/${userId}/file`, {responseType: 'blob'}); //{responseType: 'blob'} pour spécifier qu'il s'agit d'un fichier
  }
}
