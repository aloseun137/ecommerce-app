import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { cartModelServer } from 'src/app/model/cartmodel';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';
import { productModelServer } from 'src/app/model/productmodel';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {
  message: string;
  orderId: any;
  products: any;
  total: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private cartService: CartService) {

                this.message = this.route.snapshot.paramMap.get('message');
                this.orderId = this.route.snapshot.paramMap.get('orderId');
                this.cartService.cartData$.subscribe(data => {
                  this.products = data.data
                });
                this.cartService.cartTotal$.subscribe(data => {
                  this.total = data;
                })


               }

  ngOnInit(): void {

    console.log(this.products, this.total);







  }

}
