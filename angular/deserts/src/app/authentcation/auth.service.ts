import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  roleAs:any;
  constructor() { }

  isLogin(){
    return !!localStorage.getItem('user_data_login');
  }
  
  getRole() {
    var user_data: any =localStorage.getItem('user_data_login');
    user_data= JSON.parse(user_data);
    console.log(user_data['type'])
    this.roleAs=user_data['type'];
    return this.roleAs;
  }
}
