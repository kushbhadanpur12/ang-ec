import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RingResizingComponent } from './ring-resizing.component';

describe('RingResizingComponent', () => {
  let component: RingResizingComponent;
  let fixture: ComponentFixture<RingResizingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RingResizingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RingResizingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
