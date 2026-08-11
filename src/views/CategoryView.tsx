import React, { useState, useMemo } from 'react';
import { Product, Category, ViewMode } from '../types';

interface CategoryViewProps {
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

export const CategoryView: React.FC<CategoryViewProps> = ({
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
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(['NexusTech', 'Auraudio', 'Vanguard']);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('Popularity');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Categories count calculation
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(cat => counts[cat.name] = 0);
    products.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      } else {
        counts[p.category] = 1;
      }
    });
    return counts;
  }, [products, categories]);

  // Brand toggle handler
  const handleBrandToggle = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (p.price > maxPrice) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      if (p.rating < minRating) return false;
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
      if (sortBy === 'Newest Arrivals') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return b.rating - a.rating; // Popularity / Rating
    });
  }, [products, selectedCategory, maxPrice, selectedBrands, minRating, searchQuery, sortBy]);

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="hidden md:block w-64 shrink-0 space-y-6">
          <nav aria-label="Breadcrumb" className="flex text-xs text-[#464555] mb-6">
            <ol className="inline-flex items-center space-x-1">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#3525cd]">
                  Home
                </button>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-sm mx-1">chevron_right</span>
                  <span className="text-[#191c1e] font-medium">Category</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="bg-white rounded-xl p-6 border border-[#c7c4d8] shadow-sm space-y-6">
            <div>
              <h3 className="text-xs font-bold text-[#191c1e] mb-4 uppercase tracking-wider">
                Categories
              </h3>
              <ul className="space-y-3 text-sm text-[#464555]">
                <li>
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`flex justify-between w-full text-left transition-colors font-medium ${
                      selectedCategory === 'All' ? 'text-[#3525cd]' : 'hover:text-[#3525cd]'
                    }`}
                  >
                    <span>All Products</span>
                    <span className="bg-[#f2f4f6] px-2 py-0.5 rounded-full text-xs font-semibold">
                      {products.length}
                    </span>
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`flex justify-between w-full text-left transition-colors ${
                        selectedCategory === cat.name ? 'font-bold text-[#3525cd]' : 'hover:text-[#3525cd]'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="bg-[#f2f4f6] px-2 py-0.5 rounded-full text-xs font-semibold">
                        {categoryCounts[cat.name] || 0}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="border-[#c7c4d8]/40" />

            <div>
              <h3 className="text-xs font-bold text-[#191c1e] mb-4 uppercase tracking-wider">
                Price Range
              </h3>
              <div className="px-1">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#e6e8ea] rounded-lg appearance-none cursor-pointer accent-[#3525cd]"
                />
                <div className="flex justify-between text-xs text-[#464555] mt-3">
                  <span>$0</span>
                  <span className="font-bold text-[#191c1e]">${maxPrice}</span>
                  <span>$1000+</span>
                </div>
              </div>
            </div>

            <hr className="border-[#c7c4d8]/40" />

            <div>
              <h3 className="text-xs font-bold text-[#191c1e] mb-4 uppercase tracking-wider">
                Brands
              </h3>
              <div className="space-y-3 text-sm text-[#464555]">
                {['NexusTech', 'Auraudio', 'Vanguard', 'HomeGoods'].map((brand) => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="w-4 h-4 text-[#3525cd] bg-white border-[#c7c4d8] rounded focus:ring-[#3525cd]"
                    />
                    <span className="group-hover:text-[#191c1e] transition-colors">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <section className="flex-grow flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#191c1e]">Category: {selectedCategory}</h1>
              <p className="text-sm text-[#464555] mt-1">
                Showing 1-{filteredProducts.length} of {products.length} results
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-xs font-semibold text-[#464555]">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#c7c4d8] text-[#191c1e] text-xs font-semibold rounded-lg focus:ring-[#3525cd] focus:border-[#3525cd] px-3 py-2 cursor-pointer shadow-sm"
              >
                <option value="Popularity">Popularity</option>
                <option value="Newest Arrivals">Newest Arrivals</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-xl border border-[#c7c4d8] overflow-hidden hover:shadow-md transition-shadow duration-300 relative flex flex-col h-full cursor-pointer"
                  onClick={() => {
                    onSelectProduct(product);
                    onNavigate('product-detail');
                  }}
                >
                  <div className="aspect-square bg-[#f2f4f6] relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product);
                        }}
                        className="bg-white/80 backdrop-blur-sm p-1.5 rounded-full text-[#464555] hover:text-[#3525cd] hover:bg-white transition-all shadow-sm"
                      >
                        <span
                          className="material-symbols-outlined text-sm"
                          style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          favorite
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <span className="text-[10px] font-bold text-[#464555] uppercase tracking-wider mb-1">
                      {product.brand}
                    </span>
                    <h3 className="text-sm font-semibold text-[#191c1e] mb-2 line-clamp-2 group-hover:text-[#3525cd] transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                      <span className="text-base font-extrabold text-[#191c1e]">
                        ${product.price.toFixed(2)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                        }}
                        className="bg-[#3525cd] text-white p-2 rounded-lg hover:bg-[#4f46e5] transition-all flex items-center justify-center shadow-sm"
                      >
                        <span className="material-symbols-outlined text-sm">shopping_cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
