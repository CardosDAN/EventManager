import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Publisher} from "../_model/publisher.model";

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private HttpClient: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api/publishers';

  public addPublisher(publisher: FormData){
    return this.HttpClient.post<Publisher>(this.apiUrl+ "/add", publisher);
  }

  public checkEntry(){
    return this.HttpClient.get<Publisher>(this.apiUrl + "/check");
  }

  public getPublisherById(publisherId: number){
    return this.HttpClient.get<Publisher>(this.apiUrl + "/publisherInfo/" + publisherId);
  }
}
