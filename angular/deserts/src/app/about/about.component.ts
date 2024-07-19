import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
isvisible=false;

toggleContent():void{
  this.isvisible=! this.isvisible;
}
}
