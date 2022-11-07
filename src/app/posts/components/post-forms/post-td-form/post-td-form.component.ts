import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Post } from '../../../post.interface';
import { NgForm } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { PostsService } from '../../../posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-post-td-form',
  templateUrl: './post-td-form.component.html',
  styleUrls: ['./post-td-form.component.scss']
})
export class PostTdFormComponent implements OnInit {

  @ViewChild('form', {static: true}) ngForm: NgForm;

  post: Post;

  @Output() postSubmitted = new EventEmitter<Post>();

  destroy$ = new Subject<boolean>();

  constructor(private postsService: PostsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.post = {
      title: '',
      category: '',
      content: '',
      publishDate: ''
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
  }

  onSubmit(): void {
    this.post.title = this.ngForm.value.title;
    this.post.content = this.ngForm.value.content;

    if (!this.post.id) {
      // create
      const newPost = {
        ...this.post,
        authorId: JSON.parse(localStorage.getItem('loggedUser')).id,
        publishDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US').toString(),
      };

      this.postsService.createPost(newPost).pipe(
        take(1)
      ).subscribe(() => {
        this.router.navigate(['/main/my-posts']);
      }, (error) => {
        console.log(error);
      });

      return;
    }

    // update
    this.postsService.updatePost(this.post).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.router.navigate(['/main/my-posts']);
    }, (error) => {
      console.log(error);
    });
  }

  onCancel(): void {
    this.router.navigate(['/main/my-posts']);
  }

  private getPost(id: number): void {
    this.postsService.getPost(id).pipe(
      take(1)
    ).subscribe((response) => {
      this.post = response;
    });
  }
}
