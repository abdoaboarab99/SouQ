import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Product {
    name: string;
    price: number;
    image: string;
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    clearCart(): void {
        this.cartItems = []; // Empty the items array
       
      }
    private cartItems: Product[] = [];
    private cartItemsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.cartItems);
    
    constructor() {
        this.loadCart();  // Load cart when service is initialized
    }

    get cartItems$() {
        return this.cartItemsSubject.asObservable();
    }

    addToCart(product: Product) {
        const existingProduct = this.cartItems.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            this.cartItems.push({ ...product, quantity: 1 });
        }
        this.saveCart();  // Save cart to localStorage
        this.cartItemsSubject.next(this.cartItems);
    }

    removeFromCart(product: Product) {
        this.cartItems = this.cartItems.filter(item => item.name !== product.name);
        this.saveCart();  // Save updated cart
        this.cartItemsSubject.next(this.cartItems);
    }

    private loadCart(): void {
        const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
        const cart = localStorage.getItem(`userCart_${userId}`);
        if (cart) {
            this.cartItems = JSON.parse(cart);
            this.cartItemsSubject.next(this.cartItems);
        }
    }

    private saveCart(): void {
        const userId = localStorage.getItem('userId');
        localStorage.setItem(`userCart_${userId}`, JSON.stringify(this.cartItems));
    }

    get subtotal(): number {
        return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }

    get tax(): number {
        return this.subtotal * 0.05;
    }

    get total(): number {
        return this.subtotal + this.tax;
    }
}
