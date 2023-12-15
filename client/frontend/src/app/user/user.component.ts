import {Component, OnInit} from '@angular/core';
import {EventService} from "../_services/event.service";
import {Event} from "../_model/event.model";
import {Router} from "@angular/router";
import {PublisherService} from "../_services/publisher.service";
import {ImageProcessingService} from "../_services/image-processing.service";
import {map} from "rxjs/operators";
import {Publisher} from "../_model/publisher.model";

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
  publisher: any;
  constructor(private eventService: EventService, private router: Router, private publisherService: PublisherService, private imageProcessingService: ImageProcessingService) {
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  publisherInfo: { [key: number]: any } = {};

  loadEvents(): void {
    this.eventService.listEvents(this.dateFrom, this.dateTo, this.category, this.location).subscribe(
      (response: any) => {
        this.events = response;
        for (let event of this.events) {
          this.getPublisherInfo(event.user.id);
        }
        console.log(response)
      },
      (error : any) => {
        console.error('Eroare la încărcarea evenimentelor:', error);
      }
    );
  }
  getPublisherInfo(publisherId: number): void {
    this.publisherService.getPublisherById(publisherId)
      .pipe(
        map((publisher: Publisher) => {
          this.publisherInfo[publisherId] = publisher;
          this.imageProcessingService.createImage(publisher);
          return publisher;
        })
      )
      .subscribe(
        (publisher: Publisher) => {
          this.publisherInfo[publisherId] = publisher;
          console.log('Publisher Info:', this.publisherInfo);
        },
        (error: any) => {
          console.error('Error loading publisher info:', error);
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
