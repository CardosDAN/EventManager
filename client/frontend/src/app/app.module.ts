import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {PublisherComponent} from './publisher/publisher.component';
import {UserComponent} from './user/user.component';
import {LoginComponent} from './login/login.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from "./footer/footer.component";
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {AuthInterceptor} from "./_auth/auth.interceptor";
import {UserService} from "./_services/user.service";
import {AuthGuard} from "./_auth/auth.guard";
import { AddNewEventComponent } from './add-new-event/add-new-event.component';
import { ShowPublisherEventsComponent } from './show-publisher-events/show-publisher-events.component';
import { EventViewDetailsComponent } from './event-view-details/event-view-details.component';
import { RegisterComponent } from './register/register.component';
import { UserDetailsComponent } from './user-details/user-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PublisherComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ForbiddenComponent,
    AddNewEventComponent,
    ShowPublisherEventsComponent,
    EventViewDetailsComponent,
    RegisterComponent,
    UserDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
