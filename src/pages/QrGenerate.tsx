import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProductDetail } from "../hooks/useProductDetail";

interface UniqueQr {
    uniqueCode: string;
    targetUrl: string;
    qrImageUrl: string;
}

const QrGenerate: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { product, loading } = useProductDetail(slug);

    const [quantity, setQuantity] = useState<number>(1);
    const [generatedQrs, setGeneratedQrs] = useState<UniqueQr[]>([]);

    // 1. Trạng thái Đang tải dữ liệu từ Hook
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center print:hidden">
                <div className="animate-pulse text-slate-500">Đang tải thông tin sản phẩm...</div>
            </div>
        );
    }

    // 2. Trạng thái Không tìm thấy sản phẩm
    if (!product) {
        return (
            <div className="flex min-h-screen items-center justify-center print:hidden">
                <h1 className="text-2xl font-bold text-red-500">Không tìm thấy sản phẩm</h1>
            </div>
        );
    }

    // 3. Hàm xử lý sinh chuỗi và mã QR Unique dựa trên dữ liệu sản phẩm thật
    const handleGenerateQr = () => {
        if (quantity <= 0) return alert("Vui lòng nhập số lượng lớn hơn 0!");
        if (quantity > 200) return alert("Để đảm bảo hiệu năng, bạn chỉ nên in tối đa 200 mã một lần.");

        const tempQrs: UniqueQr[] = [];
        const baseUrl = window.location.origin;

        for (let i = 0; i < quantity; i++) {
            // Tạo chuỗi định danh ngẫu nhiên không trùng lặp (SKU + Chuỗi 6 ký tự Base36 ngẫu nhiên)
            const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
            const uniqueCode = `${product.sku}-${randomId}`;

            // Đường dẫn gốc trỏ tới trang sản phẩm kèm theo query parameter chứa mã unique code
            const targetUrl = `${baseUrl}/product/${slug}?code=${uniqueCode}`;

            // Link gọi API sinh mã QR
            const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(targetUrl)}`;

            tempQrs.push({ uniqueCode, targetUrl, qrImageUrl });
        }

        setGeneratedQrs(tempQrs);
    };

    // Gọi hộp thoại in của hệ điều hành
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="mx-auto max-w-6xl p-6 space-y-8">

            {/* GIAO DIỆN PRODUCT DETAIL */}
            <div className="print:hidden grid gap-8 rounded-lg bg-white p-6 shadow-lg md:grid-cols-2">

                {/* Ảnh sản phẩm (Đồng bộ UI ProductDetail) */}
                <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="max-h-100 object-contain transition-transform duration-500 hover:scale-105"
                    />
                </div>

                {/* Thông tin chi tiết + Khu vực cấu hình Generator */}
                <div className="flex flex-col justify-center space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                Thiết bị máy in
                            </span>
                            <span
                                className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${product.stock > 0
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {product.stock > 0 ? `Còn hàng` : "Hết hàng"}
                            </span>
                        </div>
                        <h5 className="text-2xl font-bold text-slate-800">{product.name}</h5>
                        <p className="text-sm font-mono text-slate-400">Mã sản phẩm: {product.sku}</p>
                    </div>

                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-red-600">
                            {Number(product.price).toLocaleString("vi-VN")}
                        </span>
                        <span className="text-lg font-bold text-red-600">VNĐ</span>
                    </div>

                    <div className="border-t border-slate-100 pt-4">
                        <h4 className="mb-2 font-bold text-slate-800">Mô tả sản phẩm:</h4>
                        <p className="leading-relaxed text-slate-600">
                            {product.description || "Chưa có mô tả chi tiết cho sản phẩm này."}
                        </p>
                    </div>

                    {/* Lớp bọc tính năng sinh QR Code được tích hợp thêm bên dưới phần mô tả */}
                    <div className="border-t border-slate-100 pt-6 bg-slate-50 p-4 rounded-lg space-y-3">
                        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Cấu hình in nhãn QR Code độc bản</h4>
                        <div className="flex items-end gap-3">
                            <div className="w-1/2">
                                <label className="block text-xs text-slate-500 font-semibold mb-1">Số lượng cần cấp mã:</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={200}
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <button
                                onClick={handleGenerateQr}
                                className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2 px-4 rounded-lg transition-all shadow-md hover:shadow-blue-200"
                            >
                                Khởi tạo mã Unique
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* DANH SÁCH MÃ QR ĐÃ ĐƯỢC TẠO RA */}
            {generatedQrs.length > 0 && (
                <div className="space-y-4">

                    {/* Thanh thông báo điều khiển (Ẩn khi thực hiện IN) */}
                    <div className="print:hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
                        <div>
                            <p className="text-sm font-semibold text-emerald-800">Khởi tạo thành công!</p>
                            <p className="text-xs text-emerald-600">Đã sẵn sàng cấu hình <span className="font-bold">{generatedQrs.length}</span> tem QR Code độc bản.</p>
                        </div>
                        <button
                            onClick={handlePrint}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-md transition-colors whitespace-nowrap"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9V4h12v5M6 18h12v2H6v-2zm-2-8h16a2 2 0 012 2v4H2v-4a2 2 0 012-2z" />
                            </svg>
                            Tiến hành in tem nhãn
                        </button>
                    </div>

                    {/* LƯỚI HIỂN THỊ CÁC MÃ QR ĐỂ IN HÀNG LOẠT */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 bg-white p-4 rounded-lg border border-slate-200 print:border-0 print:p-0 print:grid print:grid-cols-4 print:gap-4">
                        {generatedQrs.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center justify-center border border-slate-200 p-3 rounded-lg bg-slate-50/50 hover:bg-white transition-all text-center print:bg-white print:border print:border-slate-400 print:p-2 break-inside-avoid shadow-sm print:shadow-none"
                            >
                                {/* Hình ảnh QR duy nhất trỏ tới url dạng /product/:slug?code=... */}
                                <img
                                    src={item.qrImageUrl}
                                    alt={`QR-${item.uniqueCode}`}
                                    className="w-28 h-28 object-contain print:w-24 print:h-24"
                                />

                                {/* Thông tin nhãn dán đi kèm */}
                                <div className="mt-2 w-full space-y-0.5">

                                    <p className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider print:text-black">
                                        Code: {item.uniqueCode}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QrGenerate;