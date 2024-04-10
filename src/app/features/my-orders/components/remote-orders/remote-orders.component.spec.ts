import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteOrdersComponent } from './remote-orders.component';

describe('RemoteOrdersComponent', () => {
  let component: RemoteOrdersComponent;
  let fixture: ComponentFixture<RemoteOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoteOrdersComponent]
    });
    fixture = TestBed.createComponent(RemoteOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
