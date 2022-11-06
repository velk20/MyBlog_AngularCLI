import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Post} from '../../post.interface';

@Component({
  selector: 'app-card-list-view',
  templateUrl: './card-list-view.component.html',
  styleUrls: ['./card-list-view.component.scss']
})
export class CardListViewComponent {

  @Input() posts: Post[];

  @Output() postDeleted = new EventEmitter<number>();

  selectedPost: Post;

  constructor() {
  }

  onPostSelected(post: Post): void {
    this.selectedPost = post;
  }
}
