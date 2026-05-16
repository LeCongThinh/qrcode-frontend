import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../components/ui/ImageUpload"; // Tận dụng component upload ảnh có sẵn của bạn

const ProductCreate = () => {
    const navigate = useNavigate();

    // Khởi tạo state quản lý dữ liệu form
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        quantity: "",
    });
    const [thumbnail, setThumbnail] = useState<File | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Xử lý gửi dữ liệu lên API backend tại đây
        console.log("Dữ liệu gửi đi:", { ...formData, thumbnail });

        // Sau khi tạo thành công, quay về danh sách
        // navigate("/");
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-slate-200 mt-6">
            <div className="flex items-center justify-between mb-6 border-b border-slate-100">
                <h2 className="text-2xl font-bold text-slate-800">Thêm Sản Phẩm Mới</h2>
                <button
                    onClick={() => navigate(-1)} // Quay lại trang trước đó
                    className="text-sm text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                    ← Quay lại
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* 5. Ảnh Thumbnail sản phẩm */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ảnh sản phẩm</label>
                    {/* Sử dụng component ImageUpload trong folder UI của bạn */}
                    <ImageUpload onChange={(file) => setThumbnail(file)} />
                </div>

                {/* 1. Tên sản phẩm */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tên sản phẩm *</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ví dụ: Máy in Canon LBP 2900"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                </div>

                {/* Hàng ngang chứa Giá và Số lượng */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* 2. Giá bán */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Giá bán (VND) *</label>
                        <input
                            type="number"
                            name="price"
                            required
                            min="0"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="0"
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* 3. Số lượng sản phẩm */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Số lượng kho *</label>
                        <input
                            type="number"
                            name="quantity"
                            required
                            min="0"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            placeholder="0"
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* 4. Mô tả sản phẩm */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả sản phẩm</label>
                    <textarea
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Nhập thông tin chi tiết, thông số kỹ thuật của thiết bị..."
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                </div>


                {/* Nút hành động */}
                <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="cursor-pointer rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                    >
                        Lưu sản phẩm
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductCreate;