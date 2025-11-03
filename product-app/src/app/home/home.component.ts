import { ChangeDetectorRef, Component, inject, NO_ERRORS_SCHEMA, OnInit } from '@angular/core'
import { Router } from "@angular/router"
import {ProductService} from "../services/product.service"
import {
  NativeScriptCommonModule,
  NativeScriptRouterModule,
} from '@nativescript/angular'
import {IProduct} from "~/app/interfaces/IProduct"
import { Haptics, HapticImpactType } from '@nativescript/haptics'

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeComponent implements OnInit {
  private router : Router = inject(Router)
  private productService: ProductService = inject(ProductService)
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef)
  products : IProduct[] = []
  public isLoading: boolean = true

  async ngOnInit(): Promise<void> {
    await this.loadProducts()
    console.log(this.products)
  }

  async loadProducts(): Promise<void> {
    this.isLoading = true
    try {
        this.products = await this.productService.getProducts()
    } catch (error) {
        console.error (error)
    } finally {
      this.cdr.markForCheck()
      this.isLoading = false
    }
}

  onCreate(){
    Haptics.impact(HapticImpactType.LIGHT)
    this.router.navigate(['/create'])
  }

  onEdit(id: number){
    Haptics.impact(HapticImpactType.LIGHT)
    console.log("id", id)
    this.router.navigate(['/product/edit', id])
  }

  async onDelete(id: number){
    Haptics.impact(HapticImpactType.LIGHT)
    this.products = this.productService.deleteProduct(id)
    this.cdr.markForCheck()
  }
}
