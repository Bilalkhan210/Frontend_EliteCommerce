import React, { useState } from 'react';
import { Product, ViewMode } from '../types';

interface ProductDetailViewProps {
  product: Product;
  onNavigate: (view: ViewMode) => void;
  onAddToCart: (product: Product, quantity: number, selectedColor: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onNavigate,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0]?.name || 'Default'
  );
  const [quantity, setQuantity] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!product) return <div className="p-10 text-center">Loading product...</div>;

  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  const currentImage = images[selectedImageIndex] || product.image;

  return (
    <main className="max-w-[1280px] mx-auto px-6 md:px-10 py-8 min-h-screen">
      {/* Breadcrumbs matching Screenshot 3 */}
      <nav className="flex items-center gap-2 text-xs text-[#464555] mb-6">
        <button onClick={() => onNavigate('home')} className="hover:text-[#3525cd]">
          Home
        </button>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <button onClick={() => onNavigate('shop')} className="hover:text-[#3525cd]">
          {product.category}
        </button>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-[#191c1e] font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Product Gallery (Left) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails list */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible no-scrollbar pb-2 md:pb-0 md:w-24 shrink-0">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`w-20 h-24 md:w-full bg-[#f2f4f6] rounded-lg overflow-hidden border-2 shrink-0 relative transition-all ${
                  selectedImageIndex === idx ? 'border-[#3525cd] shadow-md' : 'border-[#c7c4d8]/60 hover:border-[#3525cd]'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Large Image */}
          <div className="flex-grow bg-[#ffffff] rounded-xl overflow-hidden border border-[#c7c4d8] relative group cursor-crosshair">
            <img
              src={currentImage}
              alt={product.name}
              className="w-full h-[400px] md:h-[550px] object-cover object-center group-hover:scale-125 transition-transform duration-500 ease-out origin-center"
            />
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md rounded-full p-1.5 flex gap-1 shadow-sm">
              <button
                onClick={() => setIsFullscreen(true)}
                title="Fullscreen view"
                className="text-[#191c1e] hover:text-[#3525cd] p-1"
              >
                <span className="material-symbols-outlined text-lg">fullscreen</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Info (Right) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div>
            <span className="text-xs font-bold text-[#3525cd] uppercase tracking-wider">
              {product.brand}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#191c1e] mt-1">
              {product.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2 text-sm mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[18px]"
                    style={{
                      fontVariationSettings: i < Math.floor(product.rating) ? "'FILL' 1" : "'FILL' 0",
                    }}
                  >
                    star
                  </span>
                ))}
              </div>
              <span className="font-bold text-[#191c1e]">{product.rating}</span>
              <a href="#reviews" className="text-[#3525cd] hover:underline ml-1">
                ({product.reviewsCount} Reviews)
              </a>
            </div>
          </div>

          {/* Price & Discount */}
          <div className="flex items-end gap-3 mt-1">
            <span className="text-4xl font-extrabold text-[#191c1e]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-[#464555] line-through mb-1">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.originalPrice && (
              <span className="bg-[#ffdad6] text-[#93000a] text-xs font-bold px-2.5 py-1 rounded-full mb-1 ml-1">
                Save ${(product.originalPrice - product.price).toFixed(0)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-[#191c1e]">In Stock</span>
            <span className="text-[#464555] text-xs ml-2">Ships within 24 hours</span>
          </div>

          <hr className="border-[#c7c4d8]/40 my-1" />

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-[#191c1e] mb-2">
                Color: <span className="font-normal text-[#464555] ml-1">{selectedColor}</span>
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    style={{ backgroundColor: color.value }}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? 'border-[#3525cd] ring-2 ring-[#4f46e5]/30 ring-offset-2'
                        : 'border-[#c7c4d8] hover:border-black'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex gap-3 items-center">
              {/* Quantity selector */}
              <div className="flex items-center border border-[#c7c4d8] rounded-xl bg-[#ffffff] h-12 w-32 justify-between px-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-[#464555] hover:text-[#3525cd] p-1 font-bold text-lg"
                >
                  -
                </button>
                <span className="font-bold text-sm text-[#191c1e]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-[#464555] hover:text-[#3525cd] p-1 font-bold text-lg"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={() => onAddToCart(product, quantity, selectedColor)}
                className="flex-1 bg-[#f2f4f6] text-[#3525cd] border border-[#3525cd] hover:bg-[#3525cd] hover:text-white h-12 rounded-xl font-bold text-sm flex justify-center items-center gap-2 transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                Add to Cart
              </button>

              {/* Wishlist button */}
              <button
                onClick={() => onToggleWishlist(product)}
                className={`h-12 w-12 rounded-xl border flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? 'border-red-300 bg-red-50 text-red-500'
                    : 'border-[#c7c4d8] text-[#464555] hover:text-[#3525cd]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
                >
                  favorite
                </span>
              </button>
            </div>

            {/* Buy It Now */}
            <button
              onClick={() => {
                onAddToCart(product, quantity, selectedColor);
              }}
              className="w-full bg-[#3525cd] text-white hover:bg-[#4f46e5] h-13 rounded-xl font-bold text-sm flex justify-center items-center gap-2 transition-all shadow-lg shadow-[#3525cd]/30"
            >
              <span className="material-symbols-outlined text-[20px]">bolt</span>
              Buy It Now
            </button>
          </div>

          {/* Guarantees Grid matching Screenshot 3 */}
          <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-[#f2f4f6] rounded-xl border border-[#c7c4d8]/50">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#3525cd] text-[24px]">
                local_shipping
              </span>
              <div>
                <p className="text-xs font-bold text-[#191c1e]">Free Shipping</p>
                <p className="text-[11px] text-[#464555]">On orders over $50</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#3525cd] text-[24px]">replay</span>
              <div>
                <p className="text-xs font-bold text-[#191c1e]">30-Day Returns</p>
                <p className="text-[11px] text-[#464555]">No questions asked</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#3525cd] text-[24px]">security</span>
              <div>
                <p className="text-xs font-bold text-[#191c1e]">2 Year Warranty</p>
                <p className="text-[11px] text-[#464555]">Full coverage</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#3525cd] text-[24px]">
                headset_mic
              </span>
              <div>
                <p className="text-xs font-bold text-[#191c1e]">24/7 Support</p>
                <p className="text-[11px] text-[#464555]">Dedicated team</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Overlay Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 text-white text-3xl p-2 hover:bg-white/20 rounded-full"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <img
            src={currentImage}
            alt={product.name}
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </main>
  );
};
