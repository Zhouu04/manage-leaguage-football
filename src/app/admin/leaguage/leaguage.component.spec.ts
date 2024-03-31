import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguageComponent } from './leaguage.component';

describe('LeaguageComponent', () => {
  let component: LeaguageComponent;
  let fixture: ComponentFixture<LeaguageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaguageComponent]
    });
    fixture = TestBed.createComponent(LeaguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
