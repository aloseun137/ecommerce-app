import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SingleproductComponent } from './components/singleproduct/singleproduct.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { RegisterComponent } from './components/register/register.component';
import { CategoriesComponent } from './components/categories/categories.component';


const routes: Routes = [
  {
    path: '', component:  HomeComponent
  },
  {
    path: 'product/:id', component:  SingleproductComponent
  },
  {
    path: 'cart', component:  CartComponent
  },
  {
    path: 'checkout', component:  CheckoutComponent
  },
  {
    path: 'thankyou', component:  ThankyouComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'category', component: CategoriesComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
