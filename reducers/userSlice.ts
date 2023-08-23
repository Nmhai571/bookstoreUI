import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { iUser, UserRole } from "../models/user.model";
import {
	getUser,
	userAddToWhiteList,
	userCreateAddress,
	userLoginGoogle,
	userRemoveFromWhiteList,
	userUpdate,
	userUpdateAddress,
} from "./userActions";

// Define the initial state using that type
const initialState: iUser = {
	_id: "",
	email: "",
	image: "",
	name: "",
	role: UserRole.USER,
	status: {
		isActive: false,
		isSubscribed: false,
	},
	phone: "",
	address: [],
	updatedAt: "",
	createdAt: "",
	white_list: [],
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		resetUser: () => {
			localStorage.removeItem("token");
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getUser.fulfilled, (state, { payload }) => {
			const { user, token } = payload;
			state._id = user._id;
			state.email = user.email;
			state.image = user.image;
			state.name = user.name;
			state.role = user.role;
			state.status = user.status;
			state.updatedAt = user.updatedAt;
			state.createdAt = user.createdAt;
			state.address = user.address;
			state.phone = user.phone;
			state.white_list = user.white_list;
			localStorage.setItem("token", token);
		});
		builder.addCase(userLoginGoogle.fulfilled, (state, { payload }) => {
			const { user, token } = payload;
			state._id = user._id;
			state.email = user.email;
			state.image = user.image;
			state.name = user.name;
			state.role = user.role;
			state.status = user.status;
			state.updatedAt = user.updatedAt;
			state.address = user.address;
			state.createdAt = user.createdAt;
			state.phone = user.phone;
			state.white_list = user.white_list;
			localStorage.setItem("token", token);
		});
		builder.addCase(userAddToWhiteList.fulfilled, (state, { payload }) => {
			state.white_list.push(payload._id);
		});
		builder.addCase(userRemoveFromWhiteList.fulfilled, (state, { payload }) => {
			state.white_list = state.white_list.filter((book_id) => book_id !== payload._id);
		});
		builder.addCase(userCreateAddress.fulfilled, (state, { payload }) => {
			state.address.push(payload.address);
		});
		builder.addCase(userUpdateAddress.fulfilled, (state, { payload }) => {
			state.address = state.address.map((address) => {
				if (address._id === payload._id) {
					return payload;
				}
				return address;
			});
		});
		builder.addCase(userUpdate.fulfilled, (state, { payload }) => {
			state.name = payload.name;
			state.phone = payload.phone;
			state.status.isSubscribed = payload.status.isSubscribed;
		});
	},
});

export const { resetUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
