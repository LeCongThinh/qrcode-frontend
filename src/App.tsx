import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<div>lecongthinh xin chao</div>} />
          <Route path="/login" element={<div>trang đăng nhập</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;