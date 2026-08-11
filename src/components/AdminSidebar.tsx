import React from 'react';
import { ViewMode } from '../types';

interface AdminSidebarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenAddProduct: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentView,
  onNavigate,
  onOpenAddProduct,
  isOpen,
  onClose,
}) => {
  const navItems = [
    { id: 'admin-overview', label: 'Overview', icon: 'dashboard' },
    { id: 'admin-products', label: 'Products', icon: 'inventory_2' },
    { id: 'admin-categories', label: 'Categories', icon: 'category' },
    { id: 'admin-brands', label: 'Brands', icon: 'verified' },
    { id: 'admin-orders', label: 'Orders', icon: 'shopping_bag' },
    { id: 'admin-customers', label: 'Customers', icon: 'group' },
    { id: 'admin-analytics', label: 'Analytics', icon: 'leaderboard' },
    { id: 'admin-settings', label: 'Settings', icon: 'settings' },
  ] as const;

  return (
    <>
      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside className={`fixed left-0 top-0 h-screen w-[280px] bg-[#eceef0] flex flex-col py-4 z-[70] border-r border-[#c7c4d8] transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Header Profile */}
        <div className="px-6 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3525cd] flex items-center justify-center text-white">
              <span className="material-symbols-outlined">admin_panel_settings</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#191c1e]">Admin Pro</h2>
              <p className="text-[10px] text-[#464555]">Management</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 text-gray-400">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-2 space-y-1">
          {navItems.map((item) => {
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as ViewMode)}
                className={`w-full mx-0 px-4 py-3 flex items-center gap-3 rounded-lg text-sm font-semibold transition-all ${
                  active
                    ? 'bg-[#3525cd] text-white shadow-md'
                    : 'text-[#464555] hover:bg-[#e6e8ea] hover:text-[#191c1e]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Add New Product Quick Action */}
        <div className="px-4 my-3">
          <button
            onClick={onOpenAddProduct}
            className="w-full bg-[#3525cd] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#4f46e5] shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add Product
          </button>
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto px-4 pt-3 border-t border-[#c7c4d8]/50">
          <button
            onClick={() => onNavigate('home')}
            className="w-full text-xs font-bold text-[#3525cd] hover:underline flex items-center justify-center gap-1.5 py-2 mb-2 bg-white/70 rounded-lg border border-[#c7c4d8]"
          >
            <span className="material-symbols-outlined text-sm">storefront</span>
            Exit Store
          </button>
        </div>
      </aside>
    </>
  );
};
