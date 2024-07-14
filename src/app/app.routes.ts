import { Routes } from '@angular/router';
import { RoutesEnum } from '../enums/routes.enum';
import { SearchComponent } from './pages/search/search.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LayoutMainComponent } from './layout/layout-main/layout-main.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutMainComponent,
    canActivate: [
      authGuard,
    ],
    children: [
      {
        path: RoutesEnum.Search,
        component: SearchComponent,
      },
      {
        path: RoutesEnum.Profile,
        component: ProfileComponent,
      }
    ]
  },
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      {
        path: RoutesEnum.Login,
        component: LoginComponent,
      },
    ]
  }
];
