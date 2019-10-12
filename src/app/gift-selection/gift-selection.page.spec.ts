import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftSelectionPage } from './gift-selection.page';

describe('GiftSelectionPage', () => {
  let component: GiftSelectionPage;
  let fixture: ComponentFixture<GiftSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftSelectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
