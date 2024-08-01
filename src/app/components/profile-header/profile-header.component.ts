import { Component, input } from '@angular/core';
import { ProfileInt } from '../../interface/profile.int';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [
    ImgUrlPipe,
  ],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  profile = input<ProfileInt>();
}
