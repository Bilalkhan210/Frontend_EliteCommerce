import React from 'react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3525cd]">
                favorite
              </span>
              <h2 className="text-lg font-bold text-[#191c1e]">
                Saved Favorites ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 text-gray-400 flex flex-col items-center">
                <span className="material-symbols-outlined text-5xl mb-2 text-gray-300">
                  favorite_border
                </span>
                <p className="text-sm font-medium text-gray-600">
                  Your wishlist is empty
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Click the heart icon on items you love to save them here.
                </p>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 border border-gray-100 rounded-xl bg-[#f7f9fb]"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-[#464555] uppercase tracking-wider">
                          {product.brand}
                        </span>
                        <button
                          onClick={() => onRemoveWishlist(product.id)}
                          className="text-gray-400 hover:text-red-500 text-xs p-0.5"
                        >
                          <span className="material-symbols-outlined text-sm">
                            close
                          </span>
                        </button>
                      </div>
                      <h4 className="text-sm font-semibold text-[#191c1e] line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-sm font-bold text-[#3525cd] mt-0.5">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(product);
                        onRemoveWishlist(product.id);
                      }}
                      className="mt-2 bg-[#3525cd] hover:bg-[#4f46e5] text-white py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-xs">
                        shopping_cart
                      </span>
                      Move to Cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
