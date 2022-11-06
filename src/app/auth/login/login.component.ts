import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  errorMessage: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void {
    this.errorMessage = null;

    const username = this.formGroup.value.username;
    const password = this.formGroup.get('password').value;

    this.authService.login(username, password).pipe(
      take(1)
    ).subscribe(response => {
      if (!response) {
        this.errorMessage = 'Invalid username or password';

        return;
      }

      // set logged user
      this.authService.setLoggedUser(response);

      this.router.navigate(['main/ancient-wonders']);
    });
  }

  private buildForm(): void {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }
}
