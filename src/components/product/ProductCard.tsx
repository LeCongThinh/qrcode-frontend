import React from "react";
import type { Product } from "../../data/product";
import { Link } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_APP_URL;

const ProductCard: React.FC<Product> = ({
    name,
    slug,
    sku,
    price,
    image_url,
    stock,
}) => {
    // Tạo link gốc
    const rawQrLink = `${BASE_URL}/product/${slug}`;
    return (
        <Link to={`/product/view/${slug}`} className="group block overflow-hidden rounded-lg border border-slate-300 bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-slate-400/40 cursor-pointer text-current no-underline">
            {/* Ảnh sản phẩm */}
            <div className="relative overflow-hidden border-b border-slate-100 bg-white">
                <img
                    src={image_url}
                    alt={name}
                    className="h-60 w-full object-cover p-4 transition-transform duration-500 group-hover:scale-105"
                />

                {/* Trạng thái sản phẩm */}
                <div className="absolute left-2 top-2">
                    <span
                        className={`rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${stock > 0
                            ? "bg-green-600 text-white"
                            : "bg-slate-200 text-slate-600"
                            }`}
                    >
                        {stock > 0 ? `Còn hàng` : "Hết hàng"}
                    </span>
                </div>
            </div>

            {/* Nội dung card */}
            <div className="space-y-2 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <span className="text-[12px] font-semibold uppercase text-slate-400">MASP:</span>
                        <span className="text-[13px] font-mono text-blue-600">{sku}</span>
                    </div>
                    <p className="text-[12px] text-slate-500">Thiết bị</p>
                </div>

                <h3 className="min-h-12 text-[15px] font-semibold leading-5 text-slate-800">
                    {name.length > 45 ? `${name.slice(0, 45)}...` : name}
                </h3>

                <div className="flex items-start justify-between pt-1">
                    <div>
                        <p className="text-[10px] uppercase text-slate-400">Giá bán</p>
                        <div className="flex items-end gap-1">
                            <span className="text-lg font-bold text-red-600">
                                {Number(price).toLocaleString("vi-VN")}
                            </span>
                            <span className="text-[12px] font-semibold text-red-600">
                                VNĐ
                            </span>
                        </div>
                    </div>

                    {/* QR Code đã được mã hóa Base64 */}
                    <div className="-mt-9 self-start rounded-md border border-slate-200 bg-white p-1 shadow-sm">
                        <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(rawQrLink)}`}
                            alt="QR Code"
                            className="h-20 w-20 object-cover"
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;