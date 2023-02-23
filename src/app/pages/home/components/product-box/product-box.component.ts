import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/pages/models/product.models';

@Component({
	selector: 'app-product-box',
	templateUrl: './product-box.component.html',
	styles: [],
})
export class ProductBoxComponent {
	@Input() fullWidthMode = false;
	@Output() addToCart = new EventEmitter<Product>();
	@Input() product: Product | undefined;

	onAddToCart(): void {
		this.addToCart.emit(this.product);
	}
}
