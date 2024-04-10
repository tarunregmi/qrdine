import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginPopupComponent } from './origin-popup.component';

describe('OriginPopupComponent', () => {
  let component: OriginPopupComponent;
  let fixture: ComponentFixture<OriginPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OriginPopupComponent]
    });
    fixture = TestBed.createComponent(OriginPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
