import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product:any=[]
  productid: any;

  constructor(private route: ActivatedRoute,private apiservice:ApiService) { }

  ngOnInit(): void {
    const hashedId = this.route.snapshot.paramMap.get('id');

    if (hashedId) {
      this.productid = atob(hashedId);
    } else {
      console.error('ID parameter is missing');
    }
    console.log(this.productid)
    this.apiservice.get_products_details('pro_id='+this.productid)
    .subscribe({ next:(data:any)=>{
      console.log(data)
      this.product=data[0]
    }})
  }
}
