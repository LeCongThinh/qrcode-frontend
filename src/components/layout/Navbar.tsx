import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Section */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="bg-blue-600 rounded-lg p-2 transition-transform group-hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                <path d="M2 2h2v2H2V2Z"/><path d="M6 2h2v2H6V2Z"/><path d="M10 2h2v2h-2V2Z"/><path d="M14 2h-2v2h2V2Z"/><path d="M2 6h2v2H2V6Z"/><path d="M6 6h2v2H6V6Z"/><path d="M14 6h-2v2h2V6Z"/><path d="M2 10h2v2H2v-2Z"/><path d="M6 10h2v2H6v-2Z"/><path d="M10 10h2v2h-2v-2Z"/><path d="M14 10h-2v2h2v-2Z"/><path d="M2 14h2v2H2v-2Z"/><path d="M6 14h2v2H6v-2Z"/><path d="M10 14h2v2h-2v-2Z"/><path d="M14 14h-2v2h2v-2Z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              QR<span className="text-blue-600">Verify</span>
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm font-semibold text-blue-600">Sản phẩm</a>
              <a href="#" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">Báo cáo</a>
            </div>
            
            {/* Admin Profile */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1 bg-gray-50">
              <div className="w-6 h-6 rounded-full bg-gray-300"></div>
              <span className="text-xs font-bold text-gray-700">Admin</span>
            </div>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <button className="md:hidden p-2 text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;