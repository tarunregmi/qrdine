import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteOrdersFormComponent } from './remote-orders-form.component';

describe('RemoteOrdersFormComponent', () => {
  let component: RemoteOrdersFormComponent;
  let fixture: ComponentFixture<RemoteOrdersFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoteOrdersFormComponent]
    });
    fixture = TestBed.createComponent(RemoteOrdersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
