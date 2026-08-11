import React, { useState } from 'react';
import { Order } from '../types';

interface AdminOrdersViewProps {
  orders: Order[];
}

export const AdminOrdersView: React.FC<AdminOrdersViewProps> = ({ orders }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter((o) =>
    o.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1440px] mx-auto">
      <h1 className="text-2xl font-bold text-[#191c1e]">Orders Console</h1>
      <div className="bg-white border border-[#c7c4d8] rounded-xl p-4 shadow-sm">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by customer name..."
          className="w-full sm:w-80 pl-4 pr-4 py-2 bg-[#f2f4f6] border border-transparent focus:border-[#3525cd] rounded-lg text-xs outline-none"
        />
      </div>
      <div className="bg-white border border-[#c7c4d8] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f2f4f6] text-[#464555] text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="text-xs text-[#191c1e] divide-y divide-[#c7c4d8]/40">
              {filteredOrders.map((ord) => (
                <tr key={ord.id}>
                  <td className="p-4 font-bold text-[#3525cd]">#ORD-{ord.id}</td>
                  <td className="p-4 font-semibold">{ord.customer_name}</td>
                  <td className="p-4 font-bold">${Number(ord.total_amount).toFixed(2)}</td>
                  <td className="p-4 uppercase text-[10px] font-bold text-gray-500">{ord.payment_method}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold uppercase text-[9px]">
                      {ord.status || 'Processing'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500">{new Date(ord.created_at || '').toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
