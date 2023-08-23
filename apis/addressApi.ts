import axios from "axios";
import axiosService from "./axiosService";

const API = process.env.API_URL;
const ENDPOINT = "address";
const URL = `${API}/${ENDPOINT}`;
export const addressApi = {
	getAllByCode: (province_code: number, district_code: number, ward_code: number) => {
		return axios.post(`${URL}`, {
			province_code,
			district_code,
			ward_code,
		});
	},
	getAllProvinces: () => {
		return axios.get(`${URL}/p`);
	},
	getAllDistricts: () => {
		return axios.get(`${URL}/d`);
	},
	getAllWards: () => {
		return axios.get(`${URL}/w`);
	},
	getDistrictsByProvince: (province_id: number) => {
		return axios.get(`${URL}/d/`, {
			params: {
				province_code: province_id,
			},
		});
	},
	getWardsByDistrict: (district_id: number) => {
		return axios.get(`${URL}/w/`, {
			params: {
				district_code: district_id,
			},
		});
	},
	getProvinceByCode: (province_code: number) => {
		return axios.get(`${URL}/p/${province_code}`);
	},
	getDistrictByCode: (district_code: number) => {
		return axios.get(`${URL}/d/${district_code}`);
	},
	getWardByCode: (ward_code: number) => {
		return axios.get(`${URL}/w/${ward_code}`);
	},
};
