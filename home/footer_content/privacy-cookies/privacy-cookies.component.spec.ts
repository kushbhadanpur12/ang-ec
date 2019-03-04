import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyCookiesComponent } from './privacy-cookies.component';

describe('PrivacyCookiesComponent', () => {
  let component: PrivacyCookiesComponent;
  let fixture: ComponentFixture<PrivacyCookiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacyCookiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
