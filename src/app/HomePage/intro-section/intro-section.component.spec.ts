import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroSectionComponent } from './intro-section.component';

describe('IntroSectionComponent', () => {
  let component: IntroSectionComponent;
  let fixture: ComponentFixture<IntroSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntroSectionComponent]
    });
    fixture = TestBed.createComponent(IntroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
