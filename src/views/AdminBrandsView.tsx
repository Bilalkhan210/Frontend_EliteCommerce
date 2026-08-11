import React, { useState } from 'react';
import { Brand } from '../types';

interface AdminBrandsViewProps {
  brands: Brand[];
  onOpenAddBrand: () => void;
  onEditBrand: (brand: Brand) => void;
  onDeleteBrand: (brandId: number) => void;
}

export const AdminBrandsView: React.FC<AdminBrandsViewProps> = ({
  brands,
  onOpenAddBrand,
  onEditBrand,
  onDeleteBrand,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1440px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#191c1e]">Brands Management</h1>
          <p className="text-xs text-[#464555] mt-0.5">
            Manage your product brands and logos.
          </p>
        </div>

        <button
          onClick={onOpenAddBrand}
          className="px-4 py-2.5 bg-[#3525cd] text-white rounded-xl text-xs font-bold hover:bg-[#4f46e5] flex items-center gap-2 shadow-md shadow-[#3525cd]/20 transition-all"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Add Brand
        </button>
      </div>

      <div className="bg-white border border-[#c7c4d8] rounded-xl p-4 shadow-sm">
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#464555] text-sm">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name..."
            className="w-full pl-9 pr-4 py-2 bg-[#f2f4f6] border border-transparent focus:border-[#3525cd] rounded-lg text-xs transition-colors focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-white border border-[#c7c4d8] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f2f4f6] text-[#464555] text-[10px] font-bold uppercase tracking-wider">
                <th className="p-4">Brand Name</th>
                <th className="p-4">Slug</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs text-[#191c1e] divide-y divide-[#c7c4d8]/40">
              {filteredBrands.map((brand) => (
                <tr key={brand.id} className="hover:bg-[#f7f9fb] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {brand.image ? (
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="w-10 h-10 rounded-lg object-cover border border-[#c7c4d8] shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-[#f2f4f6] flex items-center justify-center border border-[#c7c4d8]">
                           <span className="material-symbols-outlined text-gray-400">verified</span>
                        </div>
                      )}
                      <p className="font-bold text-[#191c1e]">{brand.name}</p>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-[#464555]">{brand.slug}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEditBrand(brand)}
                        className="p-1 text-[#464555] hover:text-[#3525cd] hover:bg-[#f2f4f6] rounded"
                      >
                        <span className="material-symbols-outlined text-base">edit</span>
                      </button>
                      <button
                        onClick={() => onDeleteBrand(brand.id)}
                        className="p-1 text-[#464555] hover:text-[#ba1a1a] hover:bg-[#f2f4f6] rounded"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
