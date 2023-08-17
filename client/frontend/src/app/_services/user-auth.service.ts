import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: any[]){
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): any[]{
    return  JSON.parse(localStorage.getItem('roles') || '[]');
  }

  public setToken(accessToken: string){
    localStorage.setItem('accessToken', accessToken);
  }

  public getToken(): string {
    return localStorage.getItem('accessToken') || 'null';
  }

  public clear(){
    localStorage.removeItem('roles');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }
  public isLoggedIn(){
    const roles = this.getRoles();
    const token = this.getToken();
    const user = this.getAuthUser();
    return roles.length > 0 && token !== null && user !== null;

  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getAuthUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  public getAuthenticatedUserId(): number | null {
    const token = this.getToken();
    if (token !== 'null') {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const userIdString = tokenPayload.sub.split(',')[0];
      const userId = parseInt(userIdString, 10);
      return userId;
    }
    return null;
  }


}
