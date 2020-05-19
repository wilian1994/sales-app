import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPendingComponent } from './dialog-pending.component';

describe('DialogPendingComponent', () => {
  let component: DialogPendingComponent;
  let fixture: ComponentFixture<DialogPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
