import {Component, OnInit} from '@angular/core';
import {Event} from "../_model/event.model";
import {ActivatedRoute} from "@angular/router";
import {PublisherService} from "../_services/publisher.service";
import {Publisher} from "../_model/publisher.model";
import {ImageProcessingService} from "../_services/image-processing.service";
import {map} from "rxjs/operators";
import {EventService} from "../_services/event.service";
import {User} from "../_model/user.model";

@Component({
  selector: 'app-event-view-details',
  templateUrl: './event-view-details.component.html',
  styleUrls: ['./event-view-details.component.css']
})
export class EventViewDetailsComponent implements OnInit{

  // @ts-ignore
  event: Event;
  publisher: Publisher | undefined;
  // @ts-ignore
  isUserRegistered: boolean;
  participants: User[] = [];


  constructor(private activatedRoute: ActivatedRoute, private publisherService: PublisherService
  , private imageProcessingService: ImageProcessingService, private eventService: EventService) {
  }

  ngOnInit(): void {
    this.event = this.activatedRoute.snapshot.data['event'];
    this.loadPublisherInfo(this.event.user.id);
    this.checkUserRegistration(this.event.id);
    this.getRegisteredUsers(this.event.id);

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

  unregisterEvent(eventId: number){
    this.eventService.unregisterEvent(eventId).subscribe(
      (response: any) => {
        console.log("User_id deleted" + response);
        window.location.reload();
      },
      (error: any) => {
        console.error('Error unregistering event:', error);
      }
    );
  }

  checkUserRegistration(eventId: number) {
    this.eventService.isUserRegisteredForEvent(eventId).subscribe(
      (isRegistered: boolean) => {
        this.isUserRegistered = isRegistered;
      },
      (error: any) => {
        console.error('Error checking user registration:', error);
      }
    );
  }

  registerToEvent(eventId: number) {
    this.eventService.registerToEvent(eventId).subscribe(
      (response: any) => {
        console.log(response);
        if (response === eventId){
          alert("User has been register with success!");
          window.location.reload();
        }
      },
      (error : any) => {
        console.error('Error at registration:', error);
      }
    );
  }

  getRegisteredUsers(eventId: number) {
    this.eventService.getEventParticipants(eventId).subscribe(
      (participants: User[]) => {
        this.participants = participants;
      },
      (error: any) => {
        console.error('Error fetching event participants:', error);
      }
    );
  }



}
