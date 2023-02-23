import { Component } from '@angular/core';
import { Product } from './../models/product.models';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styles: [],
})
export class HomeComponent {
	colsCount = 3;
	rowHeight = ROWS_HEIGHT[this.colsCount];
	category: string | undefined;
	products: Array<Product> | undefined;
	sort = 'desc';
	count = '12';
	productsSubscription: Subscription | undefined;

	constructor(
		private cartService: CartService,
		private storeService: StoreService
	) {}

	ngOnInit(): void {
		this.getProducts();
	}

	getProducts(): void {
		this.productsSubscription = this.storeService
			.getAllProducts(this.count, this.sort, this.category)
			.subscribe((_products) => {
				this.products = _products;
			});
	}

	onColsCountChange(colsNum: number): void {
		this.colsCount = colsNum;
		this.rowHeight = ROWS_HEIGHT[this.colsCount];
	}

	onShowCategory(category: string): void {
		this.category = category;
		this.getProducts();
	}
	onAddToCart(product: Product): void {
		this.cartService.addToCart({
			product: product.image,
			name: product.title,
			price: product.price,
			quantity: 1,
			id: product.id,
		});
	}

	ngOnDestroy(): void {
		if (this.productsSubscription) {
			this.productsSubscription.unsubscribe();
		}
	}

	onItemsCountChange(newCount: number): void {
		this.count = newCount.toString();
		this.getProducts();
	}
	onSortChange(newSort: string): void {
		this.sort = newSort;
		this.getProducts();
	}
}
