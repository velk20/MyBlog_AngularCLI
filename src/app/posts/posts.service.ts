import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from './post.interface';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  url = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  getPost(id: number): Observable<Post> {
    const url = `${this.url}/${id}`;

    return this.http.get<Post>(url);
  }

  createPost(post: Post): Observable<any> {
    return this.http.post(this.url, post);
  }

  updatePost(post: Post): Observable<any> {
    const url = `${this.url}/${post.id}`;

    return this.http.put(url, post);
  }

  deletePost(id: number): Observable<any> {
    const url = `${this.url}/${id}`;

    return this.http.delete(url);
  }
}
