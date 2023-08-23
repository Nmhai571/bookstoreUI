import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { orderApi } from "../apis/orderApi";
import { userApi } from "../apis/userApi";
import { voucherApi } from "../apis/voucherApi";
import { iUserAddress } from "../models/user.model";
import { resetUser } from "./userSlice";

export const getUser = createAsyncThunk("user/getUser", async (_data, thunkApi) => {
	try {
		const user = await userApi.getUser();
		return user.data;
	} catch (error) {
		thunkApi.dispatch(resetUser());
		toast.error("Something went wrong!");
		return thunkApi.rejectWithValue(error);
	}
});

export const userLoginGoogle = createAsyncThunk("user/login", async (access_token: string, thunkApi) => {
	try {
		const response = await userApi.loginWithGoogle(access_token);
		return response.data;
	} catch (error) {
		toast.error("Something went wrong!");
		return thunkApi.rejectWithValue(error);
	}
});

export const userAddToWhiteList = createAsyncThunk(
	"user/addToWhiteList",
	async (book_id: string, thunkApi) => {
		try {
			const response = await userApi.addToWhitelist(book_id);
			toast.success("Book added to whitelist");
			return response.data;
		} catch (error) {
			toast.error("Something went wrong!");
			return thunkApi.rejectWithValue(error);
		}
	}
);
export const userRemoveFromWhiteList = createAsyncThunk(
	"user/removeFromWhiteList",
	async (book_id: string, thunkApi) => {
		try {
			const response = await userApi.removeFromWhitelist(book_id);
			toast.success("Book removed from whitelist");
			return response.data;
		} catch (error) {
			toast.error("Something went wrong!");
			return thunkApi.rejectWithValue(error);
		}
	}
);
export const userCreateAddress = createAsyncThunk(
	"user/createAddress",
	async (address: iUserAddress, thunkApi) => {
		try {
			const response = await userApi.createAddress(address);
			toast.success("Address created");
			return response.data;
		} catch (error) {
			toast.error("Something went wrong!");
			return thunkApi.rejectWithValue(error);
		}
	}
);
export const userUpdateAddress = createAsyncThunk(
	"user/updateAddress",
	async (address: iUserAddress, thunkApi) => {
		try {
			const response = await userApi.updateAddress(address);
			toast.success("Address updated");
			return response.data.address;
		} catch (error) {
			toast.error("Something went wrong!");
			return thunkApi.rejectWithValue(error);
		}
	}
);
export const userUpdate = createAsyncThunk("user/update", async (user: any, thunkApi) => {
	try {
		const response = await userApi.updateUser(user);
		toast.success("User updated");
		return response.data.user;
	} catch (error) {
		toast.error("Something went wrong!");
		return thunkApi.rejectWithValue(error);
	}
});
export const userSubscribe = createAsyncThunk("user/subscribe", async (email: string, thunkApi) => {
	try {
		const response = await userApi.subcribeMail(email);
		toast.success("Subscribed");
		return response.data;
	} catch (error) {
		toast.error((error as any).message);
		return thunkApi.rejectWithValue(error);
	}
});
export const userRate = createAsyncThunk(
	"user/rate",
	async ({ orderId, comment }: { orderId: string; comment: string }, thunkApi) => {
		try {
			const response = await orderApi.rate(orderId, comment);
			toast.success("Rating sent");
			return response.data;
		} catch (error) {
			toast.error("Something went wrong!");
			return thunkApi.rejectWithValue(error);
		}
	}
);
