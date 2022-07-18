import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailsDisplayComponent } from './patient-details-display.component';

describe('PatientDetailsDisplayComponent', () => {
  let component: PatientDetailsDisplayComponent;
  let fixture: ComponentFixture<PatientDetailsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDetailsDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
