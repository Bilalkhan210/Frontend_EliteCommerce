import React, { useState } from 'react';
import { Customer } from '../types';

interface AdminCustomersViewProps {
  customers: Customer[];
}

export const AdminCustomersView: React.FC<AdminCustomersViewProps> = ({ customers = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = Array.isArray(customers) ? customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1440px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[#191c1e]">Customer Directory</h1>
        <p className="text-xs text-[#464555] mt-0.5">
          Manage customer accounts, purchase histories, and loyalty status.
        </p>
      </div>

      <div className="bg-white border border-[#c7c4d8] rounded-xl p-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#464555] text-sm">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customers..."
            className="w-full pl-9 pr-4 py-2 bg-[#f2f4f6] border border-transparent focus:border-[#3525cd] rounded-lg text-xs transition-colors focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-white border border-[#c7c4d8] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f2f4f6] text-[#464555] text-[10px] font-bold uppercase tracking-wider">
                <th className="p-4">Customer</th>
                <th className="p-4">Email</th>
                <th className="p-4">Orders</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Join Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-xs text-[#191c1e] divide-y divide-[#c7c4d8]/40">
              {filtered.map((c: any) => (
                <tr key={c.id} className="hover:bg-[#f7f9fb] transition-colors">
                  <td className="p-4 font-bold text-[#191c1e]">{c.name}</td>
                  <td className="p-4 text-[#464555]">{c.email}</td>
                  <td className="p-4 font-semibold">{c.ordersCount || 0} orders</td>
                  <td className="p-4 font-bold text-[#3525cd]">
                    ${Number(c.totalSpent || 0).toFixed(2)}
                  </td>
                  <td className="p-4 text-[#464555]">
                    {c.joinDate || new Date(c.created_at).toLocaleDateString() || 'N/A'}
                  </td>
                  <td className="p-4">
                    {(c.status === 'VIP' || c.totalSpent > 1000) && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#dcfce7] text-[#166534]">
                        VIP Member
                      </span>
                    )}
                    {(c.status === 'Active' || !c.status) && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#f3f4f6] text-[#4b5563]">
                        Active
                      </span>
                    )}
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
