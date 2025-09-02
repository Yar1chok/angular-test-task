import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserDetailPageComponent } from './user-detail-page.component';
import { UserApi } from '../../entities/user/user.api';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TuiRoot, TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';

describe('UserDetailPageComponent', () => {
  let component: UserDetailPageComponent;
  let fixture: ComponentFixture<UserDetailPageComponent>;
  let mockUserApi: any;
  let mockRouter: any;

  const mockUser = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    avatar: 'avatar.png',
  };

  beforeEach(async () => {
    mockUserApi = {
      fetchUser: jasmine.createSpy('fetchUser').and.returnValue(of({ data: mockUser })),
      updateUser: jasmine.createSpy('updateUser').and.returnValue(of({ data: mockUser })),
    };

    mockRouter = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiRoot,
        TuiButton,
        TuiTextfield,
        TuiAvatar,
        UserDetailPageComponent,
      ],
      providers: [
        FormBuilder,
        { provide: UserApi, useValue: mockUserApi },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user on init and patch form', () => {
    expect(mockUserApi.fetchUser).toHaveBeenCalledWith(1);
    expect(component.form.value.first_name).toBe('John');
    expect(component.form.value.last_name).toBe('Doe');
    expect(component.form.value.email).toBe('john@example.com');
    expect(component.user()).toEqual(mockUser);
  });

  it('should update user on save', fakeAsync(() => {
    spyOn(window, 'alert');

    component.form.patchValue({
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane@example.com',
    });
    component.save();
    tick();

    expect(mockUserApi.updateUser).toHaveBeenCalledWith(1, {
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane@example.com',
    });
    expect(window.alert).toHaveBeenCalledWith('User updated!');
    expect(component.user()?.first_name).toBe('Jane');
  }));

  it('should navigate back on goBack', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/users']);
  });
});
