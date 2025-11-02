import { Component, inject, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {ProductService} from "../services/product.service"
import {
  NativeScriptCommonModule,
  NativeScriptRouterModule,
} from '@nativescript/angular';
import {IProduct} from "~/app/interfaces/IProduct";

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeComponent implements OnInit {
  private router : Router = inject(Router)
  private productService: ProductService = inject(ProductService)
  products : IProduct[]

  ngOnInit(): void {
    this.products = this.productService.getProducts()
    console.log(this.products)
  }

  onCreate(){
    this.router.navigate(['/create'])
  }

  onEdit(id: number){
    console.log("id", id)
    this.router.navigate(['/product/edit', id])
  }

  onDelete(id: number){
    this.productService.deleteProduct(id)
    this.products = this.productService.getProducts()
  }
}
