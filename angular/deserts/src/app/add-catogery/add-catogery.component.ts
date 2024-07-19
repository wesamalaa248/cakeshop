import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-catogery',
  templateUrl: './add-catogery.component.html',
  styleUrls: ['./add-catogery.component.css']
})
export class AddCatogeryComponent {
  form:FormGroup;
  message='';
  message2='';
  messageClass = '';

  constructor(private formBuilder:FormBuilder,private apiservice:ApiService,private router: Router){

    this.form=this.formBuilder.group({
      name:['',[Validators.required]],
      file:[''],
      fileSource:[''],  });
  }
  
  //function file
  public  onFileChange(event:any){
    console.log(event.target.files)
       if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.form.patchValue({
          fileSource: file
        });
      }
  }

  get f(){
    return this.form.controls;
  }
  submit(){
    console.log(this.form.value)

    const formData = new FormData();
    formData.append('fileSource',this.form.controls['fileSource'].value);
    formData.append('name',this.form.controls['name'].value);
    formData.append('file',this.form.controls['file'].value);
    
    this.apiservice.insert_catogery(formData).subscribe({next:(res:any)=>{
     
      if(res['message']=='Operation Successful'){
        this.message="Added Successfully";
        this.messageClass = '';
        setTimeout(() => { this.message = ''; this.messageClass = ''; this.router.navigate(["/get-catogery"]);}, 3000);
      }
      else{
        this.message2=res['message'];
        this.messageClass = 'error';
          setTimeout(() => { this.message2 = ''; this.messageClass = ''; }, 3000);
      }
    }})
  }
}
