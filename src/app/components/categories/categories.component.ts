import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService,
              private cartService: CartService,
              private router: Router,
              private route: ActivatedRoute
              ) {}


  ngOnInit(): void {
    let selectField: string;
    this.route.params.subscribe(data => {
      selectField = data.selectF;
      if (selectField === 'all-categories') {
        this.products = this.productService.getAllProducts();
      } else {
        this.products = this.productService.categoryFilter(selectField);
      }
    });
  }

  addToCart(id: number) {
    this.cartService.addProductToCart(id);
  }
  selectProduct(id: number) {
    this.router.navigate(['/product', id]).then();
  }

}
