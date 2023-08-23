import axiosService from "./axiosService";

const API = process.env.API_URL;
const ENDPOINT = "voucher";
export const voucherApi = {
	getOne: (code: string) => {
		return axiosService.get(`${API}/${ENDPOINT}/${code}`);
	},
};
