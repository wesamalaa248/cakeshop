import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../services/api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products:any =[] //call array with data in apiservice and put it in this

  message='';
  

  catogeryid:any;
  //call api service class by make object of it and call route
  constructor(private route:ActivatedRoute ,private apiservice:ApiService){
  }

  addtocart(productId: number): void {
    this.apiservice.addtocart(productId).subscribe({next:()=>{
      this.message="Product added to Favourite";
      setTimeout(() => { this.message = ''; }, 3000);
    }});
  }

  ngOnInit():void{
    //put in array = the object and call function
    // this.product=this.apiservice.get_products();
    // console.log(this.product)
  

  //get products by category id
  //id send in url encrypt if is encrypt must be decrypt to know this (id) and do cycle
  const hashedId = this.route.snapshot.paramMap.get('id');
    if (hashedId) {
      this.catogeryid = atob(hashedId);
    } else {
      console.error('ID parameter is missing');
    }
    // console.log(this.catogeryid);

    this.apiservice.get_products_catogery('pro_cat_id='+this.catogeryid)
    .subscribe({next:(data:any)=>
      {
        console.log(data);
        for(let pro of data){
          pro.newid=btoa(pro.pro_id)
          console.log(pro.newid)
        }
        this.products=data;
        // console.log(this.products);
      } })

  
  }

}
