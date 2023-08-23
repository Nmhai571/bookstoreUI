import axiosService from "./axiosService";

const API = process.env.API_URL;
const ENDPOINT = "order";
const URL = `${API}/${ENDPOINT}`;
export const orderApi = {
	create: (order: any) => {
		return axiosService.post(URL, order);
	},
	getAllOrderByUser: () => {
		return axiosService.get(`${URL}/`);
	},
	rate: (orderId: string, comment: string) => {
		return axiosService.post(`${URL}/${orderId}`, { comment });
	},
};
