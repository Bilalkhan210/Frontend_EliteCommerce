import React, { useState } from 'react';
import { ViewMode, User } from '../types';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currentUser: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
  currentUser,
  onLogout
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'shop' },
    { label: 'Categories', view: 'category' },
    { label: 'Deals', view: 'deals' },
    { label: 'New Arrivals', view: 'new-arrivals' },
  ];

  return (
    <header className="bg-[#f7f9fb] shadow-sm sticky top-0 z-50 w-full transition-shadow duration-300 border-b border-[#c7c4d8]/30">
      <div className="flex justify-between items-center w-full px-4 md:px-10 h-20 max-w-[1280px] mx-auto">
        <div className="flex items-center gap-2 md:gap-6">
          <button
            onClick={() => { setMobileMenuOpen(!mobileMenuOpen); }}
            className="md:hidden p-2 text-[#464555]"
          >
            <span className="material-symbols-outlined text-[28px]">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="text-[20px] md:text-[24px] font-extrabold text-[#3525cd] tracking-tighter hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[24px] md:text-[28px] text-[#3525cd]">diamond</span>
            <span className="hidden xs:block">EliteCommerce</span>
          </button>
          
          <nav className="hidden md:flex gap-8 items-center ml-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => onNavigate(link.view as ViewMode)}
                className={`text-[14px] font-semibold transition-colors pb-1 border-b-2 ${
                  currentView === link.view
                    ? 'text-[#3525cd] border-[#3525cd]'
                    : 'text-[#464555] border-transparent hover:text-[#4f46e5]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1 md:gap-4">
          {/* Search Input - Responsive */}
          <div className="relative hidden lg:block w-48 xl:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#464555] text-lg">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentView !== 'shop') onNavigate('shop');
              }}
              placeholder="Search products..."
              className="w-full bg-[#f2f4f6] border border-[#c7c4d8] rounded-full py-2 pl-10 pr-4 text-[14px] focus:outline-none focus:border-[#3525cd] focus:ring-1 focus:ring-[#3525cd] transition-all"
            />
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <button className="lg:hidden p-2 text-[#464555]" onClick={() => onNavigate('shop')}>
               <span className="material-symbols-outlined text-[24px]">search</span>
            </button>

            <button
              onClick={onOpenWishlist}
              aria-label="Wishlist"
              className="p-2 text-[#464555] hover:text-[#4f46e5] transition-colors rounded-full hover:bg-[#f2f4f6] relative"
            >
              <span className="material-symbols-outlined text-[24px]">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#3525cd] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              aria-label="Shopping Cart"
              className="p-2 text-[#464555] hover:text-[#4f46e5] transition-all rounded-full hover:bg-[#f2f4f6] relative"
            >
              <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#ba1a1a] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="Account"
                className="p-2 text-[#464555] hover:text-[#4f46e5] transition-colors rounded-full hover:bg-[#f2f4f6] flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[24px]">account_circle</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#c7c4d8] rounded-xl shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-[#464555]">Signed in as</p>
                    <p className="text-sm font-bold text-[#191c1e] truncate">{currentUser ? currentUser.name : 'Guest User'}</p>
                  </div>
                  <div className="py-1">
                    {currentUser?.role === 'Super Admin' && (
                      <button
                        onClick={() => { onNavigate('admin-overview'); setProfileOpen(false); }}
                        className="w-full text-left px-4 py-2 text-xs text-[#3525cd] hover:bg-[#f2f4f6] flex items-center gap-2 font-semibold"
                      >
                        <span className="material-symbols-outlined text-sm">dashboard</span>
                        Admin Console
                      </button>
                    )}
                    <button
                      onClick={() => { onNavigate('shop'); setProfileOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs text-[#191c1e] hover:bg-[#f2f4f6] flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">storefront</span>
                      Storefront Catalog
                    </button>

                    {!currentUser ? (
                      <button
                        onClick={() => { onNavigate('auth'); setProfileOpen(false); }}
                        className="w-full text-left px-4 py-2 text-xs text-[#191c1e] hover:bg-[#f2f4f6] flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-sm">login</span>
                        Login / Register
                      </button>
                    ) : (
                      <button
                        onClick={() => { onLogout(); setProfileOpen(false); }}
                        className="w-full text-left px-4 py-2 text-xs text-[#ba1a1a] hover:bg-[#ffdad6]/30 flex items-center gap-2 font-semibold"
                      >
                        <span className="material-symbols-outlined text-sm">logout</span>
                        Sign Out
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#c7c4d8]/30 py-4 px-6 space-y-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => { onNavigate(link.view as ViewMode); setMobileMenuOpen(false); }}
              className="block w-full text-left text-[16px] font-bold text-[#464555] hover:text-[#3525cd]"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
