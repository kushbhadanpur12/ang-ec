import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationGuideComponent } from './education-guide.component';

describe('EducationGuideComponent', () => {
  let component: EducationGuideComponent;
  let fixture: ComponentFixture<EducationGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
