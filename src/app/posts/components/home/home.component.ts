import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onRedirect(path: string): void {
    if (localStorage.getItem('loggedUser')) {
      this.router.navigate([path]);
      return;
    }
    this.router.navigate(['/auth/login']);
    alert('First you have to login or register!');
  }
}
