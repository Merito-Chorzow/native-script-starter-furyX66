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

    getProductById(id: number): IProduct | undefined {
        return this.products.find(p => p.id === id);
    }

    deleteProduct(id: number): void {
        const initialLength = this.products.length
        this.products = this.products.filter(product => product.id !== id)

        if (this.products.length < initialLength) {
            console.log(`Product with ID ${id} deleted.`);
        } else {
            console.warn(`Product with ID ${id} was not found.`);
        }
    }

    updateProduct(updatedProduct: IProduct): void {
        const index = this.products.findIndex(p => p.id === updatedProduct.id);
        
        if (index !== -1) {
            this.products[index] = updatedProduct;
            console.log(`Prduct with ID ${updatedProduct.id} updated.`);
        } else {
            console.warn(`Prduct with ID ${updatedProduct.id} was not found.`);
        }
    }
}