import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Post} from '../../post.interface';
import {AuthService} from '../../../auth/auth.service';
import {User} from '../../../auth/user.model';
import {Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit, OnChanges {

  @Input() post: Post;

  @Output() postSelected = new EventEmitter<Post>();
  @Output() postDeleted = new EventEmitter<number>();

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.post && changes.post.currentValue) {
      console.log('ngOnChanges');
    }
  }

  markAsFavorite(): void {
    this.postSelected.emit(this.post);
  }

  getLoggedUser(): User {
    return this.authService.getLoggedUser();
  }


}
