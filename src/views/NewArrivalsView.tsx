import React, { useState, useMemo } from 'react';
import { Product, Category, ViewMode } from '../types';

interface NewArrivalsViewProps {
  products: Product[];
  categories: Category[];
  onNavigate: (view: ViewMode) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  searchQuery: string;
  onOpenQuickView: (product: Product) => void;
}

export const NewArrivalsView: React.FC<NewArrivalsViewProps> = ({
  products,
  categories,
  onNavigate,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  searchQuery,
  onOpenQuickView,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('Latest');

  // Filter only New products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!p.isNew) return false;
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (
        searchQuery &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-8 min-h-screen">
      <nav className="flex text-xs text-[#464555] mb-6">
        <ol className="inline-flex items-center space-x-1">
          <li><button onClick={() => onNavigate('home')} className="hover:text-[#3525cd]">Home</button></li>
          <li><span className="material-symbols-outlined text-sm mx-1">chevron_right</span><span className="text-[#191c1e] font-medium">New Arrivals</span></li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="hidden md:block w-64 shrink-0 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-[#c7c4d8] shadow-sm">
             <h3 className="text-xs font-bold text-[#191c1e] mb-4 uppercase tracking-wider">Categories</h3>
              <ul className="space-y-3 text-sm text-[#464555]">
                <li>
                  <button onClick={() => setSelectedCategory('All')} className={selectedCategory === 'All' ? 'text-[#3525cd] font-bold' : ''}>All New Items</button>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <button onClick={() => setSelectedCategory(cat.name)} className={selectedCategory === cat.name ? 'text-[#3525cd] font-bold' : ''}>{cat.name}</button>
                  </li>
                ))}
              </ul>
          </div>
        </aside>

        <section className="flex-grow">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="inline-block px-3 py-1 bg-[#3525cd]/10 text-[#3525cd] text-[10px] font-bold rounded-full uppercase mb-2">Just Landed</span>
              <h1 className="text-3xl font-extrabold text-[#191c1e]">New Arrivals</h1>
              <p className="text-sm text-[#464555]">Explore the latest additions to our premium collection.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-xl border border-[#c7c4d8] overflow-hidden hover:shadow-lg transition-all cursor-pointer" onClick={() => { onSelectProduct(product); onNavigate('product-detail'); }}>
                <div className="aspect-[4/5] relative overflow-hidden bg-[#f2f4f6]">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-[#191c1e] text-white text-[10px] font-bold px-2 py-1 rounded uppercase">New</span>
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-bold text-[#464555] uppercase tracking-wider">{product.brand}</span>
                  <h3 className="text-sm font-semibold text-[#191c1e] mt-1 group-hover:text-[#3525cd] transition-colors">{product.name}</h3>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-base font-extrabold text-[#191c1e]">${product.price.toFixed(2)}</span>
                    <button onClick={(e) => { e.stopPropagation(); onAddToCart(product); }} className="bg-[#3525cd] text-white p-2 rounded-lg hover:bg-[#4f46e5]">
                      <span className="material-symbols-outlined text-sm">shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
