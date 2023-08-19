import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../_services/user-auth.service";
import {UserService} from "../_services/user.service";
import {User} from "../_model/user.model";
import {map} from "rxjs/operators";
import {Publisher} from "../_model/publisher.model";
import {ImageProcessingService} from "../_services/image-processing.service";
import {PublisherService} from "../_services/publisher.service";
import {EventService} from "../_services/event.service";
import {Event} from "../_model/event.model";

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

    // @ts-ignore
    userDetails: User;
    // @ts-ignore
    publisher: Publisher;

    events: Event[] = [];

    // @ts-ignore
    authUserId: number;

    constructor(private userAuthService: UserAuthService, private userService: UserService, private imageProcessingService: ImageProcessingService
      , private publisherService: PublisherService, private eventService: EventService
    ) {
    }

    ngOnInit(): void {
        // @ts-ignore
        this.authUserId = this.userAuthService.getAuthenticatedUserId();
        this.loadPublisherInfo();
        this.loadEvents();

        // @ts-ignore
        this.userService.getUserById(this.authUserId).subscribe(
            (details: any) => {
                this.userDetails = details;
            },
            (error: any) => {
                console.error('Error fetching user details:', error);
            }
        );
    }

    loadPublisherInfo(): void {
        // @ts-ignore
        this.publisherService.getPublisherById(this.authUserId)
            .pipe(
                map((publisher: any) => {
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


}
