import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxuryPackagingComponent } from './luxury-packaging.component';

describe('LuxuryPackagingComponent', () => {
  let component: LuxuryPackagingComponent;
  let fixture: ComponentFixture<LuxuryPackagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuxuryPackagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxuryPackagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
