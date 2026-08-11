import React from 'react';
import { Product, ViewMode } from '../types';

interface HomeViewProps {
  products: Product[];
  onNavigate: (view: ViewMode) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  onNavigate,
  onSelectProduct,
  onAddToCart,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section matching Screenshot 1 */}
      <section className="relative w-full h-[600px] bg-[#f2f4f6] overflow-hidden flex items-center justify-center">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBAR59-npaLy4yehVMJvqfnOz9zJFHo0iWytq0NOpI4PKzzx-Nl3khze35CEuaylhhlgNZYoQkGAVIWfDbVbHL1Udi2ylkrjo-3H5ST4kzWf_TUl8SYmgk56a190YwQhrfrD2xY3DdDCCENVE3zASF6QXClH9IaKN-E5Rov30EZiJbU5kl4731O8dcequKfmUK8Vale45tRbBpJCIBT8Dz62tZHjjGvPnar9s6LlgT6smEX6OJaYgp-')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7f9fb]/90 via-[#f7f9fb]/60 to-transparent" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 w-full flex flex-col items-start">
          <div className="max-w-2xl">
            <span className="inline-block px-3.5 py-1.5 bg-[#4f46e5]/10 text-[#3525cd] font-semibold rounded-full text-xs mb-4 border border-[#3525cd]/20">
              Summer Collection 2026
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#191c1e] mb-6 leading-tight tracking-tight">
              Elevate Your Everyday Essentials
            </h1>
            <p className="text-base md:text-lg text-[#464555] mb-8 max-w-xl leading-relaxed">
              Discover a curated selection of premium products designed to integrate seamlessly into your modern lifestyle. Quality craftsmanship meets innovative design.
            </p>
            <button
              onClick={() => onNavigate('shop')}
              className="bg-[#4f46e5] text-white px-8 py-4 rounded-xl font-semibold text-sm shadow-lg shadow-[#4f46e5]/30 hover:-translate-y-1 hover:shadow-xl hover:bg-[#3525cd] transition-all duration-300 flex items-center gap-2"
            >
              <span>Shop Now</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-xs font-bold text-[#3525cd] uppercase tracking-wider">
              Handpicked Selection
            </span>
            <h2 className="text-2xl font-bold text-[#191c1e] mt-1">
              Featured Arrivals
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-sm font-bold text-[#3525cd] hover:underline flex items-center gap-1"
          >
            <span>View All Catalog</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl border border-[#c7c4d8] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer"
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
                {product.isSale && (
                  <span className="absolute top-3 left-3 bg-[#ba1a1a] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    Sale
                  </span>
                )}
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-[#565e74] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    New
                  </span>
                )}
              </div>

              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#464555] uppercase tracking-wider">
                    {product.brand}
                  </span>
                  <h3 className="text-sm font-semibold text-[#191c1e] mt-1 line-clamp-2 group-hover:text-[#3525cd] transition-colors">
                    {product.name}
                  </h3>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-base font-extrabold text-[#191c1e]">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="bg-[#3525cd] text-white p-2 rounded-lg hover:bg-[#4f46e5] transition-colors flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-sm">
                      shopping_cart
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
