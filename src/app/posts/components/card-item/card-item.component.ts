import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Post } from '../../post.interface';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit, OnChanges {

  @Input() post: Post;

  @Output() postSelected = new EventEmitter<Post>();
  @Output() postDeleted = new EventEmitter<number>();

  constructor() {
    console.log('constructor');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.post && changes.post.currentValue) {
      console.log('ngOnChanges');
    }
  }

  markAsFavorite(): void {
    this.postSelected.emit(this.post);
  }
}
