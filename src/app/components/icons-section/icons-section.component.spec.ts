import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsSectionComponent } from './icons-section.component';

describe('IconsSectionComponent', () => {
  let component: IconsSectionComponent;
  let fixture: ComponentFixture<IconsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconsSectionComponent]
    });
    fixture = TestBed.createComponent(IconsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
