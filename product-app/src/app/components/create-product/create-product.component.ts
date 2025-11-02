import { Component, inject, NO_ERRORS_SCHEMA, OnInit } from '@angular/core'
import { ProductService } from "../../services/product.service"
import { Router } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { Haptics, HapticImpactType } from '@nativescript/haptics';
import {
	NativeScriptCommonModule,
	NativeScriptRouterModule,
	NativeScriptFormsModule,
  } from '@nativescript/angular';
import { IProduct } from '~/app/interfaces/IProduct'

@Component({
	selector: 'create-product',
	templateUrl: './create-product.component.html',
	imports: [NativeScriptCommonModule, NativeScriptRouterModule, NativeScriptFormsModule, FormsModule],
	schemas: [NO_ERRORS_SCHEMA],
})

export class CreateProductComponent {
	
	private router : Router = inject(Router)
	private productService: ProductService = inject(ProductService)
	product : IProduct = {
		title: '',
		description: '',
		price: null as number | null,
		status: '',
	}

	onCreate(){
		Haptics.impact(HapticImpactType.LIGHT);
		this.productService.createProduct(this.product)
		this.router.navigate(['/home']);
	}
	onBack(){
		Haptics.impact(HapticImpactType.LIGHT);
		this.router.navigate(['/home']);
	}
}