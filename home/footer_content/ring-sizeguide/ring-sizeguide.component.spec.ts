import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RingSizeguideComponent } from './ring-sizeguide.component';

describe('RingSizeguideComponent', () => {
  let component: RingSizeguideComponent;
  let fixture: ComponentFixture<RingSizeguideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RingSizeguideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RingSizeguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
