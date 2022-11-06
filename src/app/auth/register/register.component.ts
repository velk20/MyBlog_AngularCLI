import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { map, take } from 'rxjs/operators';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;

  errorMessage: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void {
    const formValue = this.formGroup.value;

    if (!formValue.username || !formValue.name || !formValue.password || !formValue.rePassword) {
      this.errorMessage = 'Fill the form correctly';

      this.formGroup.reset({
        name: '',
        username: '',
        password: '',
        rePassword: '',
      });
      return;
    }

    if (formValue.password !== formValue.rePassword) {
      this.errorMessage = 'Passwords do not match';

      this.formGroup.reset({
        name: formValue.name,
        username: formValue.username,
        password: '',
        rePassword: '',

      });
      return;
    }

    // Check if username is taken
    this.authService.getUsers().pipe(
      map((stream: User[]) => stream.find(user => user.username === formValue.username)),
      take(1)
    ).subscribe(response => {
      if (response) {
        this.errorMessage = 'Username has already been taken';

        return;
      }

      // register
      this.authService.register(formValue).pipe(
        take(1)
      ).subscribe(() => {
        this.router.navigate(['auth/login']);
      });
    });
  }

  private buildForm(): void {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rePassword: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
}
