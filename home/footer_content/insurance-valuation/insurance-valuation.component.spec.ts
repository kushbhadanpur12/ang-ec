import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceValuationComponent } from './insurance-valuation.component';

describe('InsuranceValuationComponent', () => {
  let component: InsuranceValuationComponent;
  let fixture: ComponentFixture<InsuranceValuationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceValuationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceValuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
