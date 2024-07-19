import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-get-catogery',
  templateUrl: './get-catogery.component.html',
  styleUrls: ['./get-catogery.component.css']
})
export class GetCatogeryComponent {
  catogery:any = [];

  message='';
  message2='';
  messageClass = '';

constructor(private route:ActivatedRoute ,private apiservice:ApiService){ }
  ngOnInit():void{
       this.getcatogery(); 
      }

getcatogery(){
  this.apiservice.get_catogery().subscribe({next:(data:any)=>
    {
      // console.log(data)
      // for(let emp of data){
      //   emp.newid=btoa(emp.id)
        
      //   emp.file=this.apiservice.baseURL+emp.file
      // }
      this.catogery=data
    } });
}

remove(id:any){
  console.log('Deleting category with ID:',id);
    // this.message = '';
    // this.message2 = '';
    
  this.apiservice.delete_catogery({ id: id }).subscribe({next:(res:any)=>
    {
      if(res['message']=='Category deleted successfully'){
        this.message="Deleted Successfully";
        this.messageClass = '';
        setTimeout(() => { this.message = ''; this.messageClass = ''; window.location.reload();}, 3000);
      }
      else{
        this.message2=res['message'];
        this.messageClass = 'error';
          setTimeout(() => { this.message2 = ''; this.messageClass = ''; }, 3000);
      }
    }
  })
}
}
