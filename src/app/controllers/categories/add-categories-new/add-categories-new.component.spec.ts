import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoriesNewComponent } from './add-categories-new.component';

describe('AddCategoriesNewComponent', () => {
  let component: AddCategoriesNewComponent;
  let fixture: ComponentFixture<AddCategoriesNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategoriesNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoriesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
