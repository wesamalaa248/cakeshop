import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  catogery:any []= []

  constructor(private route:ActivatedRoute ,private apiservice:ApiService){
  }
  ngOnInit():void{
    //put in array = the object and call function
    // this.catogery=this.apiservice.get_catogery();
    // console.log(this.catogery)

    
//call the object and call function and observable to get data from database and put it in array 
    this.apiservice.get_catogery().subscribe({next:(data:any)=>
      {
        console.log(data)
        for(let catogery of data){
//get data from database and make new coloum (new_id) put in it the old coloum(cat_id) after encrypt  
          catogery.new_id=btoa(catogery.cat_id)
          console.log(catogery.new_id)
        }
        this.catogery=data
      } 
  })
        
  }

}
