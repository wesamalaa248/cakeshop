import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './authentcation/auth.guard';
import { AuthService } from './authentcation/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'deserts';
  islogin=true;
  islogout=true;
  issignup=true;

  username:any='';

  constructor(private router:Router,private auth:AuthService){
  }

  ngOnInit(){
  const userDataString = localStorage.getItem('user_data_login');
  if (userDataString) {
      const userData = JSON.parse(userDataString)
      this.username=userData.name
  }
  // this.username=JSON.parse(localStorage.getItem('user_data'))
  console.log(this.username);

    this.islogin=!this.auth.isLogin();
    this.islogout=this.auth.isLogin();
    this.issignup=!this.auth.isLogin();

  }


  logout(){
    localStorage.removeItem('user_data_login')
    this.router.navigate(['/login'])
    .then(() => {
      window.location.reload();
    });
  }
  
    isloggned(){
      return (this.router.url=="/login" || this.router.url=="/signup" 
      || this.router.url=="/menu" || this.router.url=="/get-products" || this.router.url=="/get-catogery"
      || this.router.url=="/dashboard")
    }
}
