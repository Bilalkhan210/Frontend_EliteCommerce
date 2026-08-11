import React, { useState } from 'react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || 'Default'
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 bg-white/80 backdrop-blur-md p-1.5 rounded-full text-gray-500 hover:text-black hover:bg-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <div className="w-full md:w-1/2 bg-[#f2f4f6] relative flex items-center justify-center p-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 md:h-80 object-cover rounded-xl"
            />
          </div>

          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#3525cd] uppercase tracking-wider">
                {product.brand}
              </span>
              <h2 className="text-xl font-bold text-[#191c1e] mt-1">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-sm"
                      style={{
                        fontVariationSettings:
                          i < Math.floor(product.rating)
                            ? "'FILL' 1"
                            : "'FILL' 0",
                      }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-xs text-[#464555]">
                  {product.rating} ({product.reviewsCount} reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-2xl font-extrabold text-[#191c1e]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#464555] mt-3 line-clamp-3 leading-relaxed">
                {product.description}
              </p>

              {/* Color Options */}
              {product.colors.length > 0 && (
                <div className="mt-4">
                  <span className="text-xs font-semibold text-[#191c1e]">
                    Color: {selectedColor}
                  </span>
                  <div className="flex gap-2 mt-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${
                          selectedColor === c.name
                            ? 'border-[#3525cd] scale-110 shadow-md'
                            : 'border-gray-200 hover:scale-105'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  onAddToCart(product, selectedColor);
                  onClose();
                }}
                className="flex-1 bg-[#3525cd] hover:bg-[#4f46e5] text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">
                  shopping_cart
                </span>
                Add to Cart
              </button>
              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isWishlisted
                    ? 'border-red-200 bg-red-50 text-red-500'
                    : 'border-gray-200 text-gray-500 hover:text-black'
                }`}
              >
                <span
                  className="material-symbols-outlined text-sm"
                  style={{
                    fontVariationSettings: isWishlisted
                      ? "'FILL' 1"
                      : "'FILL' 0",
                  }}
                >
                  favorite
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
