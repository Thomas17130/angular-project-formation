// src/app/services/jwt.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environnement/environnement.devlopments';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.post(`${environment.BACKEND_URL}/register`, user);
  }
}
