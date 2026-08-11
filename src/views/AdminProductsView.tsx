import React, { useState } from 'react';
import { Product } from '../types';

interface AdminProductsViewProps {
  products: Product[];
  onOpenAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export const AdminProductsView: React.FC<AdminProductsViewProps> = ({
  products,
  onOpenAddProduct,
  onEditProduct,
  onDeleteProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProductIds(filteredProducts.map((p) => p.id));
    } else {
      setSelectedProductIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedProductIds.includes(id)) {
      setSelectedProductIds(selectedProductIds.filter((pId) => pId !== id));
    } else {
      setSelectedProductIds([...selectedProductIds, id]);
    }
  };

  const filteredProducts = products.filter((p) => {
    if (
      searchTerm &&
      !p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (selectedStatus !== 'All' && p.status !== selectedStatus) return false;
    return true;
  });

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Name,SKU,Category,Price,Stock,Status\n' +
      filteredProducts
        .map(
          (p) => `"${p.name}","${p.sku}","${p.category}",${p.price},${p.stockCount},"${p.status}"`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'products_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1440px] mx-auto">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#191c1e]">Products Management</h1>
          <p className="text-xs text-[#464555] mt-0.5">
            Manage your store inventory, pricing, and product status.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-white border border-[#c7c4d8] rounded-xl text-xs font-bold text-[#191c1e] hover:bg-[#f2f4f6] flex items-center gap-2 shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-base">download</span>
            Export CSV
          </button>
          <button
            onClick={onOpenAddProduct}
            className="px-4 py-2.5 bg-[#3525cd] text-white rounded-xl text-xs font-bold hover:bg-[#4f46e5] flex items-center gap-2 shadow-md shadow-[#3525cd]/20 transition-all"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Add Product
          </button>
        </div>
      </div>

      {/* Filters & Search Row matching Screenshot 5 */}
      <div className="bg-white border border-[#c7c4d8] rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#464555] text-sm">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or SKU..."
            className="w-full pl-9 pr-4 py-2 bg-[#f2f4f6] border border-transparent focus:border-[#3525cd] rounded-lg text-xs transition-colors focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#f2f4f6] border border-transparent text-[#191c1e] text-xs font-semibold rounded-lg px-3 py-2 cursor-pointer focus:border-[#3525cd] focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home & Garden">Home & Garden</option>
            <option value="Sports">Sports</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#f2f4f6] border border-transparent text-[#191c1e] text-xs font-semibold rounded-lg px-3 py-2 cursor-pointer focus:border-[#3525cd] focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Products Table matching Screenshot 5 */}
      <div className="bg-white border border-[#c7c4d8] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f2f4f6] text-[#464555] text-[10px] font-bold uppercase tracking-wider">
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      selectedProductIds.length > 0 &&
                      selectedProductIds.length === filteredProducts.length
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-[#3525cd] bg-white border-[#c7c4d8] rounded focus:ring-[#3525cd]"
                  />
                </th>
                <th className="p-4">Product</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs text-[#191c1e] divide-y divide-[#c7c4d8]/40">
              {filteredProducts.map((product) => {
                const isChecked = selectedProductIds.includes(product.id);
                return (
                  <tr
                    key={product.id}
                    className={`hover:bg-[#f7f9fb] transition-colors ${
                      isChecked ? 'bg-[#3525cd]/5' : ''
                    }`}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleSelectOne(product.id)}
                        className="w-4 h-4 text-[#3525cd] bg-white border-[#c7c4d8] rounded focus:ring-[#3525cd]"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover border border-[#c7c4d8] shrink-0"
                        />
                        <div>
                          <p className="font-bold text-[#191c1e]">{product.name}</p>
                          <p className="text-[10px] text-[#464555]">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-[#464555]">{product.sku}</td>
                    <td className="p-4 font-semibold text-[#464555]">{product.category}</td>
                    <td className="p-4 font-bold text-[#191c1e]">${product.price.toFixed(2)}</td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 w-28">
                        <div className="flex justify-between text-[10px] font-semibold">
                          <span>{product.stockCount} units</span>
                        </div>
                        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              product.stockCount > 20
                                ? 'bg-emerald-500'
                                : product.stockCount > 0
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                            }`}
                            style={{
                              width: `${Math.min(100, (product.stockCount / 100) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {product.status === 'Active' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#dcfce7] text-[#166534]">
                          Active
                        </span>
                      )}
                      {product.status === 'Draft' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#f3f4f6] text-[#4b5563]">
                          Draft
                        </span>
                      )}
                      {product.status === 'Out of Stock' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#ffdad6] text-[#93000a]">
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEditProduct(product)}
                          title="Edit Product"
                          className="p-1 text-[#464555] hover:text-[#3525cd] hover:bg-[#f2f4f6] rounded"
                        >
                          <span className="material-symbols-outlined text-base">edit</span>
                        </button>
                        <button
                          onClick={() => onDeleteProduct(product.id)}
                          title="Delete Product"
                          className="p-1 text-[#464555] hover:text-[#ba1a1a] hover:bg-[#f2f4f6] rounded"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
