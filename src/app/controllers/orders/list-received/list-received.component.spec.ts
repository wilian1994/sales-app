import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReceivedComponent } from './list-received.component';

describe('ListReceivedComponent', () => {
  let component: ListReceivedComponent;
  let fixture: ComponentFixture<ListReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
