import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFinalizedComponent } from './list-finalized.component';

describe('ListFinalizedComponent', () => {
  let component: ListFinalizedComponent;
  let fixture: ComponentFixture<ListFinalizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFinalizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFinalizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
