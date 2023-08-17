import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../_services/user.service";
import {UserAuthService} from "../_services/user-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
              private userAuthService: UserAuthService,
              private router: Router
  ) {
  }

  ngOnInit() {

  }

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setToken(response.accessToken);
        this.userAuthService.setRoles(response.user.roles);
        this.userAuthService.setUser(response.user);
        console.log(response.user);


        const roles = response.user.roles[0].name;
        if (roles ==='ROLE_PUBLISHER') {
          this.router.navigate(['/publisher']);
        } else if (roles === 'ROLE_USER') {
          this.router.navigate(['/user']);
        }

      },
      (error) => {
        console.log(error);
      }
    );
  }

  register() {
    this.router.navigate(['/register']);
  }


}
