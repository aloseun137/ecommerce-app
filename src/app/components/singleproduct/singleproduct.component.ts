import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import {map} from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
declare let $: any;

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss']
})
export class SingleproductComponent implements OnInit, AfterViewInit {
  id: number;
  product;
  thumbnail: any[] = [];
  value = 1;

  constructor(private route: ActivatedRoute,
              private cartService: CartService,
              private productService: ProductService ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(data => {
      this.id = data;
      const single = this.productService.getSingleProduct(this.id);
      this.product = single;
      if (single.images !== null) {
        this.thumbnail = single.images.split(';');
        console.log(this.thumbnail);
      } else {
        return;
      }




    });
  }
  ngAfterViewInit(): void {
    // Product Main img Slick
$('#product-main-img').slick({
    infinite: true,
    speed: 300,
    dots: false,
    arrows: true,
    fade: true,
    asNavFor: '#product-imgs',
  });

// Product imgs Slick
$('#product-imgs').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    focusOnSelect: true,
    centerPadding: 0,
    vertical: true,
    asNavFor: '#product-main-img',
    responsive: [{
        breakpoint: 991,
        settings: {
          vertical: false,
          arrows: false,
          dots: true,
        }
      },
    ]
  });

// Product img zoom
const zoomMainProduct = document.getElementById('product-main-img');
if (zoomMainProduct) {
$('#product-main-img .product-preview').zoom(); }
  }
  increase() {
    this.value = this.value < this.product.quantity ? this.value + 1 : this.product.quantity;
  }
  decrease() {
    this.value = this.value - 1;

    if (this.value < 1) {
      this.value = 1;
    } else {
      return;
    }
  }
  addToCart(id: number) {
    this.cartService.addProductToCart(id, this.value);
  }

}
