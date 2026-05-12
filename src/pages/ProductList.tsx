import { MOCK_PRODUCTS } from '../data/product';
import ProductCard from '../components/product/ProductCard';

const ProductList = () => {
    return (
        <div className="space-y-8">
            {/* Header của trang */}
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-800">Kho sản phẩm</h1>
                    <p className="mt-1 text-sm text-slate-500 italic"><strong>***Ghi chú: </strong>
                        Quản lý danh sách thiết bị máy in và mã QR sản phẩm.<br></br>
                        Quét mã QR để xem chi tiết sản phẩm và thông tin liên quan.
                    </p>
                </div>
                <button onClick={() => console.log("Thêm sản phẩm")} className="cursor-pointer rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                    + Thêm sản phẩm
                </button>
            </div>

            {/* Grid danh sách */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {MOCK_PRODUCTS.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;