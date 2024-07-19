import { ApiService } from './../services/api.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  form:FormGroup;
  message='';
  message2='';

constructor(private formBuilder:FormBuilder,private apiservice:ApiService,private router: Router){

  this.form=this.formBuilder.group({
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    phone:['',[Validators.required]],
    pass: ['', [Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/)]],
    confpassword:['',[Validators.required]]},{validator: this.passwordMatchValidator});

}
passwordMatchValidator(formGroup: FormGroup) {
  
  const passwordControl = formGroup.get('pass');
  const confirmPasswordControl = formGroup.get('confpassword');

  if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;
  
      if (password !== confirmPassword) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }


}

get f(){
  return this.form.controls;
}
ngOnInit():void{

}
submit(){
  console.log(this.form.value)
  this.message='';
  this.message2='';

  this.apiservice.insert_data(this.form.value).subscribe({next:(res:any)=>{
   
    if(res['message']=='Operation Successful'){
      this.message="Registration Successfully";
      this.router.navigate(["/home"]);
    }
    else{
      this.message2=res['message'];
    }
  }})

}






























  text="Sign Up";
  // fullname="";
  // email="";
  // password="";
  // repassword="";
  // messagename="";
  // messagepass="";
  // messagecheck="";
  // messageemail="";

  // isButtonDisabled():boolean{
  //   return !(this.fullname && this.email && this.password && this.repassword);
  // }
 
//  constructor(private router: Router) {}

  // clickme():void{
  //   if(this.fullname =="" || this.fullname.length < 5){
  //           this.messagename="invalid name"
  //   }
  //   else if (this.email.trim() === "" || !this.isValidEmail(this.email.trim())) {
  //     this.messageemail = "Invalid email address.";
  //   }
  //   else if(this.password == " " || this.password.length < 5 ){
  //     this.messagepass="password not be empty and at least 5 digit"
  //    } 
  //    else if(this.password !== this.repassword ){
  //     this.messagecheck="Password and repeatpassword should be same"
  // }
  // else{
  //   alert("sign success");
  //   this.router.navigate(["/login"])
  // }
  // }
  // private isValidEmail(email: string): boolean {
  //   // Regular expression for email validation
  //   const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // }
}
