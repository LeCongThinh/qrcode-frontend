import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
import ProductList from './pages/ProductList';
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Trang chủ */}
          <Route path="/" element={<ProductList />} />
          {/* Trang chi tiết sản phẩm */}
          <Route path="/product/:slug" element={<div>trang chi tiết sản phẩm</div>} />
          <Route path="/login" element={<div>trang đăng nhập</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;