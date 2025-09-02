import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { AuthApi } from '../../entities/auth/auth.api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiButton, TuiTextfield],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  form: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private authApi: AuthApi, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;

    const { username, email, password } = this.form.value;

    this.authApi.register(username, email, password).subscribe({
      next: (res) => {
        this.authApi.setToken(res.token);
        this.router.navigate(['/users']);
      },
      error: () => {
        this.error = 'Ошибка регистрации. Проверьте данные.';
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
