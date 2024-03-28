import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalOrdersComponent } from './local-orders.component';

describe('LocalOrdersComponent', () => {
  let component: LocalOrdersComponent;
  let fixture: ComponentFixture<LocalOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocalOrdersComponent]
    });
    fixture = TestBed.createComponent(LocalOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
