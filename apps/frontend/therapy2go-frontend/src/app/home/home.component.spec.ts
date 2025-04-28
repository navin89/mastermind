import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NGXLogger } from 'ngx-logger';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const mockApiService = {
    getProductData: jasmine.createSpy('getProductData').and.returnValue(of({})),
    getTestIp: jasmine.createSpy('getTestIp').and.returnValue(of({}))
  };

  const mockLogger = {
    info: jasmine.createSpy('info')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: NGXLogger, useValue: mockLogger }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should call API service methods on init', () => {
    expect(mockApiService.getProductData).toHaveBeenCalled();
    expect(mockApiService.getTestIp).toHaveBeenCalled();
  });

  it('should log info on init', () => {
    expect(mockLogger.info).toHaveBeenCalledWith('home component loaded');
  });
});
