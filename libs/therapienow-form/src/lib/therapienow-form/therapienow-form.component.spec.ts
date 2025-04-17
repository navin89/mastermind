import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TherapienowFormComponent } from './therapienow-form.component';

describe('TherapienowFormComponent', () => {
  let component: TherapienowFormComponent;
  let fixture: ComponentFixture<TherapienowFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TherapienowFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TherapienowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
