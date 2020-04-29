import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAwaitingComponent } from './list-awaiting.component';

describe('ListAwaitingComponent', () => {
  let component: ListAwaitingComponent;
  let fixture: ComponentFixture<ListAwaitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAwaitingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAwaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
