import React, { useState, useEffect } from 'react';
import { Brand } from '../types';

interface AddBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (brand: Partial<Brand>) => void;
  editingBrand?: Brand | null;
}

export const AddBrandModal: React.FC<AddBrandModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingBrand,
}) => {
  const [formData, setFormData] = useState<Partial<Brand>>({
    name: '',
    image: '',
  });

  useEffect(() => {
    if (editingBrand) {
      setFormData(editingBrand);
    } else {
      setFormData({ name: '', image: '' });
    }
  }, [editingBrand, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 z-10">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h3 className="text-lg font-bold text-[#191c1e]">
              {editingBrand ? 'Edit Brand' : 'Add New Brand'}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-black">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Name</label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#3525cd] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Image URL (Optional)</label>
              <input
                type="text"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
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
                {editingBrand ? 'Save Changes' : 'Create Brand'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
