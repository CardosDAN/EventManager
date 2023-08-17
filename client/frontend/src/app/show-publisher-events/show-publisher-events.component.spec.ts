import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPublisherEventsComponent } from './show-publisher-events.component';

describe('ShowPublisherEventsComponent', () => {
  let component: ShowPublisherEventsComponent;
  let fixture: ComponentFixture<ShowPublisherEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowPublisherEventsComponent]
    });
    fixture = TestBed.createComponent(ShowPublisherEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
