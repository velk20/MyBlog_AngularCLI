import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  canLoad(): boolean {
    const user = this.authService.getLoggedUser();

    if (!user) {
      this.router.navigate(['auth/login']);

      return false;
    }

    return true;
  }
}
