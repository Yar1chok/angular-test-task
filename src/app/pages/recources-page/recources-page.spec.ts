import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ResourcesPageComponent } from './recources-page.component';
import { RecourceApi } from '../../entities/resource/recource.api';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiPager } from '@taiga-ui/kit';
import { Resource } from '../../entities/resource/recource.model';

describe('ResourcesPageComponent', () => {
  let component: ResourcesPageComponent;
  let fixture: ComponentFixture<ResourcesPageComponent>;
  let mockApi: any;

  beforeEach(async () => {
    mockApi = {
      fetchResources: jasmine.createSpy('fetchResources'),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, TuiButton, TuiPager, TuiTextfield, ResourcesPageComponent],
      providers: [{ provide: RecourceApi, useValue: mockApi }],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourcesPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load resources on init', fakeAsync(() => {
    const mockData: Resource[] = [{ id: 1, name: 'Res1' } as any];
    mockApi.fetchResources.and.returnValue(of({ data: mockData, total_pages: 2 }));

    component.ngOnInit();
    tick();

    expect(component.resources()).toEqual(mockData);
    expect(component.totalPages()).toBe(2);
    expect(component.page()).toBe(1);
  }));

  it('should load next page', fakeAsync(() => {
    const mockData: Resource[] = [{ id: 2, name: 'Res2' } as any];

    mockApi.fetchResources.and.callFake((page: number) => of({ data: mockData, total_pages: 2 }));

    component['page'].set(1);
    component['totalPages'].set(2);

    component.next();
    tick();

    expect(component['page']()).toBe(2);
    expect(component.resources()).toEqual(mockData);
    expect(mockApi.fetchResources).toHaveBeenCalledWith(2);
  }));

  it('should load prev page', fakeAsync(() => {
    const mockData: Resource[] = [{ id: 1, name: 'Res1' } as any];
    mockApi.fetchResources.and.returnValue(of({ data: mockData, total_pages: 2 }));

    component.page.set(2);
    component.prev();
    tick();

    expect(component.page()).toBe(1);
    expect(component.resources()).toEqual(mockData);
  }));

  it('should go to specific page', fakeAsync(() => {
    const mockData: Resource[] = [{ id: 3, name: 'Res3' } as any];
    mockApi.fetchResources.and.returnValue(of({ data: mockData, total_pages: 3 }));

    component.goToPage(2);
    tick();

    expect(component.page()).toBe(3);
    expect(component.resources()).toEqual(mockData);
  }));
});
