import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { OrderService } from './order.service';
import { cartModelPublic, cartModelServer } from '../model/cartmodel';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  // data variable to store cart information on client local storage//
  private cartDataClient: cartModelPublic = {

    total: 0,
    proData: [{
      inCart: 0,
      id: 0
    }]
  };

  // data to store cart information on the server//
  private cartDataServer: cartModelServer = {

    total: 0,
    data: [{
      numInCart: 0,
      product: undefined
    }]

     };
  // create observable for the component to subscribe
  cartTotal$ = new BehaviorSubject<number>(0);
  cartData$ = new BehaviorSubject<cartModelServer>(this.cartDataServer);

  constructor(private productService: ProductService,
    private orderServices: OrderService,
    private router: Router,
    private toast: ToastrService,
    private spinner: NgxSpinnerService) { this.cartTotal$.next(this.cartDataServer.total);
    this.cartData$.next(this.cartDataServer);
    // get info from local storage if there is//
    let info: cartModelPublic = JSON.parse(localStorage.getItem('cart'));

    // check if the info variable is null or has some data in it//

    if( info !==  null && info !== undefined && info.proData[0].inCart !==  0) {
      // my local storage is not empty and has some information in it //
      this.cartDataClient = info;

      // loop  through each entry and put it in the cartDataServer  object //
      this.cartDataClient.proData.forEach(p => {
        let singleProduct = this.productService.getSingleProduct(p.id);


        if(this.cartDataServer.data[0].numInCart === 0) {
          // cartdataserver is empty //

          this.cartDataServer.data[0].numInCart = p.inCart;
          this.cartDataServer.data[0].product = singleProduct;

          //todo: create calculateTotal function and replace it here //
          this.calculateTotal();
          this.cartDataClient.total = this.cartDataServer.total;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        }
        else {
          // cartdataserver alreaady has some entry in it //
          this.cartDataServer.data.push({
            numInCart: p.inCart,
            product: singleProduct
          });
          //todo: create calculateTotal function and replace it here //
          this.calculateTotal();
          this.cartDataClient.total = this.cartDataServer.total;
          this.cartDataClient.total = this.cartDataServer.total;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));

        }
        this.cartData$.next({...this.cartDataServer});

      });

    }


  }

  addProductToCart(id: number, quantity?: number) {
    const singleProduct = this.productService.getSingleProduct(id);
    // if cart is empty //
    if (this.cartDataServer.data[0].product === undefined) {
      this.cartDataServer.data[0].product = singleProduct;
      this.cartDataServer.data[0].numInCart = quantity !== undefined ? quantity : 1;
      // todo: create calculateTotal function and replace it here //
      this.calculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;

      this.cartDataClient.proData[0].inCart = this.cartDataServer.data[0].numInCart;
      this.cartDataClient.proData[0].id = singleProduct.id;

      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      this.cartData$.next({...this.cartDataServer});
      // display toast notification //
      this.toast.success(`${singleProduct.title} added to the cart`, 'Product Added',{
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });



    }
    // if the cart has some data //
    else {
      let index = this.cartDataServer.data.findIndex(p => p.product.id === singleProduct.id); // -1 or a positive value//
      // if the item you are adding is already in the cart index is positive//
      if (index !== -1) {
        if (quantity !== undefined && quantity <= singleProduct.quantity) {
          this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < singleProduct.quantity ? quantity : singleProduct.quantity;
        }
        else {
          this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < singleProduct.quantity ? this.cartDataServer.data[index].numInCart + 1 : singleProduct.quantity;

        }
        this.calculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        this.cartDataClient.proData[index].inCart = this.cartDataServer.data[index].numInCart;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        // display toast notification //
        this.toast.info(`${singleProduct.title} updated in the cart`, 'Product Updated',{
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });


      }

    // if the item is not in the cart //
    else {
      this.cartDataServer.data.push({
        numInCart: 1,
        product: singleProduct
      });
      this.cartDataClient.proData.push({
        inCart: 1,
        id: singleProduct.id
      });
      // display toast notification //
      this.toast.success(`${singleProduct.title} added to the cart`, 'Product Added',{
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
      // todo: create calculateTotal function and replace it here //
      this.calculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      this.cartData$.next({...this.cartDataServer});


    }


    }



  }


updateCartItems(index: number, increase: boolean) {
  const data = this.cartDataServer.data[index];
  if (increase) {
    data.numInCart < data.product.quantity ? data.numInCart ++ : data.product.quantity;
    this.cartDataClient.proData[index].inCart = data.numInCart;
    // todo: create calculateTotal function and replace it here //
    this.calculateTotal();
    this.cartDataClient.total = this.cartDataServer.total;
    localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    this.cartData$.next({...this.cartDataServer});

  }
  else {
    data.numInCart--;
    if (data.numInCart === 0) {
      data.numInCart = 1;
      this.calculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      this.cartData$.next({...this.cartDataServer});

    }
    if (data.numInCart < 1) {

      // todo delete the product from cart //
      this.deleteProductFromCart(index);
      this.cartData$.next({...this.cartDataServer});
    }
    else  {
      this.cartData$.next({...this.cartDataServer});
      this.cartDataClient.proData[index].inCart = data.numInCart;
      // todo: create calculateTotal function and replace it here //
      this.calculateTotal();

      this.cartDataClient.total = this.cartDataServer.total;
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      this.cartData$.next({...this.cartDataServer});

    }

  }

}

deleteProductFromCart(index: number) {
  if (window.confirm('Are you sure you want to remove the item?')){
    this.cartDataServer.data.splice(index, 1);
    this.cartDataClient.proData.splice(index, 1);
    // todo: create calculateTotal function and replace it here //
    this.calculateTotal();
    this.cartDataClient.total = this.cartDataServer.total;
    if (this.cartDataClient.total === 0) {
      this.cartDataClient = {total: 0, proData: [{inCart: 0, id: 0 }] };
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));

    }
    else {
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));

    }
    if (this.cartDataServer.total === 0) {
      this.cartDataServer = { total: 0, data: [{ numInCart: 0, product: undefined }] };
      this.cartData$.next({...this.cartDataServer});

    }
    else {
      this.cartData$.next({...this.cartDataServer});

    }



  }
  else {
    // if the user clicks the cancel button
    return;
  }
}

private calculateTotal(){
  let total = 0;
  this.cartDataServer.data.forEach(p => {
    const {numInCart} = p;
    const {price} = p.product;

    total += numInCart * price;

  });
  this.cartDataServer.total = total;
  this.cartDataClient.total = total;
  this.cartTotal$.next(this.cartDataServer.total);
}

checkOutFromCart(userid?: number) {

    this.router.navigate (['/thankyou', {
    message: 'Your Order was received',
    products: this.cartDataServer.data,
    orderId: 101,
    total: this.cartDataClient.total

    }]).then(p => {
    this.cartDataServer =  { total: 0, data: [{ numInCart: 0, product: undefined }] }
    this.cartDataClient = {total: 0, proData: [{inCart: 0, id: 0 }] };
    this.cartData$.next({...this.cartDataServer});
    this.cartTotal$.next(0);
    localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
  });

}

calculateSubTotal(index: number) {
  let total: number;
  total = (this.cartDataServer.data[index].numInCart * this.cartDataServer.data[index].product.price);
  return total;
}


}
