// src/app/services/jwt.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environnement/environnement.devlopments';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient) {}

  getTokens(user: User): Observable<any> {
    return this.http.post(`${environment.BACKEND_URL}/authenticate`, user);
  }

  // 🔹 nouvelle méthode register
  register(user: User): Observable<any> {
    return this.http.post(`${environment.BACKEND_URL}/register`, user);
  }

  // éventuellement ton isValid(token: string) ici...
}
