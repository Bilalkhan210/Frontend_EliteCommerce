import React, { useState, useMemo } from 'react';
import { Product, Category, ViewMode } from '../types';

interface DealsViewProps {
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

export const DealsView: React.FC<DealsViewProps> = ({
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
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sortBy, setSortBy] = useState<string>('Popularity');

  // Filter only Sale products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!p.isSale) return false;
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (p.price > maxPrice) return false;
      if (
        searchQuery &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      return b.rating - a.rating;
    });
  }, [products, selectedCategory, maxPrice, searchQuery, sortBy]);

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-8 min-h-screen">
      <nav className="flex text-xs text-[#464555] mb-6">
        <ol className="inline-flex items-center space-x-1">
          <li><button onClick={() => onNavigate('home')} className="hover:text-[#3525cd]">Home</button></li>
          <li><span className="material-symbols-outlined text-sm mx-1">chevron_right</span><span className="text-[#191c1e] font-medium">Hot Deals</span></li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="hidden md:block w-64 shrink-0 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-[#c7c4d8] shadow-sm space-y-6">
            <div>
              <h3 className="text-xs font-bold text-[#191c1e] mb-4 uppercase tracking-wider">Categories</h3>
              <ul className="space-y-3 text-sm text-[#464555]">
                <li>
                  <button onClick={() => setSelectedCategory('All')} className={selectedCategory === 'All' ? 'text-[#3525cd] font-bold' : ''}>All Deals</button>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <button onClick={() => setSelectedCategory(cat.name)} className={selectedCategory === cat.name ? 'text-[#3525cd] font-bold' : ''}>{cat.name}</button>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="border-[#c7c4d8]/40" />
            <div>
              <h3 className="text-xs font-bold text-[#191c1e] mb-4 uppercase tracking-wider">Price Range</h3>
              <input type="range" min="0" max="1000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[#3525cd]" />
              <div className="flex justify-between text-xs mt-2"><span>$0</span><span className="font-bold">${maxPrice}</span></div>
            </div>
          </div>
        </aside>

        <section className="flex-grow">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#ba1a1a]">Exclusive Deals</h1>
              <p className="text-sm text-[#464555]">Grab them before they are gone!</p>
            </div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-[#c7c4d8] rounded-lg px-3 py-2 text-xs font-semibold">
              <option value="Popularity">Popularity</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-xl border border-[#c7c4d8] overflow-hidden hover:shadow-md cursor-pointer" onClick={() => { onSelectProduct(product); onNavigate('product-detail'); }}>
                <div className="aspect-square relative overflow-hidden bg-[#f2f4f6]">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute top-3 left-3 bg-[#ba1a1a] text-white text-[10px] font-bold px-2 py-1 rounded uppercase">Sale</span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-black text-[#191c1e]">${product.price.toFixed(2)}</span>
                    {product.originalPrice && <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>}
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); onAddToCart(product); }} className="w-full mt-4 bg-[#3525cd] text-white py-2 rounded-lg text-xs font-bold hover:bg-[#4f46e5] transition-colors">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
