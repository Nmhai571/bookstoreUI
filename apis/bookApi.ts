import axiosService from "./axiosService";

const API = process.env.API_URL;
const ENDPOINT = "book";
export const bookApi = {
	getAll: (page?: number, limit?: number) => {
		return axiosService.get(`${API}/${ENDPOINT}`, {
			params: {
				page,
				limit,
			},
		});
	},
	getOne: (slug: string) => {
		return axiosService.get(`${API}/${ENDPOINT}/${slug}`);
	},
};
