import { Component, OnInit } from '@angular/core';
import {Post} from '../../post.interface';
import {PostsService} from '../../posts.service';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {User} from '../../../auth/user.model';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  posts: Post[];

  destroy$ = new Subject<boolean>();

  constructor(private postsService: PostsService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getContent();
  }

  onPostDelete(postId: number): void {
    this.postsService.deletePost(postId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(_ => {
      this.getContent();
    }, (error) => {
      console.log(error);
    });
  }

  private getContent(): void {
    this.postsService.getPosts().pipe(
      map((stream) => {
        return stream;
      }),
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      this.posts = response;
    }, (error) => {
      console.log(error);
    });
  }

  getLoggedUser(): User {
    return this.authService.getLoggedUser();
  }
}
