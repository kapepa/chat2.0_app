import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
  ],
  templateUrl: './layout-main.component.html',
  styleUrl: './layout-main.component.scss'
})
export class LayoutMainComponent implements OnInit {
  private profileService: ProfileService = inject(ProfileService);

  ngOnInit(): void {
    this.profileService.getMyself().subscribe(prof =>
      console.log(prof)
    )
  }
}
