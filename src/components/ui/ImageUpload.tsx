import React, { useState, useRef } from "react";

interface ImageUploadProps {
    onChange: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    // State quản lý hiệu ứng kéo thả
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        processFile(file);
    };

    const processFile = (file: File | null) => {
        if (file) {
            // Kiểm tra nếu không phải file ảnh
            if (!file.type.startsWith("image/")) {
                alert("Vui lòng chỉ chọn file hình ảnh!");
                return;
            }
            // Kiểm tra dung lượng (Ví dụ giới hạn 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert("Dung lượng ảnh quá lớn! Vui lòng chọn ảnh dưới 2MB.");
                return;
            }

            // Tạo đường dẫn tạm để hiển thị ảnh xem trước (Preview)
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            onChange(file); // Truyền file ngược lại lên Form cha (ProductCreate)
        }
    };

    // 1. Khi người dùng kéo file đi vào vùng upload
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true); // Bật hiệu ứng màu xanh
    };

    // 2. Khi file đang nằm di chuyển bên trong vùng upload
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    // 3. Khi người dùng kéo file đi ra khỏi vùng upload (không thả nữa)
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false); // Tắt hiệu ứng màu xanh, trả về màu xám ban đầu
    };

    // 4. Khi người dùng buông chuột THẢ file vào vùng upload
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false); // Tắt hiệu ứng màu xanh sau khi thả xong

        const file = e.dataTransfer.files?.[0] || null;
        processFile(file); // Tiến hành xử lý file giống như lúc click chọn
    };

    const handleRemove = () => {
        setPreviewUrl(null);
        onChange(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div
            // Đăng ký các sự kiện kéo thả với HTML5
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            // Thay đổi class Tailwind linh hoạt dựa vào biến isDragging
            className={`mt-1 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition duration-200 ${
                isDragging
                    ? "border-blue-500 bg-blue-50 text-blue-600 scale-[1.01]" // Khi đang kéo ảnh vào: Viền xanh, nền xanh nhạt, phóng to nhẹ
                    : "border-slate-300 bg-slate-50 hover:bg-slate-100" // Trạng thái bình thường
            }`}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            {!previewUrl ? (
                // Giao diện khi CHƯA có ảnh
                <div 
                    className="text-center cursor-pointer w-full h-full py-4" 
                    onClick={() => fileInputRef.current?.click()}
                >
                    {/* Icon đám mây tự động đổi màu mượt mà theo trạng thái kéo */}
                    <svg 
                        className={`mx-auto h-12 w-12 transition duration-200 ${isDragging ? "text-blue-500 animate-bounce" : "text-slate-400"}`} 
                        stroke="currentColor" 
                        fill="none" 
                        viewBox="0 0 48 48" 
                        aria-hidden="true"
                    >
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4-4m4 24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className={`mt-2 text-sm font-medium transition duration-200 ${isDragging ? "text-blue-600" : "text-blue-600"}`}>
                        {isDragging ? "Thả ảnh ngay vào đây!" : "Nhấp hoặc kéo thả ảnh vào đây"}
                    </div>
                    <p className="mt-1 text-xs text-slate-500">PNG, JPG, WEBP lên đến 2MB</p>
                </div>
            ) : (
                // Giao diện khi ĐÃ CÓ ảnh (Hiển thị preview)
                <div className="relative w-full max-w-50">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-40 w-full rounded-md object-cover border border-slate-200 shadow-sm"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute -top-2 -right-2 cursor-pointer flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold shadow-md hover:bg-red-600 transition"
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;