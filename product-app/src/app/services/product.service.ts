import { Injectable, OnInit, inject  } from '@angular/core'
import { IProduct } from '../interfaces/IProduct'
import { firstValueFrom } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root' 
})

export class ProductService {
    private http: HttpClient = inject(HttpClient)
    private products: IProduct[] = []
    private nextId = 1
    private apiUrl = 'https://fakestoreapi.com/products'
    private isLoaded = false

    async getProducts(): Promise<IProduct[]> {
        if (this.isLoaded) {
            return [...this.products]
        }
        try {
            const apiProducts: any[] = await firstValueFrom(
                this.http.get<any[]>(this.apiUrl)
            )
            this.products = apiProducts.map(product => ({
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                category: product.category
            }))
            const lastId = this.products[this.products.length - 1]?.id || 0
            this.nextId = lastId + 1
            this.isLoaded = true
            return [...this.products]
        } catch (error) {
            console.error("Error loading products", error)
            return []
        }
    }
    createProduct (product : IProduct): void {
        const newProduct: IProduct = {
            ...product, 
            id: this.nextId,
        }
        this.products.push(newProduct)
        this.nextId++
    }

    getProductById(id: number): IProduct | undefined {
        return this.products.find(p => p.id === id)
    }

    deleteProduct(id: number): IProduct[] {
        this.products = this.products.filter(product => product.id !== id)
        return [...this.products]
    }

    updateProduct(updatedProduct: IProduct): void {
        const index = this.products.findIndex(p => p.id === updatedProduct.id)
        if (index !== -1) {
            this.products[index] = updatedProduct
        }
    }
}