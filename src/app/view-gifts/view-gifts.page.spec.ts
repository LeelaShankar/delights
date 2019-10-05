import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGiftsPage } from './view-gifts.page';

describe('ViewGiftsPage', () => {
  let component: ViewGiftsPage;
  let fixture: ComponentFixture<ViewGiftsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGiftsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGiftsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
