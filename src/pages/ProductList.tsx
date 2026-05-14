import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/product/ProductCard';

const ProductList = () => {
    // Lấy dữ liệu thực tế, trạng thái tải và hàm tải lại từ Hook
    const { products, isLoading } = useProducts();

    // Hiển thị trạng thái chờ khi đang gọi API
    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="text-slate-500 animate-pulse">Đang tải danh sách sản phẩm...</div>
            </div>
        );
    }
    return (
        <div className="space-y-8">
            {/* Header của trang */}
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-800">Kho sản phẩm</h1>
                    <p className="mt-1 text-sm text-slate-500 italic">
                        <strong>***Ghi chú: </strong>
                        Quản lý danh sách thiết bị máy in và mã QR sản phẩm.<br />
                        Quét mã QR để xem chi tiết sản phẩm và thông tin liên quan.
                    </p>
                </div>
                <button
                    onClick={() => console.log("Thêm sản phẩm")}
                    className="cursor-pointer rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium 
                    text-slate-700 transition hover:bg-slate-50">
                    + Thêm sản phẩm
                </button>
            </div>

            {/* Grid danh sách - ĐÃ CẬP NHẬT DÙNG DỮ LIỆU THẬT */}
            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            ) : (
                // Hiển thị khi kho hàng trống
                <div className="rounded-lg border-2 border-dashed border-slate-200 p-20 text-center">
                    <p className="text-slate-500">Chưa có sản phẩm nào trong kho.</p>
                </div>
            )}
        </div>
    );
};

export default ProductList;