import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../components/ui/ImageUpload";
import { productService } from "../services/productService";

const ProductCreate = () => {
    const navigate = useNavigate();

    // Khởi tạo state quản lý dữ liệu form
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        stock: "",
    });
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Vẫn đóng gói dữ liệu vào FormData vì có file ảnh
            const dataToSend = new FormData();
            dataToSend.append("name", formData.name);
            dataToSend.append("price", formData.price);
            dataToSend.append("description", formData.description);
            dataToSend.append("stock", formData.stock);

            if (thumbnail) {
                dataToSend.append("image", thumbnail);
            }

            // GỌI SERVICE thay vì dùng hàm fetch thủ công
            const result = await productService.createProduct(dataToSend);

            if (result.status === "success") {
                alert(result.message || "Thêm sản phẩm thành công!");
                navigate("/");
            } else {
                alert("Thất bại: " + (result.message || "Vui lòng kiểm tra lại"));
            }
        } catch (error: any) {
            console.error("Lỗi khi tạo sản phẩm:", error);
            // Tận dụng bắt lỗi từ Axios (nếu api của bạn bọc axios)
            const errorMessage = error.response?.data?.message || "Không thể kết nối đến máy chủ Backend!";
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-slate-200 mt-6">
            <div className="flex items-center justify-between mb-6 border-b border-slate-100">
                <h2 className="text-2xl font-bold text-slate-800">Thêm Sản Phẩm Mới</h2>
                <button
                    onClick={() => navigate(-1)} // Quay lại trang trước đó
                    className="text-sm text-slate-500 hover:text-slate-700 cursor-pointer"
                    disabled={isSubmitting}
                >
                    ← Quay lại
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* 5. Ảnh Thumbnail sản phẩm */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ảnh sản phẩm</label>
                    <ImageUpload onChange={(file) => setThumbnail(file)} />
                </div>

                {/* 1. Tên sản phẩm */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tên sản phẩm <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nhập tên sản phẩm..."
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                </div>

                {/* Hàng ngang chứa Giá và Số lượng */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* 2. Giá bán */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Giá bán (VND) <span className="text-red-500">*</span></label>
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
                        <label className="block text-sm font-medium text-slate-700 mb-1">Số lượng kho <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            name="stock"
                            required
                            min="0"
                            value={formData.stock}
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
                        disabled={isSubmitting}
                        className="cursor-pointer rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition flex items-center gap-2"
                    >
                        {isSubmitting && (
                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        )}
                        {isSubmitting ? "Đang lưu..." : "Lưu sản phẩm"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductCreate;