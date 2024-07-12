import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoutesEnum } from '../../enums/toutes.enum';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = authService.isAuth;

  if (!isAuth) {
    router.navigate([RoutesEnum.Login]);
    return false;
  };

  return true;
};
