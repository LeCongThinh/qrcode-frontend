import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
import ProductList from './pages/ProductList';
import ProductDetail  from './pages/ProductDetail.tsx';
import ProductCreate from './pages/ProductCreate.tsx';
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
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;