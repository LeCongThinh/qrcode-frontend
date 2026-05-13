import { useParams } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../../data/product';
const ProductDetail = () => {
    const { slug } = useParams();

    const product = MOCK_PRODUCTS.find((item) => item.slug === slug);

    if (!product) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <h1 className="text-2xl font-bold text-red-500">
                    Không tìm thấy sản phẩm
                </h1>
            </div>
        );
    }

    return (
        <div className="mx-auto grid max-w-6xl gap-8 rounded-xl bg-white p-6 shadow-lg md:grid-cols-2">

            {/* Ảnh sản phẩm */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>

            <div className="max-w-sm overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-hover hover:shadow-md">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                        Máy in
                    </span>
                    <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${product.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                    >
                        {product.status === "active" ? "Sẵn hàng" : "Hết hàng"}
                    </span>
                </div>

                {/* Tên sản phẩm & SKU */}
                <div className="mb-2">
                    <h3 className=" text-lg font-bold text-slate-800" title={product.name}>
                        {product.name}
                    </h3>
                    <p className="text-xs text-slate-400">MASP: {product.sku}</p>
                </div>

                {/* Giá bán */}
                <div className="mb-2 flex items-baseline gap-1">
                    <span className="text-xl font-bold text-red-600">
                        {product.price.toLocaleString("vi-VN")}
                    </span>
                    <span className="text-xs font-semibold text-red-600">VNĐ</span>
                </div>

                {/* Mô tả ngắn (Giới hạn dòng) */}
                <p className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-800">Mô tả: </span>
                    Máy in chất lượng cao, hỗ trợ kết nối Wifi, in nhanh và tiết kiệm mực.
                </p>
            </div>
        </div>
    );
};

export default ProductDetail;