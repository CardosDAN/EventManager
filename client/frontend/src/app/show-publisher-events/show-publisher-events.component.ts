import {Component, OnInit} from '@angular/core';
import {Event} from "../_model/event.model";
import {EventService} from "../_services/event.service";
import {UserAuthService} from "../_services/user-auth.service";
import {catchError, throwError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-show-publisher-events',
  templateUrl: './show-publisher-events.component.html',
  styleUrls: ['./show-publisher-events.component.css']
})
export class ShowPublisherEventsComponent implements OnInit {

  events: Event[] = [];
  authUserId: number = 0;

  constructor(private eventService: EventService, private userAuthService: UserAuthService
  , private router: Router) {
  }


  ngOnInit(): void {
    this.authUserId = this.userAuthService.getAuthenticatedUserId() || 0;
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEventsByPublisherId(this.authUserId).subscribe(
      (events: Event[]) => {
        this.events = events;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteEvent(eventId: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventId).pipe(
        catchError(error => {
          console.error('Error deleting event:', error);

          return throwError(error);
        })
      ).subscribe(
        () => {

          this.events = this.events.filter(event => event.id !== eventId);
        }
      );
    }
  }

  updateEvent(eventId: number) {
    console.log((eventId));
    this.router.navigate(['/addNewEvent', {eventId: eventId}]);
  }

  showEvent(eventId: number, publisherId: number) {
    this.router.navigate(['/eventViewDetails', {eventId: eventId, publisherId: publisherId}]);
  }


}
