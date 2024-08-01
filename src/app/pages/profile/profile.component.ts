import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../components/profile-header/profile-header.component';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';
import { PostFeedComponent } from './components/post-feed/post-feed.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ImgUrlPipe,
    RouterModule,
    CommonModule,
    PostFeedComponent,
    ProfileHeaderComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileService: ProfileService = inject(ProfileService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  profile$ = this.activatedRoute.params.pipe(
    switchMap(({id}) => {
      if (id ===  this.profileService.myProfile?.id) return this.profileService.getMyProfile;

      return this.profileService.getUserById(id);
    })
  )

  getSubscribers$ = this.profileService.getMySubscribers.pipe(
    map((subscribers) => subscribers?.slice(0, 5))
  );

  getMyProfile$ = this.profileService.getMyProfile
}