import React, { useState } from 'react';

export const AdminSettingsView: React.FC = () => {
  const [storeName, setStoreName] = useState('NexusCommerce Global');
  const [currency, setCurrency] = useState('USD ($)');
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1000px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[#191c1e]">Store Settings</h1>
        <p className="text-xs text-[#464555] mt-0.5">
          Configure platform defaults, currency standards, and notifications.
        </p>
      </div>

      <div className="bg-white border border-[#c7c4d8] rounded-xl p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Store Name
          </label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#3525cd] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Primary Currency
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#3525cd] focus:outline-none bg-white"
          >
            <option value="USD ($)">USD ($)</option>
            <option value="EUR (€)">EUR (€)</option>
            <option value="GBP (£)">GBP (£)</option>
          </select>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <h4 className="text-sm font-semibold text-[#191c1e]">Email Notifications</h4>
            <p className="text-xs text-[#464555]">Receive alerts for new orders and low inventory</p>
          </div>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
            className="w-5 h-5 text-[#3525cd] rounded cursor-pointer"
          />
        </div>

        <div className="pt-4 border-t">
          <button
            onClick={() => alert('Settings saved successfully!')}
            className="bg-[#3525cd] hover:bg-[#4f46e5] text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-md"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
