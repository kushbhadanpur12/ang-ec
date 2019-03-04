import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricematchComponent } from './pricematch.component';

describe('PricematchComponent', () => {
  let component: PricematchComponent;
  let fixture: ComponentFixture<PricematchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricematchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricematchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
