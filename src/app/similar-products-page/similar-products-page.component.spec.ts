import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarProductsPageComponent } from './similar-products-page.component';

describe('SimilarProductsPageComponent', () => {
  let component: SimilarProductsPageComponent;
  let fixture: ComponentFixture<SimilarProductsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarProductsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
