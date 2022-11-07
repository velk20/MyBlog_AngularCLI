import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../../post.interface';
import {PostsService} from '../../posts.service';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {AuthService} from '../../../auth/auth.service';
import {User} from '../../../auth/user.model';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit, OnDestroy {

  posts: Post[];
  selectedPost: Post;

  destroy$ = new Subject<boolean>();

  constructor(private postsService: PostsService,
              private authService: AuthService) {
    this.selectedPost = {
      title: '',
      content: '',
      publishDate: '',
      category: ''
    };
  }

  ngOnInit(): void {
    this.getContent();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  onPostDelete(postId: number): void {
    this.postsService.deletePost(postId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.getContent();
    }, (error) => {
      console.log(error);
    });
  }

  private getContent(): void {
    this.postsService.getPosts().pipe(
      map((stream) => {
        return stream.filter(x => x.authorId === this.getLoggedUser().id);
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
