import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { orderApi } from "../apis/orderApi";
import { voucherApi } from "../apis/voucherApi";

export const cartAddCoupon = createAsyncThunk("user/addCoupon", async (coupon: string, thunkApi) => {
	try {
		const response = await voucherApi.getOne(coupon);
		toast.success("Coupon added");
		return response.data;
	} catch (error) {
		toast.error((error as ErrorServer).message);
		return thunkApi.rejectWithValue(error);
	}
});
export const userCreateOrder = createAsyncThunk("user/createOrder", async (order: any, thunkApi) => {
	try {
		const response = await orderApi.create(order);
		toast.success("Order created");
		return response.data;
	} catch (error) {
		toast.error("Something went wrong!");
		return thunkApi.rejectWithValue(error);
	}
});
