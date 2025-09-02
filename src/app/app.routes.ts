import { Routes } from '@angular/router';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UserDetailPageComponent } from './pages/user-detail-page/user-detail-page.component';
import { ResourcesPageComponent } from './pages/recources-page/recources-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersPageComponent },
  { path: 'users/:id', component: UserDetailPageComponent },
  { path: 'resources', component: ResourcesPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: '**', redirectTo: 'users' },
];
