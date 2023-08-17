import {Component, OnInit} from '@angular/core';
import {EventService} from "../_services/event.service";
import {Event} from "../_model/event.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  events: Event[] = [];
  user: any[] = [];
  dateFrom: string = '';
  dateTo: string = '';
  category: string = '';
  location: string = '';

  constructor(private eventService: EventService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.listEvents(this.dateFrom, this.dateTo, this.category, this.location).subscribe(
      (response: any) => {
        this.events = response;
        console.log(response)
      },
      (error : any) => {
        console.error('Eroare la încărcarea evenimentelor:', error);
      }
    );
  }

  applyFilters(): void {
    this.loadEvents();
  }
  showEvent(eventId: number,  publisherId: number) {
    this.router.navigate(['/eventViewDetails', {eventId: eventId, publisherId: publisherId}]);
  }

}
