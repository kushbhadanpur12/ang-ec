import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryinfoComponent } from './deliveryinfo.component';

describe('DeliveryinfoComponent', () => {
  let component: DeliveryinfoComponent;
  let fixture: ComponentFixture<DeliveryinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
