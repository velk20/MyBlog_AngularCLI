import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  hasLoggedIn: boolean;

  destroy$ = new Subject<boolean>();

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getHasLoggedIn().pipe(
      takeUntil(this.destroy$)
    ).subscribe(hasLogged => this.hasLoggedIn = hasLogged);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onRedirect(path: string): void {
    this.router.navigate([path]);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
  isLoggedUser():boolean {
    let loggedUser = this.authService.getLoggedUser();
    if (loggedUser) {
      return false;
    }
    return true;
  }

  isNotLoggedUser() {
    let loggedUser = this.authService.getLoggedUser();
    if (loggedUser) {
      return true;
    }
    return false;
  }
}
