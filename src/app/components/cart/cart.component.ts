import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartModelServer } from 'src/app/model/cartmodel';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartTotal: number;
  cartData: CartModelServer;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartData$.subscribe(data => {
      this.cartData = data;
    });
    this.cartService.cartTotal$.subscribe(data => {
      this.cartTotal = data;
    });
  }
  changeQuantity(index: number, increase: boolean) {
    this.cartService.updateCartItems(index, increase);

  }

}
