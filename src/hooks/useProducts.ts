import { useState, useEffect } from "react";
import { productService } from '../services/productService';
import type { Product } from '../data/product';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchProducts = async () => {
        try {
            const data = await productService.getAllProducts();
            setProducts(data);
        } catch (error) {
            console.error("Lỗi khi fetch sản phẩm:", error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    return { products, isLoading, refetch: fetchProducts };
}