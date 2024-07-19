import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
baseURL="http://localhost/company" //pin part static of url api 


  constructor(private http:HttpClient) { }
  get_catogery(){
    //.get<[]> =observable this to load data from database , call variable baseurl + api file.php
    return this.http.get<[]>(this.baseURL+'/get_catogery.php');
  }
  
  //show products in home
get_products_home(cond:any){
    return this.http.get<[]>(this.baseURL+'/get_product.php?cond='+cond);
  }
//get products of each catogery with id
get_products_catogery(cond:any){
  return this.http.get<[]>(this.baseURL+'/get_product.php?cond='+cond);
}

//get products details with id
get_products_details(cond:any){
    return this.http.get<[]>(this.baseURL+'/get_product.php?cond='+cond);
  }

get_products(){
    return this.http.get<[]>(this.baseURL+'/get_product.php');
  }
  addtocart(productId: number){
    return this.http.post(this.baseURL+'/addtocart.php',{ productId });
  }
  getcart(){
    return this.http.get<[]>(this.baseURL+'/getcart.php');
  }
  removefromcart(productId: number){
    return this.http.post(this.baseURL+'/removefromcart.php',{ productId });
  }

//
  insert_data(user:any){
    const body=JSON.stringify(user);
    return this.http.post(this.baseURL+'/signup.php',body);
  }
  login(user:any){
    const body=JSON.stringify(user);
    return this.http.post(this.baseURL+'/login.php',body);
  }
//insert catogery
  insert_catogery(user:any){
    // const body=JSON.stringify(user);
    // return this.http.post(this.baseURL+'/addcatogery.php',body);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.baseURL+'/addcatogery.php', user, {headers: headers})
    .pipe(map((res: any) => {
    return res;
    }));
  }
  
//insert products
  insert_product(user:any){
    const body=JSON.stringify(user);
    return this.http.post(this.baseURL+'/addproduct.php',body);
  }
  
//delete catogery
  delete_catogery(id:any){
  const body=JSON.stringify(id);
  return this.http.post(this.baseURL+'/deletecatogery.php',body);
  }
//delete product
delete_product(id:any){
  const body=JSON.stringify(id);
  return this.http.post(this.baseURL+'/deleteproduct.php',body);
  }
}
