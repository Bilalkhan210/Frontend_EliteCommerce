import React from 'react';
import { ViewMode } from '../types';

interface AdminHeaderProps {
  onNavigate: (view: ViewMode) => void;
  onLogout?: () => void;
  onMenuClick?: () => void;
  title?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onNavigate,
  onLogout,
  onMenuClick,
  title = 'Dashboard'
}) => {
  return (
    <header className="sticky top-0 z-30 flex justify-between items-center w-full px-4 md:px-6 h-16 bg-white border-b border-[#c7c4d8]">
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-[#464555] hover:bg-[#f2f4f6] rounded-lg"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <h2 className="text-sm md:text-lg font-bold text-[#191c1e] truncate max-w-[120px] xs:max-w-none">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-1 md:gap-3">
        <button className="hidden xs:flex text-[#464555] hover:bg-[#f2f4f6] p-2 rounded-full relative">
          <span className="material-symbols-outlined text-lg">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full" />
        </button>

        <div className="hidden sm:block w-px h-5 bg-[#c7c4d8] mx-1" />

        <button
          onClick={onLogout || (() => onNavigate('auth'))}
          title="Logout"
          className="text-[#464555] hover:text-[#ba1a1a] hover:bg-[#f2f4f6] p-2 rounded-full"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
        </button>

        <div className="w-8 h-8 rounded-full bg-[#f2f4f6] border border-[#c7c4d8] flex items-center justify-center overflow-hidden">
           <span className="material-symbols-outlined text-gray-400">person</span>
        </div>
      </div>
    </header>
  );
};
