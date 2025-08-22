import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',

  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.html',
   styleUrl: './login.scss'
})
export class Login {
  form: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
      private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;

    const { username, password } = this.form.value;

    this.authService.login({ username: username ?? '', password: password ?? '' }).subscribe({
      next: (res) => {
        this.authService.setToken(res.token ?? '');
        this.router.navigate(['/dashboard']); // will implement this route later
      },
      error: () => {
        this.error = 'Invalid username or password';
          this.cdr.detectChanges();
      }
    });
  }
}
