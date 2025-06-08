import { VITE_HACKTHON_PUBLIC_API_URL } from '@/constants/env.constant';
import axios from 'axios';

const api = axios.create({
	baseURL: VITE_HACKTHON_PUBLIC_API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}
});

export default api;
