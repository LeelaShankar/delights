import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempPasswordPage } from './temp-password.page';

describe('TempPasswordPage', () => {
  let component: TempPasswordPage;
  let fixture: ComponentFixture<TempPasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempPasswordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
