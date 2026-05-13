import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
import ProductList from './pages/ProductList';
import ProductDetail  from './components/product/ProductDetail';
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Trang chủ */}
          <Route path="/" element={<ProductList />} />
          {/* Trang chi tiết sản phẩm */}
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/login" element={<div>trang đăng nhập</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;