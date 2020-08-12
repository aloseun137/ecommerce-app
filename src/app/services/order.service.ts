import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private products: productResponseModel[] = [];

  constructor() { }

  getSingleOrder(){

  }
}
interface productResponseModel {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: string;

}
