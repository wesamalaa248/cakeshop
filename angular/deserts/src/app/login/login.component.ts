import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  text="log In";
  imageurl="../assets/login.jpg";

  form:FormGroup;
  message='';
  message2='';

  constructor(private formBuilder:FormBuilder,private apiservice:ApiService,private router: Router){
    
    this.form=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password: ['', [Validators.required]],
  });
   }

   get f(){
    return this.form.controls;
  }

  login(){
    console.log(this.form.value)
    this.message=''
    this.message2=''
  
    this.apiservice.login(this.form.value).subscribe({next:(res:any)=>{
     
      if(res['message']=='Login success'){
        this.message="Login success";

        console.log(res['user_data_login']);
        localStorage.setItem('user_data_login', JSON.stringify(res['user_data_login']));

        this.router.navigate(["/home"]).then(() => {
          window.location.reload();
        });
      }
      else{
        this.message2=res['message'];
      }
    }})
  
  }
  













  // clickme():void{
  //   if(this.email=="wesam@gmail.com" && this.pass=="12345"){
  //           this.router.navigate(["/home"]);
  //   }
  //   else{
  //     this.message="login faild";
  //   }
  // }
  // constructor(private router:Router){
  // }
}
