import { Component } from '@angular/core';
import { PostInputComponent } from '../post-input/post-input.component';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [
    CommonModule,
    PostComponent,
    PostInputComponent,
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent {

}
