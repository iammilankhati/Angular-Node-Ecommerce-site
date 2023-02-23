import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-products-header',
	templateUrl: './products-header.component.html',
	styles: [],
})
export class ProductsHeaderComponent {
	@Output() colsCountChange = new EventEmitter<number>();
	@Output() itemsCountChange = new EventEmitter<number>();
	@Output() sortChange = new EventEmitter<string>();
	sort = 'desc';
	showCount = 12;
	onSortUpdated(newSort: string): void {
		this.sort = newSort;
		this.sortChange.emit(this.sort);
	}
	onItemsUpdated(count: number): void {
		this.showCount = count;
		this.itemsCountChange.emit(this.showCount);
	}

	onColsUpdated(colsNum: number): void {
		this.colsCountChange.emit(colsNum);
	}
}
