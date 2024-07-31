import { Component, Input } from '@angular/core';
import { ProfileInt } from '../../../interface/profile.int';
import { ImgUrlPipe } from '../../../pipes/img-url.pipe';

@Component({
  selector: 'app-subscribers-card',
  standalone: true,
  imports: [
    ImgUrlPipe,
  ],
  templateUrl: './subscribers-card.component.html',
  styleUrl: './subscribers-card.component.scss'
})
export class SubscribersCardComponent {
  @Input() profile!: ProfileInt;

}
