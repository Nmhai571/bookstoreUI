import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import calculateVoucher from "../utils/cartUtils";
import { iBook, iBookPrice } from "../models/book.model";
import { cartAddCoupon, userCreateOrder } from "./cartActions";

// Define the initial state using that type
export interface iCartItem {
	_id: string;
	slug: string;
	quantity: number;
	price: {
		sale: {
			saleType: iBookPrice;
			value: number;
		};
		priceInitial: number;
		priceFinal: number;
	};
}
interface CartState {
	cart: iCartItem[];
	price: {
		voucher: any | null;
		subtotal: number;
		fee: number;
		total: number;
	};
	address: {
		address_id: string;
		phone: string;
		note: string;
	};
}
const initialState: CartState = {
	cart: [],
	price: {
		voucher: null,
		subtotal: 0,
		fee: 2,
		total: 0,
	},
	address: {
		address_id: "",
		phone: "",
		note: "",
	},
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		getCart: () => {
			let localCart = localStorage.getItem("cart");
			const cart: CartState = localCart ? JSON.parse(localCart) : null;
			if (cart) {
				cart.price.voucher = null;
				cart.price.subtotal = cart.cart.reduce(
					(acc, item) => acc + item.quantity * item.price.priceFinal,
					0
				);
				cart.price.total =
					cart.price.subtotal +
					cart.price.fee -
					calculateVoucher(cart.price.subtotal, cart.price.voucher);
				return cart;
			}
		},
		addToCart: (state, { payload }: { payload: iCartItem }) => {
			const isExist = state.cart.findIndex((item) => item.slug === payload.slug);
			if (isExist === -1) state.cart.push(payload);
			else
				(state.cart.find((item) => item.slug === payload.slug) as iCartItem).quantity +=
					payload.quantity;
			state.price.subtotal = state.cart.reduce(
				(acc, item) => acc + item.quantity * item.price.priceFinal,
				0
			);
			state.price.total =
				state.price.subtotal +
				state.price.fee -
				calculateVoucher(state.price.subtotal, state.price.voucher);
			localStorage.setItem("cart", JSON.stringify(state));
		},
		changeQuantity: (state, { payload }) => {
			const { slug, quantity } = payload;
			const index = state.cart.findIndex((item) => item.slug === slug);
			state.cart[index].quantity = quantity;
			state.price.subtotal = state.cart.reduce(
				(acc, item) => acc + item.quantity * item.price.priceFinal,
				0
			);
			state.price.total =
				state.price.subtotal +
				state.price.fee -
				calculateVoucher(state.price.subtotal, state.price.voucher);
			localStorage.setItem("cart", JSON.stringify(state));
		},
		removeFromCart: (state, { payload }) => {
			state.cart = state.cart.filter((item) => item.slug !== payload);
			state.price.subtotal = state.cart.reduce(
				(acc, item) => acc + item.quantity * item.price.priceFinal,
				0
			);
			state.price.total =
				state.price.subtotal +
				state.price.fee -
				calculateVoucher(state.price.subtotal, state.price.voucher);
			localStorage.setItem("cart", JSON.stringify(state));
		},
		updatePrice: (state, { payload }) => {
			(state.cart.find((item) => item.slug === payload.slug) as iBook).price = payload.price;
		},
		removeVoucher: (state) => {
			state.price.voucher = null;
			state.price.subtotal = state.cart.reduce(
				(acc, item) => acc + item.quantity * item.price.priceFinal,
				0
			);
			state.price.total =
				state.price.subtotal +
				state.price.fee -
				calculateVoucher(state.price.subtotal, state.price.voucher);
		},
		updateAddress: (state, { payload }) => {
			state.address.address_id = payload.address_id;
			state.address.phone = payload.phone;
			state.address.note = payload.note;
		},
	},
	extraReducers(builder) {
		builder.addCase(cartAddCoupon.fulfilled, (state, { payload }) => {
			state.price.voucher = payload;
			state.price.total =
				state.price.subtotal + state.price.fee - calculateVoucher(state.price.subtotal, payload);
		});
		builder.addCase(userCreateOrder.fulfilled, (state, { payload }) => {
			localStorage.removeItem("cart");
			return initialState;
		});
	},
});

export const {
	getCart,
	updateAddress,
	addToCart,
	changeQuantity,
	updatePrice,
	removeFromCart,
	removeVoucher,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
