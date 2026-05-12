import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
import ProductList from './pages/ProductList';
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<div>trang đăng nhập</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;