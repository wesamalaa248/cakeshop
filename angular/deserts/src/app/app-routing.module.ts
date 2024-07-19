import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AuthGuard } from './authentcation/auth.guard';
import { FavouriteComponent } from './favourite/favourite.component';
import { AddCatogeryComponent } from './add-catogery/add-catogery.component';
import { GetCatogeryComponent } from './get-catogery/get-catogery.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { GetProductsComponent } from './get-products/get-products.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',component:HomeComponent,canActivate: [AuthGuard],data:{role:['employee','admin']}},
  {path:'favourite',component:FavouriteComponent,},
  {path:'add-catogery',component:AddCatogeryComponent},
  {path:'get-catogery',component:GetCatogeryComponent},
  {path:'add-products',component:AddProductsComponent},
  {path:'get-products',component:GetProductsComponent},
  {path:'dashboard',component:DashboardComponent,data:{role:['admin']}},
  {path:'menu',component:MenuComponent},
  {path:'about',component:AboutComponent,},
  {path:'products',component:ProductsComponent},
  {path:'products/:id',component:ProductsComponent},
  {path:'product_details/:id',component:ProductDetailsComponent},
  {path:"",redirectTo:"/home",pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
