import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../_services/user-auth.service";
import {NgForm} from "@angular/forms";
import {EventService} from "../_services/event.service";
import {Event} from "../_model/event.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-new-event',
  templateUrl: './add-new-event.component.html',
  styleUrls: ['./add-new-event.component.css']
})
export class AddNewEventComponent implements OnInit {


  event: Event = {
    user: {email: "", id: 0, password: ""},
    id: 0,
    event_name: '',
    event_description: '',
    date_from: '',
    date_to: '',
    event_location: '',
    event_category: '',

  }

  constructor(private authService: UserAuthService, private eventService: EventService, private activatedRoute: ActivatedRoute, private router: Router) {

  }



  ngOnInit() {
   this.event = this.activatedRoute.snapshot.data['eventId'];
    this.eventService.checkEntry().subscribe(
      (response: any) => {
        if (response === false) {
          console.log("You don't have a user_id in events table", response);
          this.router.navigate(['/home']);
        }
      },
      (error: HttpErrorResponse) => {
        if (error) {
          console.log('Error:', error);
        }
      }
    );
  }


  addEvent(EventForm: NgForm) {
    this.eventService.addEvent(this.event).subscribe(
      (response: Event) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    );


  }
}
