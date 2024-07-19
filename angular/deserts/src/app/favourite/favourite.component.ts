import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent {
  cartItems: any[] = [];

  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {
    this.apiservice.getcart().subscribe(data => {
      this.cartItems = data;
    });
  }

  removefromcart(productId: number): void {
    this.apiservice.removefromcart(productId).subscribe(() => {
      this.ngOnInit(); // Refresh the cart
    });
  }

}
