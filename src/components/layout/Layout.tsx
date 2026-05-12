import React from 'react';
import Navbar from './Navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="container mx-auto px-4 py-10 md:px-6 lg:px-8">
        <div className="animate-in fade-in duration-500">
          {children}
        </div>
      </main>

    </div>
  );
};

export default Layout;