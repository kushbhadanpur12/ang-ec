import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GloballoginComponent } from './globallogin.component';

describe('GloballoginComponent', () => {
  let component: GloballoginComponent;
  let fixture: ComponentFixture<GloballoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GloballoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GloballoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
