import {Component, OnInit} from '@angular/core';
import {Event} from "../_model/event.model";
import {ActivatedRoute} from "@angular/router";
import {PublisherService} from "../_services/publisher.service";
import {Publisher} from "../_model/publisher.model";
import {ImageProcessingService} from "../_services/image-processing.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-event-view-details',
  templateUrl: './event-view-details.component.html',
  styleUrls: ['./event-view-details.component.css']
})
export class EventViewDetailsComponent implements OnInit{

  // @ts-ignore
  event: Event;
  publisher: Publisher | undefined;

  constructor(private activatedRoute: ActivatedRoute, private publisherService: PublisherService
  , private imageProcessingService: ImageProcessingService) {
  }

  ngOnInit(): void {
    this.event = this.activatedRoute.snapshot.data['event'];
    this.loadPublisherInfo(this.event.user.id);
    console.log(this.event);
  }

  loadPublisherInfo(publisherId: number): void {
    this.publisherService.getPublisherById(publisherId)
      .pipe(
        map((publisher: Publisher) => {
          this.imageProcessingService.createImages(publisher);
          return publisher;
        })
      )
      .subscribe(
        (publisher: Publisher) => {
          this.publisher = publisher;
          console.log(this.publisher);
        },
        (error: any) => {
          console.error('Error loading publisher info:', error);
        }
      );
  }


}
