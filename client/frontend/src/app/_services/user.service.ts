import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "./user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = 'http://localhost:8080/api';

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  )

  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) {
  }

  public login(loginData: any) {
    return this.httpClient.post(this.PATH_OF_API + '/publisher/authenticate', loginData, {headers: this.requestHeader});
  }

  public roleMatch(allowedRoles: string[]): boolean {
    const userRoles: any[] = this.userAuthService.getRoles();

    if (userRoles) {
      const isPublisher = userRoles.some(role => role.name === 'ROLE_PUBLISHER');

      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].name === allowedRoles[j] || (isPublisher && allowedRoles[j] === 'ROLE_USER')) {
            return true;
          }
        }
      }
    }

    return false;
  }

  public isPublisher(): boolean {
    const userRoles: any[] = this.userAuthService.getRoles();

    if (userRoles) {
      return userRoles.some(role => role.name === 'ROLE_PUBLISHER');
    }

    return false;
  }


  public register(registerData: any) {
    return this.httpClient.post(this.PATH_OF_API + '/publisher/register', registerData);
  }

  assignRole(userId: number | null, roleName: string) {
    return this.httpClient.post(`${this.PATH_OF_API}/users/${userId}/assign-role`, { roleName });
  }


}
