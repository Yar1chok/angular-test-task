import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegisterPageComponent } from './register-page.component';
import { AuthApi } from '../../entities/auth/auth.api';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;
  let mockAuthApi: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockAuthApi = {
      register: jasmine.createSpy('register'),
      setToken: jasmine.createSpy('setToken'),
    };

    mockRouter = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, TuiButton, TuiTextfield, RegisterPageComponent],
      providers: [
        { provide: AuthApi, useValue: mockAuthApi },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if form invalid', () => {
    component.form.patchValue({ username: '', email: '', password: '' });
    component.submit();
    expect(mockAuthApi.register).not.toHaveBeenCalled();
  });

  it('should register successfully and navigate', fakeAsync(() => {
    component.form.patchValue({ username: 'John', email: 'john@example.com', password: '1234' });
    const tokenResponse = { token: 'abcd' };
    mockAuthApi.register.and.returnValue(of(tokenResponse));

    component.submit();
    tick();

    expect(mockAuthApi.register).toHaveBeenCalledWith('John', 'john@example.com', '1234');
    expect(mockAuthApi.setToken).toHaveBeenCalledWith('abcd');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/users']);
    expect(component.error).toBeNull();
  }));

  it('should handle registration error', fakeAsync(() => {
    component.form.patchValue({ username: 'John', email: 'john@example.com', password: '1234' });
    mockAuthApi.register.and.returnValue(throwError(() => new Error('error')));

    component.submit();
    tick();

    expect(component.error).toBe('Ошибка регистрации. Проверьте данные.');
  }));

  it('should navigate to login', () => {
    component.goToLogin();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
