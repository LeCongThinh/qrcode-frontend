import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../services/productService';
import type { Product } from '../data/product';

const ProductDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (slug) {
                try {
                    const data = await productService.getProductBySlug(slug);
                    setProduct(data);
                } catch (error) {
                    console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchProduct();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-pulse text-slate-500">Đang tải thông tin sản phẩm...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <h1 className="text-2xl font-bold text-red-500">Không tìm thấy sản phẩm</h1>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl p-6">
            <div className="grid gap-8 rounded-xl bg-white p-6 shadow-lg md:grid-cols-2">
                
                {/* Ảnh sản phẩm */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center">
                    <img
                        src={product.image_url} // Cập nhật từ .image thành .image_url
                        alt={product.name}
                        className="max-h-100 object-contain transition-transform duration-500 hover:scale-105"
                    />
                </div>

                {/* Thông tin chi tiết */}
                <div className="flex flex-col justify-center space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                Thiết bị máy in
                            </span>
                            <span
                                className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${
                                    product.stock > 0
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {product.stock > 0 ? `Còn hàng (${product.stock})` : "Hết hàng"}
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-800">{product.name}</h1>
                        <p className="text-sm font-mono text-slate-400">Mã sản phẩm: {product.sku}</p>
                    </div>

                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-red-600">
                            {Number(product.price).toLocaleString("vi-VN")}
                        </span>
                        <span className="text-lg font-bold text-red-600">VNĐ</span>
                    </div>

                    <div className="border-t border-slate-100 pt-6">
                        <h4 className="mb-2 font-bold text-slate-800">Mô tả sản phẩm:</h4>
                        <p className="leading-relaxed text-slate-600">
                            {product.description || "Chưa có mô tả chi tiết cho sản phẩm này."}
                        </p>
                    </div>

                    {/* QR Code hiển thị thêm nếu muốn */}
                    <div className="flex items-center gap-4 rounded-lg bg-slate-50 p-4">
                        <div className="bg-white p-2 shadow-sm rounded-md">
                           <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(btoa(window.location.href))}`}
                                alt="QR Link" 
                                className="h-16 w-16"
                           />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-700">Mã định danh QR</p>
                            <p className="text-[10px] text-slate-500">Quét để chia sẻ sản phẩm này nhanh chóng.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;