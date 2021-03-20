import axios from 'axios';

const API = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
	timeout: process.env.REACT_API_BOOKSTORE_TIMEOUT,
	responseType: 'json',
});

export const sendUserDetails = async (details) => {
		const { data } = await API.post('/user', details);
		return data;
};
