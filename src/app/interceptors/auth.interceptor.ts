import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject, catchError, filter, switchMap, throwError } from 'rxjs';

// let isEefreshed: boolean = false;

// const refreshToken = () => {
//   const authService = inject(AuthService);

//   return authService.refreshToken();
// }

// export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
//     const authService = inject(AuthService);
//     const authToken = authService.getAccessToken;
//     const authReq = (token: string) => {
//       return req.clone({
//         setHeaders: {
//           'Authorization': `Bearer ${token}`
//         }
//       })
//     };

//     if (!authToken) next(req);

//     return next(authReq(authToken)).pipe(
//       catchError(error => {
//         if (error.status === 403 && !isEefreshed) {
//           isEefreshed = !isEefreshed
//           return refreshToken().pipe(
//             switchMap(({ access_token }) => {
//               return next(authReq(access_token));
//             })
//           );
//         }

//         return throwError(error);
//       })
//     );
// };

let isRefreshed$: BehaviorSubject<boolean> = new BehaviorSubject(false);

const refreshToken = () => {
  const authService = inject(AuthService);

  return authService.refreshToken();
}

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const authToken = authService.getAccessToken;
    
    const authReq = (token: string) => {
      isRefreshed$.next(true)
      return req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      })
    };

    if (!authToken) next(req);
    if (!req.url.includes("refresh")) return next(authReq(authService.getAccessToken));

    return isRefreshed$.pipe(
      filter(isRefreshing => !isRefreshing),
      switchMap(() => {
        return next(authReq(authToken)).pipe(
          catchError(error => {
            if (error.status === 403 && !isRefreshed$.value) {
              isRefreshed$.next(false) 
              return refreshToken().pipe(
                switchMap(({ access_token }) => {
                  return next(authReq(access_token));
                })
              );
            }
    
            return throwError(error);
          })
        );
      })
    )
}