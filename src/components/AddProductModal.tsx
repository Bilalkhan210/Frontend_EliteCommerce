import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
  editingProduct?: Product | null;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingProduct,
}) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    brand: 'NexusTech',
    category: 'Electronics',
    price: 0,
    originalPrice: 0,
    sku: '',
    stockCount: 10,
    status: 'Active',
    description: '',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    } else {
      setFormData({
        name: '',
        brand: 'NexusTech',
        category: 'Electronics',
        price: 99.99,
        originalPrice: 129.99,
        sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
        stockCount: 25,
        status: 'Active',
        description: 'Premium quality product designed for modern lifestyles.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      });
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      rating: formData.rating || 4.5,
      reviewsCount: formData.reviewsCount || 12,
      inStock: (formData.stockCount ?? 0) > 0,
      colors: formData.colors || [{ name: 'Default', value: '#1a1a1a' }],
      galleryImages: formData.galleryImages || [formData.image || ''],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 z-10">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h3 className="text-lg font-bold text-[#191c1e]">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-black p-1 rounded-full"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Product Title
              </label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Aura Wireless Earbuds"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#3525cd] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Brand
                </label>
                <select
                  value={formData.brand || 'NexusTech'}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#3525cd] focus:outline-none bg-white"
                >
                  <option value="NexusTech">NexusTech</option>
                  <option value="Auraudio">Auraudio</option>
                  <option value="Vanguard">Vanguard</option>
                  <option value="HomeGoods">HomeGoods</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category || 'Electronics'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#3525cd] focus:outline-none bg-white"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Home & Garden">Home & Garden</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price || 0}
                  onChange={(e) =>
                    setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#3525cd] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Original Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.originalPrice || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      originalPrice: parseFloat(e.target.value) || undefined,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#3525cd] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Stock Count
                </label>
                <input
                  type="number"
                  required
                  value={formData.stockCount || 0}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stockCount: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#3525cd] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  SKU
                </label>
                <input
                  type="text"
                  required
                  value={formData.sku || ''}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#3525cd] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status || 'Active'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as 'Active' | 'Draft' | 'Out of Stock',
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#3525cd] focus:outline-none bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                required
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#3525cd] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#3525cd] focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#3525cd] hover:bg-[#4f46e5] text-white rounded-lg text-sm font-bold shadow-md"
              >
                {editingProduct ? 'Save Changes' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
