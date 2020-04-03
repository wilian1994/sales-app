import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesMaterialComponent } from './categories-material.component';

describe('CategoriesMaterialComponent', () => {
  let component: CategoriesMaterialComponent;
  let fixture: ComponentFixture<CategoriesMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
