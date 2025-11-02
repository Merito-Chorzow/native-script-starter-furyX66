import { Component, inject, NO_ERRORS_SCHEMA, OnInit } from '@angular/core'
import { Router } from "@angular/router"
import {ProductService} from "../services/product.service"
import {
  NativeScriptCommonModule,
  NativeScriptRouterModule,
} from '@nativescript/angular'
import {IProduct} from "~/app/interfaces/IProduct"
import { Haptics, HapticImpactType } from '@nativescript/haptics';

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
    Haptics.impact(HapticImpactType.LIGHT);
    this.router.navigate(['/create'])
  }

  onEdit(id: number){
    Haptics.impact(HapticImpactType.LIGHT);
    console.log("id", id)
    this.router.navigate(['/product/edit', id])
  }

  onDelete(id: number){
    Haptics.impact(HapticImpactType.LIGHT);
    this.productService.deleteProduct(id)
    this.products = this.productService.getProducts()
  }
}
