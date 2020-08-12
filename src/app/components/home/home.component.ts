import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /*create an array to store the products*/
  products: any;

  constructor(private productService: ProductService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.products = this.productService.getAllProducts();

  }

  selectProduct(id: number){
    this.router.navigate(['/product', id]).then();
  }

  addToCart(id: number) {
    this.cartService.addProductToCart(id);

  }
  goToProduct() {
    console.log(1);

    document.getElementById('my-products').scrollIntoView({behavior: 'smooth'});
  }

}
