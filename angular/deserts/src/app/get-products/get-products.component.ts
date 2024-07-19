import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styleUrls: ['./get-products.component.css']
})
export class GetProductsComponent {
  products:any = [];

  message='';
  message2='';
  messageClass = '';
  
  constructor(private route:ActivatedRoute ,private apiservice:ApiService){
  }
  ngOnInit():void{
 this.getproducts();
}

getproducts(){
  this.apiservice.get_products().subscribe({next:(data:any)=>
    {
      console.log(data);
      this.products=data
    } });
}

remove(id:any){
  console.log('Deleting product with ID:',id);
    this.message = '';
    this.message2 = '';
    
  this.apiservice.delete_product({ id:id }).subscribe({next:(res:any)=>
    {
      if(res['message']=='Product deleted successfully'){
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
