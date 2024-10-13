import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-single-card',
    templateUrl: './single-card.component.html',
    styleUrls: ['./single-card.component.css']
})
export class SingleCardComponent {
    @Input() product: any;  
    @Output() addToCart = new EventEmitter<any>();

    constructor(private cartService: CartService) {}

    onAddToCart(): void {
        this.cartService.addToCart(this.product); // Use service directly
        this.addToCart.emit(this.product); // If you still want to emit for any other purpose
    }
}
