import { Routes } from '@angular/router';
import { RoutesEnum } from '../enums/toutes.enum';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [
  {
    path: RoutesEnum.Search,
    component: SearchComponent,
  }
];
