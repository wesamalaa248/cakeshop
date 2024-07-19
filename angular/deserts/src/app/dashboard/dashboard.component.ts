import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  cards = [
    { title: 'Add Category', icon: 'fa-solid fa-notes-medical fa-lg',link:'/add-catogery' },
    { title: 'Get Category', icon: 'fa-solid fa-clipboard-list fa-lg' ,link:'/get-catogery'},
    { title: 'Add Product', icon: 'fa-solid fa-notes-medical fa-lg' ,link:'/add-products'},
    { title: 'Get Product', icon: 'fa-solid fa-clipboard-list fa-lg',link:'/get-products' }
   
  ];

}
