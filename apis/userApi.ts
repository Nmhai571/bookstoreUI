import { iUserAddress } from "../models/user.model";
import axiosService from "./axiosService";

const API = process.env.API_URL;
const ENDPOINT = "user";
export const userApi = {
	loginWithGoogle: (token: string) => {
		return axiosService.post(`${API}/${ENDPOINT}/login`, { token });
	},
	getUser: () => {
		return axiosService.get(`${API}/${ENDPOINT}`);
	},
	addToWhitelist: (book_id: string) => {
		return axiosService.post(`${API}/${ENDPOINT}/whitelist`, { book_id });
	},
	removeFromWhitelist: (book_id: string) => {
		return axiosService.delete(`${API}/${ENDPOINT}/whitelist`, {
			data: {
				book_id,
			},
		});
	},
	createAddress: (address: iUserAddress) => {
		return axiosService.post(`${API}/${ENDPOINT}/address`, { address });
	},
	updateAddress: (address: iUserAddress) => {
		return axiosService.put(`${API}/${ENDPOINT}/address`, { address });
	},
	updateUser: ({ name, phone, subscribe }: { name: string; phone: string; subscribe: string }) => {
		return axiosService.patch(`${API}/${ENDPOINT}`, { name, phone, subscribe });
	},
	subcribeMail: (email: string) => {
		return axiosService.post(`${API}/${ENDPOINT}/mail`, { email });
	},
};
