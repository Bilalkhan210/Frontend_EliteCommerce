import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3525cd]">
                shopping_bag
              </span>
              <h2 className="text-lg font-bold text-[#191c1e]">
                Your Cart ({items.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#f2f4f6] px-6 py-3 border-b border-gray-200/50">
            {subtotal >= freeShippingThreshold ? (
              <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">
                  check_circle
                </span>
                You unlocked FREE Express Shipping!
              </p>
            ) : (
              <div>
                <p className="text-xs text-[#464555] mb-1">
                  Add{' '}
                  <span className="font-bold text-[#3525cd]">
                    ${(freeShippingThreshold - subtotal).toFixed(2)}
                  </span>{' '}
                  more to get <span className="font-semibold">FREE Shipping</span>
                </p>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#3525cd] h-full transition-all duration-300"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 text-gray-400 flex flex-col items-center">
                <span className="material-symbols-outlined text-5xl mb-2 text-gray-300">
                  shopping_cart
                </span>
                <p className="text-sm font-medium text-gray-600">
                  Your cart is empty
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Explore our collection to add products.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 border border-gray-100 rounded-xl bg-[#f7f9fb]"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-semibold text-[#191c1e] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-gray-400 hover:text-red-500 text-xs p-0.5"
                        >
                          <span className="material-symbols-outlined text-sm">
                            delete
                          </span>
                        </button>
                      </div>
                      <p className="text-xs text-[#464555]">
                        {item.selectedColor}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-gray-200 rounded-md bg-white">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          className="px-2 py-0.5 text-gray-500 hover:text-black text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          className="px-2 py-0.5 text-gray-500 hover:text-black text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-bold text-[#191c1e]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-[#f7f9fb] space-y-3">
              <div className="flex justify-between text-sm text-[#464555]">
                <span>Subtotal</span>
                <span className="font-bold text-[#191c1e]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-[#464555]">
                <span>Estimated Shipping</span>
                <span>
                  {subtotal >= freeShippingThreshold ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    '$9.99'
                  )}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-extrabold text-[#191c1e]">
                <span>Total</span>
                <span className="text-[#3525cd]">
                  $
                  {(
                    subtotal + (subtotal >= freeShippingThreshold ? 0 : 9.99)
                  ).toFixed(2)}
                </span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full bg-[#3525cd] hover:bg-[#4f46e5] text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-[#3525cd]/20 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>Proceed to Checkout</span>
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
