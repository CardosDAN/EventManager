import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PublisherComponent} from "./publisher/publisher.component";
import {UserComponent} from "./user/user.component";
import {LoginComponent} from "./login/login.component";
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {AuthGuard} from "./_auth/auth.guard";
import {AddNewEventComponent} from "./add-new-event/add-new-event.component";
import {ShowPublisherEventsComponent} from "./show-publisher-events/show-publisher-events.component";
import {EventResolveService} from "./_services/event-resolve.service";
import {EventViewDetailsComponent} from "./event-view-details/event-view-details.component";
import {RegisterComponent} from "./register/register.component";
import {UserDetailsComponent} from "./user-details/user-details.component";


const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard], data:{roles:['ROLE_PUBLISHER', 'ROLE_USER']}},
  {path: 'publisher', component: PublisherComponent, canActivate: [AuthGuard], data:{roles:['ROLE_PUBLISHER']}},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard], data:{roles:['ROLE_PUBLISHER', 'ROLE_USER']}},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: 'addNewEvent', component: AddNewEventComponent, canActivate: [AuthGuard], data:{roles:['ROLE_PUBLISHER']},
  resolve:{eventId: EventResolveService}},
  {path: 'showPublisherEvents', component: ShowPublisherEventsComponent, canActivate: [AuthGuard], data:{roles:['ROLE_PUBLISHER']}},
  {path: 'eventViewDetails', component: EventViewDetailsComponent, canActivate: [AuthGuard], data:{roles:['ROLE_PUBLISHER', 'ROLE_USER']},
  resolve:{ event: EventResolveService}},
  {path: 'userDetails', component: UserDetailsComponent, canActivate: [AuthGuard], data:{roles:['ROLE_USER']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
