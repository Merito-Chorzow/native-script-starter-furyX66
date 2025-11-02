import { Component, inject, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service"
import { Router, ActivatedRoute } from "@angular/router";
import { FormsModule } from '@angular/forms';
import {
	NativeScriptCommonModule,
	NativeScriptRouterModule,
	NativeScriptFormsModule,
  } from '@nativescript/angular';
import { IProduct } from '~/app/interfaces/IProduct';

@Component({
	selector: 'edit-product',
	templateUrl: './edit-product.component.html',
	imports: [NativeScriptCommonModule, NativeScriptRouterModule, NativeScriptFormsModule, FormsModule],
	schemas: [NO_ERRORS_SCHEMA],
})

export class EditProductComponent implements OnInit {
	private router: Router = inject(Router)
    private productService: ProductService = inject(ProductService)
    private route: ActivatedRoute = inject(ActivatedRoute)
	product: IProduct = {
        id: 0, 
        title: '', 
        description: '', 
        price: null, 
        status: ''
    }

	ngOnInit(): void {
        this.route.params.subscribe(params => {
            const productId = Number(params['id'])
			if (isNaN(productId) || productId <= 0) {
				console.error("Cannot read id param")
                this.router.navigate(['/home'])
                return
            }
            const loadedProduct = this.productService.getProductById(productId)
			this.product = loadedProduct
        });
    }

	onSave() {
        this.productService.updateProduct(this.product)
        this.router.navigate(['/home'])
    }
	onBack(){
		this.router.navigate(['/home'])
	}
}