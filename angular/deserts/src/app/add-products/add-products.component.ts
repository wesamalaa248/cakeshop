import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  form:FormGroup;
  message='';
  message2='';
  messageClass = '';
  catogery:any = []

  constructor(private formBuilder:FormBuilder,private apiservice:ApiService,private router: Router){

    this.form=this.formBuilder.group({
      name:[''],
      price:[''],
      quantity:[''],
      description:[''],
      catogery:[''],
      image:[''] });
  }
  // get f(){
  //   return this.form.controls;
  // }

  submit(){
    console.log(this.form.value)
  
  this.apiservice.insert_product(this.form.value).subscribe({next:(data:any)=>{
     
      if(data['message']=='Operation Successful'){
        this.message="Product added Successfully";
        this.messageClass = '';
        setTimeout(() => { this.message = ''; this.messageClass = ''; this.router.navigate(["/get-products"]);}, 3000);
      }
      else{
        this.message2=data['message'];
        this.messageClass = 'error';
          setTimeout(() => { this.message2 = ''; this.messageClass = ''; }, 3000);
      }
    }})
  
  }
  ngOnInit():void{
this.apiservice.get_catogery().subscribe({next:(data:any)=>
      {
        // console.log(data)
        this.catogery=data
      } 
  })

}
}
