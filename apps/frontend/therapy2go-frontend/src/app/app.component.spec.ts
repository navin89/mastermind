import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from './services/api.service';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';

describe('AppComponent', () => {

  const mockApiService = {
    getProductData: jasmine.createSpy('getProductData').and.returnValue(of({})),
    getTestIp: jasmine.createSpy('getTestIp').and.returnValue(of({}))
  };

  const mockLogger = {
    info: jasmine.createSpy('info')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot([])],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        provideAnimationsAsync(),
        provideAnimations(),
        provideNoopAnimations(),
        { provide: ApiService, useValue: mockApiService },
        { provide: NGXLogger, useValue: mockLogger }
      ],
    }).compileComponents();
  });

  it(`should have as title 'therapy2go-frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('therapy2go-frontend');
  });
});
