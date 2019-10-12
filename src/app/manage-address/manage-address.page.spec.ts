import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAddressPage } from './manage-address.page';

describe('ManageAddressPage', () => {
  let component: ManageAddressPage;
  let fixture: ComponentFixture<ManageAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAddressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
