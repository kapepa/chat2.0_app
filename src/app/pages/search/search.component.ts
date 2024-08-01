import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../components/profile-card/profile-card.component';
import { ProfileService } from '../../services/profile.service';
import { CommonModule } from '@angular/common';
import { ProfileInt } from '../../interface/profile.int';
import { Router } from '@angular/router';
import { RoutesEnum } from '../../../enums/routes.enum';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ProfileCardComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent  {
  private profileService = inject(ProfileService);
  private router = inject(Router)

  profiles: ProfileInt[] = [];

  constructor() {
    this.profileService.getAccounts().subscribe((profiles) => {
      this.profiles = profiles;
    })
  }

  onRouteProfile(id: string) {
    this.router.navigate([RoutesEnum.Profile, id]);
  }
}
