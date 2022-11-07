import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-blog';
  constructor(private router: Router) {
  }
  onRedirect(path: string): void {
    this.router.navigate([path]);
  }
}
