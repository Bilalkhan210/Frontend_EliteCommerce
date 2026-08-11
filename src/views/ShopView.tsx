import React, { useState, useMemo } from 'react';
import { Product, Category, ViewMode } from '../types';

interface ShopViewProps {
  products: Product[];
  categories: Category[];
  currentView?: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  searchQuery: string;
  onOpenQuickView: (product: Product) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  categories,
  currentView,
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
      if (currentView === 'deals' && !p.isSale) return false;
      if (currentView === 'new-arrivals' && !p.isNew) return false;
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
      {/* Main Content Layout with Sidebar */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Sidebar Filters matching Screenshot 2 */}
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
                  <span className="text-[#191c1e] font-medium">Shop</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="bg-white rounded-xl p-6 border border-[#c7c4d8] shadow-sm space-y-6">
            {/* Categories */}
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
                {Object.entries(categoryCounts).map(([cat, count]) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex justify-between w-full text-left transition-colors ${
                        selectedCategory === cat ? 'font-bold text-[#3525cd]' : 'hover:text-[#3525cd]'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="bg-[#f2f4f6] px-2 py-0.5 rounded-full text-xs font-semibold">
                        {count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="border-[#c7c4d8]/40" />

            {/* Price Range Slider */}
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

            {/* Brands Checkboxes */}
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

            <hr className="border-[#c7c4d8]/40" />

            {/* Minimum Rating */}
            <div>
              <h3 className="text-xs font-bold text-[#191c1e] mb-4 uppercase tracking-wider">
                Rating
              </h3>
              <div className="space-y-2">
                {[4, 3, 0].map((rating) => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === rating}
                      onChange={() => setMinRating(rating)}
                      className="text-[#3525cd] focus:ring-[#3525cd]"
                    />
                    <div className="flex text-amber-400 text-sm items-center">
                      {[...Array(4)].map((_, i) => (
                        <span
                          key={i}
                          className="material-symbols-outlined text-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      ))}
                      <span className="material-symbols-outlined text-sm">star</span>
                      <span className="ml-2 text-xs text-[#464555]">
                        {rating > 0 ? `${rating} & Up` : 'All Ratings'}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content Area (Products Grid) */}
        <section className="flex-grow flex flex-col">
          {/* Header & Sorting */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#191c1e]">All Products</h1>
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

          {/* Product Grid */}
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
                  {/* Badges */}
                  {product.isSale && (
                    <div className="absolute top-3 left-3 bg-[#ba1a1a] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10">
                      Sale
                    </div>
                  )}
                  {product.isNew && (
                    <div className="absolute top-3 left-3 bg-[#565e74] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10">
                      New
                    </div>
                  )}

                  {/* Wishlist Button */}
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

                  {/* Product Image */}
                  <div className="aspect-square bg-[#f2f4f6] relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Quick View Hover Button */}
                    <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent flex gap-2 justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenQuickView(product);
                        }}
                        className="bg-white text-[#191c1e] text-xs font-semibold py-1.5 px-3 rounded-lg shadow flex-1 hover:bg-[#3525cd] hover:text-white transition-colors flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-xs">visibility</span>
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 flex flex-col flex-grow">
                    <span className="text-[10px] font-bold text-[#464555] uppercase tracking-wider mb-1">
                      {product.brand}
                    </span>
                    <h3 className="text-sm font-semibold text-[#191c1e] mb-2 line-clamp-2 group-hover:text-[#3525cd] transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-1 mb-3 mt-auto">
                      <div className="flex text-amber-400 text-xs">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className="material-symbols-outlined text-sm"
                            style={{
                              fontVariationSettings:
                                i < Math.floor(product.rating) ? "'FILL' 1" : "'FILL' 0",
                            }}
                          >
                            star
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-[#464555]">({product.reviewsCount})</span>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-extrabold text-[#191c1e]">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#464555] line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
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

          {/* Pagination matching screenshot 2 */}
          <div className="flex justify-center mt-auto pt-6 border-t border-[#c7c4d8]/30">
            <nav className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-2 rounded-lg border border-[#c7c4d8] text-[#464555] hover:bg-[#f2f4f6] transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button
                onClick={() => setCurrentPage(1)}
                className={`w-9 h-9 rounded-lg font-bold text-xs flex items-center justify-center ${
                  currentPage === 1
                    ? 'bg-[#3525cd] text-white shadow-sm'
                    : 'border border-[#c7c4d8] text-[#464555] hover:bg-[#f2f4f6]'
                }`}
              >
                1
              </button>
              <button
                onClick={() => setCurrentPage(2)}
                className={`w-9 h-9 rounded-lg font-bold text-xs flex items-center justify-center ${
                  currentPage === 2
                    ? 'bg-[#3525cd] text-white shadow-sm'
                    : 'border border-[#c7c4d8] text-[#464555] hover:bg-[#f2f4f6]'
                }`}
              >
                2
              </button>
              <button
                onClick={() => setCurrentPage(3)}
                className={`w-9 h-9 rounded-lg font-bold text-xs flex items-center justify-center ${
                  currentPage === 3
                    ? 'bg-[#3525cd] text-white shadow-sm'
                    : 'border border-[#c7c4d8] text-[#464555] hover:bg-[#f2f4f6]'
                }`}
              >
                3
              </button>
              <span className="text-xs text-[#464555] px-1">...</span>
              <button
                onClick={() => setCurrentPage(10)}
                className="w-9 h-9 rounded-lg border border-[#c7c4d8] text-[#464555] hover:bg-[#f2f4f6] font-bold text-xs flex items-center justify-center transition-colors"
              >
                10
              </button>
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                className="p-2 rounded-lg border border-[#c7c4d8] text-[#464555] hover:bg-[#f2f4f6] transition-colors"
              >
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </nav>
          </div>
        </section>
      </div>
    </div>
  );
};
