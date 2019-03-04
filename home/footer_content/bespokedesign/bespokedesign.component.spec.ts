import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BespokedesignComponent } from './bespokedesign.component';

describe('BespokedesignComponent', () => {
  let component: BespokedesignComponent;
  let fixture: ComponentFixture<BespokedesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BespokedesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BespokedesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
