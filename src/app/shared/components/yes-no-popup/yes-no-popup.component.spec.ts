import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoPopupComponent } from './yes-no-popup.component';

describe('YesNoPopupComponent', () => {
  let component: YesNoPopupComponent;
  let fixture: ComponentFixture<YesNoPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YesNoPopupComponent]
    });
    fixture = TestBed.createComponent(YesNoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
