import { useState, useEffect } from "react";
import { productService } from '../services/productService';
import type { Product } from '../data/product';

export const useProductDetail = (slug: string | undefined) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!slug) return;
            try {
                setLoading(true);
                const data = await productService.getProductBySlug(slug);
                setProduct(data);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    return { product, loading };
};