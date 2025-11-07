import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environnement/environnement.devlopments';
import { inject } from '@angular/core';
import { JwtService } from '../services/jwt';
import { User } from '../models/user';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const userInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService = inject(JwtService);

  console.log('[INTERCEPTOR] --- Interception de la requête ---');
  console.log('[INTERCEPTOR] URL :', req.url);

  //On laisse passer la requête d'authentification sans token
  if (req.url === `${environment.BACKEND_URL}/auth`) {
    console.log('[INTERCEPTOR] Requête vers /auth -> pas de token ajouté.');
    return next(req);
  }

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken') ?? '';

  console.log('[INTERCEPTOR] Access token trouvé :', accessToken ? 'présent' : 'absent');
  console.log('[INTERCEPTOR] Refresh token trouvé :', refreshToken ? 'présent' : 'absent');

  // aucun accessToken
  if (!accessToken) {
    console.warn('[INTERCEPTOR] Aucun accessToken -> requête envoyée sans Authorization.');
    return next(req);
  }

  // accessToken encore valide
  if (jwtService.isValid(accessToken)) {
    console.log('[INTERCEPTOR] Access token valide -> ajout du header Authorization.');
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` }
    });
    console.log('[INTERCEPTOR] Header ajouté :', cloned.headers.get('Authorization'));
    return next(cloned);
  }

  //token invalide
  console.warn('[INTERCEPTOR] Access token invalide, tentative de refresh...');

  if (!refreshToken) {
    console.error('[INTERCEPTOR] Pas de refreshToken disponible -> impossible de rafraîchir.');
    return next(req);
  }

  const user: User = {
    grantType: 'REFRESH_TOKEN',
    refreshToken: refreshToken
  };

  console.log('[INTERCEPTOR] Envoi d’une requête de refresh token...');

  // 🔹 Tentative de refresh
  return jwtService.getTokens(user).pipe(
    switchMap(res => {
      console.log('[INTERCEPTOR] Réponse reçue du refresh token :', res);

      // 🔹 Mise à jour du localStorage
      localStorage.setItem('accessToken', res.accessToken ?? '');
      localStorage.setItem('refreshToken', res.refreshToken ?? '');

      console.log('[INTERCEPTOR] Tokens mis à jour dans le localStorage.');
      console.log('[INTERCEPTOR] Nouveau accessToken :', res.accessToken);

      // 🔹 On clone la requête originale avec le nouveau token
      const cloned = req.clone({
        setHeaders: { Authorization: `Bearer ${res.accessToken}` }
      });

      console.log('[INTERCEPTOR] Requête clonée avec le nouveau token.');
      return next(cloned);
    })
  );
};
