import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Event} from "../_model/event.model";
import {Observable} from "rxjs";
import {User} from "../_model/user.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient) { }
  private apiUrl = 'http://localhost:8080/api/events';

  public addEvent(event: Event){
    return this.httpClient.post<Event>(this.apiUrl+ "/add", event);
  }

  getAllEventsByPublisherId(publisherId: number){
    return this.httpClient.get<Event[]>(this.apiUrl + "/publisher/" + publisherId);
  }

  deleteEvent(eventId: number){
    return this.httpClient.delete(this.apiUrl + "/delete/" + eventId);
  }

  public getEventById(eventId: any){
    return this.httpClient.get<Event>(this.apiUrl + "/event/" + eventId);
  }

  listEvents(
    dateFrom?: string,
    dateTo?: string,
    category?: string,
    location?: string,
  ): Observable<any> {
    let params = new HttpParams();

    if (dateFrom) params = params.set('date_from', dateFrom);
    if (dateTo) params = params.set('date_to', dateTo);
    if (category) params = params.set('category', category);
    if (location) params = params.set('location', location);

    return this.httpClient.get<any>(`${this.apiUrl}/user/list`, { params });
  }

  public checkEntry(){
    return this.httpClient.get<Event>(this.apiUrl + "/check");
  }

  public registerToEvent(eventId: number){
    return this.httpClient.post<Event>(this.apiUrl + "/user/register/" + eventId, null);
  }

  public unregisterEvent(eventId: number){
    return this.httpClient.delete(this.apiUrl + "/user/unregister/" + eventId);
  }

  public isUserRegisteredForEvent(eventId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(this.apiUrl + `/isRegistered/${eventId}`);
  }

  getEventParticipants(eventId: number): Observable<User[]> {
    const url = `${this.apiUrl}/event/registrations/${eventId}`;
    return this.httpClient.get<User[]>(url);
  }



}
