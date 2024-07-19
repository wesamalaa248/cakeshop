import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

constructor(private route:ActivatedRoute ,private apiservice:ApiService){
  }

tests:any=[];
fav:any=[];

ngOnInit():void{

  this.apiservice.get_products_home('pro_sec_id=1')
    .subscribe({next:(data:any)=>
      {
        // console.log(data);
        for(let pro of data){
          pro.newid=btoa(pro.pro_id)
          console.log(pro.newid)
        }
        this.tests=data;
        // console.log(this.tests);
      } })

      this.apiservice.get_products_home('pro_sec_id=2')
    .subscribe({next:(data:any)=>
      {
        for(let pro of data){
          pro.newid=btoa(pro.pro_id)
          console.log(pro.newid)
        }
        this.fav=data;
        // console.log(this.fav);
      } })
}
}
