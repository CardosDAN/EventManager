import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserAuthService} from "../_services/user-auth.service";
import {Router} from "@angular/router";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userAuthService: UserAuthService, private router: Router,
  private cdRef: ChangeDetectorRef, public  userService: UserService) {

  }


  // @ts-ignore
  userId: number = this.userAuthService.getAuthenticatedUserId();

  ngOnInit(): void {
  }

  public isLoggedIn()  {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.cdRef.detectChanges();
    this.router.navigate(['/home']);
  }

  assignPublisherRole(): void {
    const roleName = 'ROLE_PUBLISHER';
    this.userService.assignRole(this.userId, roleName).subscribe(
      () => {
        console.log('Role assigned successfully');
      },
      error => {
        console.error('Error assigning role:', error);
      }
    );
  }

  isPublisher(): boolean {
    return this.userService.isPublisher();
  }

}
