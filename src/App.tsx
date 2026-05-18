import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
import ProductList from './pages/ProductList';
import ProductDetail  from './pages/ProductDetail.tsx';
import ProductCreate from './pages/ProductCreate.tsx';
import QrGenerate from './pages/QrGenerate.tsx';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Trang chủ */}
          <Route path="/" element={<ProductList />} />
          {/* Trang chi tiết sản phẩm */}
          <Route path="/product/:slug" element={<ProductDetail />} />
          {/* Thêm mới sản phẩm */}
          <Route path="/product/create" element={<ProductCreate />} />
          {/* Trang cấu hình và tạo mã QR độc bản (Khi click từ Card) */}
          <Route path="/product/view/:slug" element={<QrGenerate />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;