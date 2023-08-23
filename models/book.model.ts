export enum iBookPrice {
	PERCENT = "percent",
	FIXED = "fixed",
}
export interface iBook {
	price: {
		sale: {
			saleType: iBookPrice;
			value: number;
		};
		priceInitial: number;
		priceFinal: number;
	};
	rating: {
		rates: [];
		average: number;
	};
	_id: string;
	title: string;
	image: string;
	author: [
		{
			_id: string;
			name: string;
			image: string;
			description: string;
			birthday: string;
		}
	];
	publisher: {
		_id: string;
		name: string;
	};
	description: string;
	year: number;
	quantity: number;
	categories: [
		{
			_id: string;
			name: string;
		}
	];
	createdAt: string;
	updatedAt: string;
	slug: string;
	comment?: any[];
}
