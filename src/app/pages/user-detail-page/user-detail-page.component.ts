import { ActivatedRoute } from '@angular/router';
import { UserApi } from '../../entities/user/user.api';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TuiRoot, TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { Router } from '@angular/router';
import { User } from '../../entities/user/user.model';

@Component({
  selector: 'app-user-detail-page',
  standalone: true,
  imports: [CommonModule, TuiAvatar, TuiButton, TuiRoot, ReactiveFormsModule, TuiTextfield],
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.scss'],
})
export class UserDetailPageComponent implements OnInit {
  user = signal<User | null>(null);
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userApi: UserApi,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.userApi.fetchUser(id).subscribe((res) => {
      this.user.set(res.data);

      // патчим форму только после получения данных
      this.form.patchValue({
        first_name: res.data.first_name || '',
        last_name: res.data.last_name || '',
        email: res.data.email || '',
      });
    });
  }

  save() {
    const currentUser = this.user();
    if (!currentUser) return;

    const payload: Partial<User> = {
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      email: this.form.value.email,
    };

    this.userApi.updateUser(currentUser.id, payload).subscribe((res) => {
      this.user.set({ ...currentUser, ...payload });

      alert('User updated!');
    });
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}
