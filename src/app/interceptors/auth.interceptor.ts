import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

const refreshToken = () => {
  const authService = inject(AuthService);
}

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const authToken = authService.getAccessToken;

    if (!authToken) next(req);

    const authReq = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    return next(authReq).pipe(
      catchError(error => {
        if (error.status === 403) {
          return refreshToken();
        }

        return throwError(error);
      })
    );
};
