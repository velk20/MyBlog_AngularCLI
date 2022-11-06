import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Post} from '../../post.interface';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent {

  @Input() posts: Post[];

  @Output() postDeleted = new EventEmitter<number>();

  constructor() {
  }
}
