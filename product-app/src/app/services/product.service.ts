import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/IProduct'

@Injectable({
    providedIn: 'root' 
})

export class ProductService {
    private products: IProduct[] = []
    private nextId = 1

    getProducts(): IProduct[] {
        return [...this.products]; 
    }

    createProduct (product : IProduct): void {
        const newProduct: IProduct = {
            ...product, 
            id: this.nextId,
        };
        this.products.push(newProduct)
        this.nextId++;
    }
}