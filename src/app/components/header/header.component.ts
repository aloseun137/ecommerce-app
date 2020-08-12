import { Component, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/model/cartmodel';
import { CartService } from 'src/app/services/cart.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartTotal: number;
  cartData: CartModelServer;

  constructor(private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    this.cartService.cartData$.subscribe(data => {
      this.cartData = data;
    });
    this.cartService.cartTotal$.subscribe(data => {
      this.cartTotal = data;
    });


  }
  onSubmit(SearchForm: NgForm, selectField) {
    const searchField = SearchForm.value.search;
    const selectFields = selectField.value;
    this.router.navigate(['/category', { search: searchField, selectF: selectFields }]);
  }
  deleteCartItem(id: number) {
    this.cartService.deleteProductFromCart(id);


  }

}
