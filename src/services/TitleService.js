import Axios from 'axios';
import { TITLE } from '../constants';

class TitleService {
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

	getTitles(p, cid) {
		return Axios.get(TITLE.URL_GET_ALL, {
			params: {
				page: p,
				categoryId: cid
			}
		});
	}
}

export default new TitleService();
