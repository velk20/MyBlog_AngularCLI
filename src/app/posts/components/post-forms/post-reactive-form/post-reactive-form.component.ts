import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../../post.interface';
import { PostsService } from '../../../posts.service';
import { take, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-post-reactive-form',
  templateUrl: './post-reactive-form.component.html',
  styleUrls: ['./post-reactive-form.component.scss']
})
export class PostReactiveFormComponent implements OnInit, OnDestroy {

  @Output() postSubmitted = new EventEmitter<Post>();

  post: Post;
  formGroup: FormGroup;

  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private postsService: PostsService) {
    this.post = {
      title: '',
      content: '',
      publishDate: '',
      category: ''
    };
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      const id = params.id;

      if (id) {
        this.getPost(id);
      }
    });

    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    const post: Post = {
      ...this.formGroup.value,
      authorId: JSON.parse(localStorage.getItem('loggedUser')).id,
      publishDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US').toString(),
      category: this.formGroup.value.category
    };

    if (!post.id) {
      // create
      this.postsService.createPost({...post}).pipe(
        take(1)
      ).subscribe(() => {
        // redirect
        this.router.navigate(['/main/all-posts']);
      }, (error) => {
        console.log(error);
      });

      return;
    }

    this.postsService.updatePost(post).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.router.navigate(['/main/all-posts']);
    }, (error) => {
      console.log(error);
    });
  }

  buildForm(): void {
    this.formGroup = this.fb.group({
      id: this.post.id,
      category: this.post.category,
      title: [this.post.title, [Validators.required, Validators.minLength(5)]],
      content: [this.post.content, [Validators.required]]
    });
  }

  private getPost(id: number): void {
    this.postsService.getPost(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      this.post = response;

      this.buildForm();
    });
  }
}
