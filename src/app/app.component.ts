import { Component } from '@angular/core';
import { Cart } from './pages/models/cart.models';
import { CartService } from 'src/app/services/cart.service';

@Component({
	selector: 'app-root',
	template: `
		<app-header [cart]="cart"></app-header>
		<router-outlet></router-outlet>
	`,
	styles: [],
})
export class AppComponent {
	cart: Cart = { items: [] };

	constructor(private cartService: CartService) {}
	ngOnInit(): void {
		this.cartService.cart.subscribe((_cart) => {
			this.cart = _cart;
		});
	}
}
