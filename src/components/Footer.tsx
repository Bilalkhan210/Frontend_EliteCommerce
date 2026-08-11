import React from 'react';
import { ViewMode } from '../types';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#f2f4f6] mt-16 border-t border-[#c7c4d8]/30">
      <div className="w-full py-12 px-6 md:px-10 max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <span className="text-[20px] font-bold text-[#191c1e]">EliteCommerce</span>
          <p className="text-[14px] text-[#464555] leading-relaxed">
            Elevating your shopping experience with curated premium goods, innovative technology, and exceptional customer service.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-[14px] font-semibold text-[#191c1e] mb-1">Company</h4>
          <button onClick={() => onNavigate('shop')} className="text-left text-[14px] text-[#464555] hover:text-[#3525cd] transition-colors">About Us</button>
          <button onClick={() => onNavigate('shop')} className="text-left text-[14px] text-[#464555] hover:text-[#3525cd] transition-colors">Contact Support</button>
          <button onClick={() => onNavigate('shop')} className="text-left text-[14px] text-[#464555] hover:text-[#3525cd] transition-colors">Careers</button>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-[14px] font-semibold text-[#191c1e] mb-1">Legal & Support</h4>
          <button onClick={() => onNavigate('shop')} className="text-left text-[14px] text-[#464555] hover:text-[#3525cd] transition-colors">Privacy Policy</button>
          <button onClick={() => onNavigate('shop')} className="text-left text-[14px] text-[#464555] hover:text-[#3525cd] transition-colors">Terms of Service</button>
          <button onClick={() => onNavigate('shop')} className="text-left text-[14px] text-[#464555] hover:text-[#3525cd] transition-colors">Shipping & Returns</button>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-[14px] font-semibold text-[#191c1e]">Stay Updated</h4>
          <p className="text-[12px] text-[#464555]">Subscribe to get special offers and new collection releases.</p>
          <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }} className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full bg-white border border-[#c7c4d8] rounded-l-lg py-2 px-3 text-[14px] focus:outline-none focus:border-[#3525cd]"
            />
            <button
              type="submit"
              className="bg-[#4f46e5] text-white px-4 py-2 rounded-r-lg text-[12px] font-semibold hover:bg-[#3525cd] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="w-full px-6 md:px-10 max-w-[1280px] mx-auto py-4 border-t border-[#c7c4d8]/20 text-center">
        <p className="text-[12px] text-[#464555]">© 2026 EliteCommerce Global. All rights reserved.</p>
      </div>
    </footer>
  );
};
