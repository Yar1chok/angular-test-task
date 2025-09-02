import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UsersPageComponent } from './users-page.component';
import { UserApi } from '../../entities/user/user.api';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TuiAvatar, TuiBadge, TuiPager } from '@taiga-ui/kit';
import { TuiButton, TuiFallbackSrcPipe } from '@taiga-ui/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';

describe('UsersPageComponent', () => {
  let component: UsersPageComponent;
  let fixture: ComponentFixture<UsersPageComponent>;
  let userApiMock: any;
  let routerMock: any;

  beforeEach(async () => {
    userApiMock = {
      fetchUsers: jasmine.createSpy('fetchUsers').and.returnValue(
        of({
          data: [
            { id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com', avatar: '' },
          ],
          total_pages: 1,
        })
      ),
      deleteUser: jasmine.createSpy('deleteUser').and.returnValue(of({})),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [
        UsersPageComponent,
        CommonModule,
        AsyncPipe,
        TuiAvatar,
        TuiBadge,
        TuiPager,
        TuiButton,
        TuiFallbackSrcPipe,
      ],
      providers: [
        { provide: UserApi, useValue: userApiMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component['users']()).toEqual([
      { id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com', avatar: '' },
    ]);
    expect(userApiMock.fetchUsers).toHaveBeenCalledWith(1);
  }));

  it('should navigate to user detail', () => {
    component.goToUserDetail(1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/users', 1]);
  });

  it('should delete a user', fakeAsync(() => {
    component['users'].set([
      { id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com', avatar: '' },
    ]);
    component.deleteUser({ id: 1 } as any);
    tick();
    expect(component['users']()).toEqual([]);
    expect(userApiMock.deleteUser).toHaveBeenCalledWith(1);
  }));

  it('should go to next page', fakeAsync(() => {
    component['totalPages'].set(2);
    component['page'].set(1);
    component.next();
    tick();
    expect(userApiMock.fetchUsers).toHaveBeenCalledWith(2);
  }));

  it('should go to previous page', fakeAsync(() => {
    component['page'].set(2);
    component.prev();
    tick();
    expect(userApiMock.fetchUsers).toHaveBeenCalledWith(1);
  }));

  it('should go to specific page', fakeAsync(() => {
    component.goToPage(1);
    tick();
    expect(userApiMock.fetchUsers).toHaveBeenCalledWith(2);
  }));
});
