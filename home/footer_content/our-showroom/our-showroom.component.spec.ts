import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurShowroomComponent } from './our-showroom.component';

describe('OurShowroomComponent', () => {
  let component: OurShowroomComponent;
  let fixture: ComponentFixture<OurShowroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurShowroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurShowroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
