import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventViewDetailsComponent } from './event-view-details.component';

describe('EventViewDetailsComponent', () => {
  let component: EventViewDetailsComponent;
  let fixture: ComponentFixture<EventViewDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventViewDetailsComponent]
    });
    fixture = TestBed.createComponent(EventViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
