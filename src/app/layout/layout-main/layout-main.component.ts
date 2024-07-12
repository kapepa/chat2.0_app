import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

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
export class LayoutMainComponent {

}
