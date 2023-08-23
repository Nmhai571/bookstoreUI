import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { adminApi } from "../apis/adminApi";

export const adminUpdateOneProduct = createAsyncThunk(
	"admin/adminUpdateOneProduct",
	async (product: any, thunkApi) => {
		try {
			const response = await adminApi.updateOneProduct(product._id, product);
			toast.success("Update product successfully");
			return response.data;
		} catch (error) {
			toast.error("Something went wrong!");
			return thunkApi.rejectWithValue(error);
		}
	}
);
export const adminDeleteOneProduct = createAsyncThunk(
	"admin/adminDeleteOneProduct",
	async (productId: string, thunkApi) => {
		try {
			const response = await adminApi.deleteOneProduct(productId);
			toast.success("Delete product successfully");
			return response.data;
		} catch (error) {
			toast.error("Something went wrong!");
			return thunkApi.rejectWithValue(error);
		}
	}
);
export const adminCreateOneProduct = createAsyncThunk(
	"admin/adminCreateOneProduct",
	async (product: any, thunkApi) => {
		try {
			const response = await adminApi.createOneProduct(product);
			toast.success("Create product successfully");
			return response.data;
		} catch (error) {
			toast.error("Something went wrong!");
			return thunkApi.rejectWithValue(error);
		}
	}
);
