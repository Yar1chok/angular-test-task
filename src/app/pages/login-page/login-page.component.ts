import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { AuthApi } from '../../entities/auth/auth.api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiButton, TuiTextfield],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  form: FormGroup;
  error = signal<string | null>(null);

  constructor(private fb: FormBuilder, private authApi: AuthApi, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    this.authApi.login(email, password).subscribe({
      next: (res) => {
        this.authApi.setToken(res.token);
        this.router.navigate(['/users']);
      },
      error: () => {
        this.error.set('Ошибка авторизации. Проверьте email и пароль.');
      },
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
