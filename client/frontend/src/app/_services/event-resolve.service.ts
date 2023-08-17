import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {EventService} from "./event.service";
import {Event} from "../_model/event.model";

@Injectable({
  providedIn: 'root'
})
export class EventResolveService implements Resolve<Event> {



  constructor(private eventService: EventService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Event> {
    const id = route.paramMap.get('eventId');
    if (id !== null) {
      return this.eventService.getEventById(id);
    } else {
      return of(this.getEventDetails());
    }
  }

  getEventDetails(): Event{
   return {
     user: {email: "", id: 0, password: ""},
     id: 0,
     event_name: '',
     event_description: '',
     date_from: '',
      date_to: '',
     event_location: '',
     event_category: ''
   }
  }
}
