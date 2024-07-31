import { Component, inject, OnInit, signal } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SubscribersCardComponent } from './subscribers-card/subscribers-card.component';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';
import { ProfileInt } from '../../interface/profile.int';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    ImgUrlPipe,
    RouterModule,
    CommonModule,
    SvgIconComponent,
    SubscribersCardComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  private profileService = inject(ProfileService);
  subscribes$ = this.profileService.getSubscribers();
  myProfile = signal<ProfileInt | null>(null);

  ngOnInit () {
    firstValueFrom(this.profileService.getMyself());
    this.profileService.getMyProfile.subscribe((profile) => {
      this.myProfile.set(profile);
    })
  }

  get getMyProfile() {
    return this.profileService.getMyProfile;
  }
}
