import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environnement/environnement.devlopments';
import { inject } from '@angular/core';
import { JwtService } from '../services/jwt';
import { User } from '../models/user';

export const userInterceptor: HttpInterceptorFn = (req, next) => {

  const jwtService = inject(JwtService);

  if (req.url.includes(`${environment.BACKEND_URL}/authenticate`)) {
    return next(req);
  }

  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken') ?? ''
  if (!jwtService.isValid(accessToken ?? '')) {
    const user: User = {
      grantType: 'REFRESH_TOKEN',
      refreshToken: refreshToken
    }
    jwtService.getTokens(user).subscribe(res => {
      localStorage.setItem('accessToken', res.accessToken ?? '')
      localStorage.setItem('refreshToken', res.refreshToken ?? '')
      const cloned = req.clone({
        setHeaders: { Authorization: `Bearer ${res.accessToken}` }
      })
      return next(cloned);

    })
  }
  const cloned = req.clone({
    setHeaders: { Authorization: `Bearer ${accessToken}` }
  })
  return next(cloned);

};

