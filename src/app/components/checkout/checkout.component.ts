import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/services/cart.service';
import { cartModelServer } from 'src/app/model/cartmodel';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartData: cartModelServer;
  cartTotal: number;

  constructor(private CartService: CartService,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.CartService.cartData$.subscribe(data => {
      this.cartData = data;
    });
    this.CartService.cartTotal$.subscribe(data => {
      this.cartTotal = data;
    });
  }
  onCheckOut() {
    this.spinner.show()
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.CartService.checkOutFromCart();
    }, 5000);
  }

}
