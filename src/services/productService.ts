import api from './api';
import type { Product } from '../data/product';

// Các hàm gọi API liên quan đến sản phẩm
export const productService = {
    // Lấy danh sách sản phẩm
    getAllProducts: async (): Promise<Product[]> => {
        const response = await api.get('/products');
        return response.data;
    },

    // Lấy chi tiết 1 sản phẩm
    getProductBySlug: async (slug: string): Promise<Product> => {
        const response = await api.get(`/products/${slug}`);
        return response.data;
    },

    // Thêm mới sản phẩm. Thêm cấu hình headers multipart/form-data vào request POST
    createProduct: async (formData: FormData): Promise<{ status: string; message: string; data: Product }> => {
        const response = await api.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    }

};