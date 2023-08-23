import axiosService from "./axiosService";

const API = process.env.API_URL;
const ENDPOINT = "admin";
const URL = `${API}/${ENDPOINT}`;
export const adminApi = {
	getAllProducts: async () => {
		return await axiosService.get(`${URL}/product`);
	},
	updateOneProduct: async (productId: string, product: any) => {
		return await axiosService.put(`${URL}/product/${productId}`, product);
	},
	getOneProduct: async (productId: string) => {
		return await axiosService.get(`${URL}/product/${productId}`);
	},
	deleteOneProduct: async (productId: string) => {
		return await axiosService.delete(`${URL}/product/${productId}`);
	},
	createOneProduct: async (product: any) => {
		return await axiosService.post(`${URL}/product`, product);
	},
	getAllOrders: async () => {
		return await axiosService.get(`${URL}/order`);
	},
};
