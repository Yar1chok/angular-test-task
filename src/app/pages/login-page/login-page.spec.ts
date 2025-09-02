import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { AuthApi } from '../../entities/auth/auth.api';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let authApiMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authApiMock = {
      login: jasmine.createSpy('login'),
      setToken: jasmine.createSpy('setToken'),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, TuiButton, TuiTextfield, LoginPageComponent],
      providers: [
        { provide: AuthApi, useValue: authApiMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('should login successfully', fakeAsync(() => {
    const token = 'mock-token';
    authApiMock.login.and.returnValue(of({ token }));

    component.form.setValue({ email: 'test@example.com', password: '123456' });
    component.submit();
    tick();

    expect(authApiMock.login).toHaveBeenCalledWith('test@example.com', '123456');
    expect(authApiMock.setToken).toHaveBeenCalledWith(token);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/users']);
    expect(component.error()).toBeNull();
  }));

  it('should set error on failed login', fakeAsync(() => {
    authApiMock.login.and.returnValue(throwError(() => new Error('Failed')));

    component.form.setValue({ email: 'test@example.com', password: 'wrong' });
    component.submit();
    tick();

    expect(component.error()).toBe('Ошибка авторизации. Проверьте email и пароль.');
    expect(routerMock.navigate).not.toHaveBeenCalled();
  }));

  it('should not submit if form is invalid', () => {
    component.form.setValue({ email: '', password: '' });
    component.submit();

    expect(authApiMock.login).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to register page', () => {
    component.goToRegister();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/register']);
  });
});
