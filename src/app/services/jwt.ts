import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from '../../environnement/environnement.devlopments';
import { Jwt } from '../models/jwt';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(private http: HttpClient) { }

  getTokens(user: User): Observable<Jwt> {
    return this.http.post<Jwt>(`${environment.BACKEND_URL}/authenticate`, user);
  }
  isValid(token: string): boolean {
    const now = Date.now()
    const exp = (jwtDecode(token).exp ?? 0) * 500000
    return exp > now;
  }
}
