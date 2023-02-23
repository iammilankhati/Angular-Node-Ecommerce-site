import { Component } from '@angular/core';
import { Cart, CartItem } from '../models/cart.models';
import { CartService } from 'src/app/services/cart.service';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styles: [],
})
export class CartComponent {
	cart: Cart = {
		items: [
			{
				product: 'https://via.placeholder.com/150',
				name: 'snickers',
				price: 150,
				quantity: 1,
				id: 1,
			},
			{
				product: 'https://via.placeholder.com/150',
				name: 'snickers',
				price: 150,
				quantity: 3,
				id: 2,
			},
			{
				product: 'https://via.placeholder.com/150',
				name: 'snickers',
				price: 150,
				quantity: 1,
				id: 3,
			},
		],
	};

	dataSource: Array<CartItem> = [];
	displayedColumns: Array<string> = [
		'product',
		'name',
		'price',
		'quantity',
		'total',
		'action',
	];
	constructor(private cartService: CartService, private http: HttpClient) {}

	ngOnInit(): void {
		this.dataSource = this.cart.items;
		this.cartService.cart.subscribe((_cart: Cart) => {
			this.cart = _cart;
			this.dataSource = this.cart.items;
		});
	}

	getTotal(items: Array<CartItem>): number {
		return this.cartService.getTotal(items);
	}

	onClearCart(): void {
		this.cartService.clearCart();
	}
	onRemoveFromCart(item: CartItem): void {
		this.cartService.removeFromCart(item);
	}
	onAddQuantity(item: CartItem): void {
		this.cartService.addToCart(item);
	}

	onRemoveQuantity(item: CartItem): void {
		this.cartService.removeQuantity(item);
	}
	onCheckOut(): void {
		this.http
			.post('http://localhost:4242/checkout', {
				items: this.cart.items,
			})
			.subscribe(async (res: any) => {
				let stripe = await loadStripe(
					'pk_test_51Mefj5SBzqnFygxH40uktf0qWMiBl8te99RW7ZbBY8xINiqiu80ZLaEOy1wsQquDKvbr1wfsgoAFaZJBQJIQikTm002jqdB0Tu'
				);

				stripe?.redirectToCheckout({
					sessionId: res.id,
				});
			});
	}
}
