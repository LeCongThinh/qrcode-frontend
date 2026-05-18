import axios from 'axios';

// Cấu hình mặc định cho axios(call api host)
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;