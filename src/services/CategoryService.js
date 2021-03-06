import Axios from 'axios';
import { CATEGORY } from '../constants';

class CategoryService {
	constructor() {
		this.setupResponseInteceptors();
	}

	setupResponseInteceptors() {
		Axios.interceptors.response.use(
			function(response) {
				return response;
			},
			function(error) {
				return Promise.reject(error);
			}
		);
	}

	getAll() {
		return Axios.get(CATEGORY.URL_GET_ALL, {
			params: {
                sort: "name"
			}
		});
	}
}

export default new CategoryService();
