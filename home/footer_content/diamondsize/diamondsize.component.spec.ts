import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiamondsizeComponent } from './diamondsize.component';

describe('DiamondsizeComponent', () => {
  let component: DiamondsizeComponent;
  let fixture: ComponentFixture<DiamondsizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiamondsizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiamondsizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
