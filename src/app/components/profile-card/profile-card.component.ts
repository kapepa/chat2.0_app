import { Component, Input } from '@angular/core';
import { ProfileInt } from '../../interface/profile.int';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [
    ImgUrlPipe,
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() profile!: ProfileInt;
}
