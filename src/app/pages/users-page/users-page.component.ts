import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TUI_IS_MOBILE } from '@taiga-ui/cdk';
import { TuiAvatar, TuiBadge, TuiPager } from '@taiga-ui/kit';
import { TuiFallbackSrcPipe } from '@taiga-ui/core';
import { TuiButton } from '@taiga-ui/core';
import { UserApi } from '../../entities/user/user.api';
import { Router } from '@angular/router';
import { User } from '../../entities/user/user.model';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [AsyncPipe, CommonModule, TuiAvatar, TuiBadge, TuiFallbackSrcPipe, TuiButton, TuiPager],
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent {
  users = signal<User[]>([]);
  protected readonly isMobile = inject(TUI_IS_MOBILE);

  // пагинация
  protected page = signal(1);
  protected totalPages = signal(2);

  constructor(private userApi: UserApi, private router: Router) {}

  ngOnInit() {
    this.loadUsers(this.page());
  }

  loadUsers(page: number) {
    this.userApi.fetchUsers(page).subscribe((res) => {
      this.users.set(res.data);
      this.totalPages.set(res.total_pages || 1);
      this.page.set(page);
    });
  }

  goToUserDetail(userId: string | number) {
    this.router.navigate(['/users', userId]);
  }

  deleteUser(user: User) {
    this.userApi.deleteUser(user.id).subscribe(() => {
      this.users.update((u) => u.filter((x) => x.id !== user.id));
    });
  }

  prev() {
    const newPage = Math.max(this.page() - 1, 1);
    if (newPage !== this.page()) this.loadUsers(newPage);
  }

  next() {
    const newPage = Math.min(this.page() + 1, this.totalPages());
    if (newPage !== this.page()) this.loadUsers(newPage);
  }

  goToPage(index: any) {
    this.loadUsers(Number(index) + 1);
  }
}
