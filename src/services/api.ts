import axios from 'axios';

// Cấu hình mặc định cho axios(call api host)
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;