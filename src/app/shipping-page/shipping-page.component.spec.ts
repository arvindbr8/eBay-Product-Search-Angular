import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingPageComponent } from './shipping-page.component';

describe('ShippingPageComponent', () => {
  let component: ShippingPageComponent;
  let fixture: ComponentFixture<ShippingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
