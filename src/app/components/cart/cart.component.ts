import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service'; // Adjust the import path as necessary

interface Product {
    name: string;
    price: number;
    image: string;
    quantity: number;
}

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    cartItems: Product[] = [];

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.cartService.cartItems$.subscribe(items => {
            this.cartItems = items;
        });
    }

    removeFromCart(item: Product): void {
        this.cartService.removeFromCart(item);
    }

    updateCart(item: Product): void {
        // Update logic can be added here if necessary
    }

    get subtotal(): number {
        return this.cartService.subtotal;
    }

    get tax(): number {
        return this.cartService.tax;
    }

    get total(): number {
        return this.cartService.total;
    }
}
