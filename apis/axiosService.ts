import axios, { AxiosRequestConfig } from "axios";

const axiosService = axios.create({
	baseURL: "https://api.example.com",
});
axiosService.interceptors.request.use(
	function (config: AxiosRequestConfig<any>) {
		if (typeof window !== "undefined") {
			if (localStorage.getItem("token") && config.headers) {
				config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
			}
		}

		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
axiosService.interceptors.response.use(
	function (response) {
		return response.data as unknown;
	},
	function (error) {
		return Promise.reject(error.response.data);
	}
);

export default axiosService;
