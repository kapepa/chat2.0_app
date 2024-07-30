import { Component, Input } from '@angular/core';

type hrefNames = "home-icon" | "message-icon" | "search-icon";

@Component({
  selector: 'svg-icon',
  standalone: true,
  imports: [],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.scss'
})
export class SvgIconComponent {
  link: string = `assets/svg/home-icon.svg`;

  @Input() size: string = "24px";
  
  ngOnInit(): void {
    this.link = `/assets/svg/home-icon.svg#`;
  }


}
