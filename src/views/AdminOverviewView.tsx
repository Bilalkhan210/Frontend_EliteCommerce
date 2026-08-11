import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Order, Product, ViewMode } from '../types';

interface AdminOverviewViewProps {
  orders: Order[];
  products: Product[];
  onNavigate: (view: ViewMode) => void;
  onOpenAddProduct: () => void;
}

export const AdminOverviewView: React.FC<AdminOverviewViewProps> = ({
  orders,
  products,
  onNavigate,
  onOpenAddProduct,
}) => {
  // Real Statistics Calculation
  const totalSales = orders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  // Inventory Alerts (Real data from products)
  const lowStockProducts = products.filter(p => p.stockCount <= 5);

  // Mock data for chart (can be refined to be real time based on order dates)
  const chartData = [
    { month: 'Jan', revenue: totalSales * 0.1 },
    { month: 'Feb', revenue: totalSales * 0.2 },
    { month: 'Mar', revenue: totalSales * 0.4 },
    { month: 'Today', revenue: totalSales },
  ];

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-[1440px] mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#191c1e]">Dashboard Overview</h1>
          <p className="text-xs text-[#464555] mt-0.5">Real-time performance metrics.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Sales" value={`$${totalSales.toLocaleString()}`} icon="payments" color="emerald" />
        <StatCard title="Total Orders" value={totalOrders.toString()} icon="shopping_cart" color="blue" />
        <StatCard title="Avg. Order Value" value={`$${avgOrderValue.toFixed(2)}`} icon="receipt_long" color="indigo" />
        <StatCard title="Low Stock Items" value={lowStockProducts.length.toString()} icon="warning" color="red" />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Revenue Chart */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-[#c7c4d8] rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#191c1e] mb-6">Revenue Growth</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#3525cd" fill="#3525cd20" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Alerts Section */}
        <div className="col-span-12 lg:col-span-4 bg-white border border-[#c7c4d8] rounded-xl p-6 shadow-sm overflow-y-auto">
          <h2 className="text-lg font-bold text-[#191c1e] mb-6 flex items-center gap-2">
            <span>Inventory Alerts</span>
            <span className="bg-[#ba1a1a] text-white text-[10px] px-2 py-0.5 rounded-full">{lowStockProducts.length}</span>
          </h2>
          <div className="space-y-4">
            {lowStockProducts.map(p => (
              <div key={p.id} className="p-3 border border-[#c7c4d8] rounded-lg bg-[#f7f9fb] flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-[#191c1e]">{p.name}</h4>
                  <p className="text-[10px] font-bold text-red-600 mt-1">{p.stockCount === 0 ? 'Out of stock' : `Only ${p.stockCount} left`}</p>
                </div>
                <button onClick={onOpenAddProduct} className="text-xs font-bold text-[#3525cd] hover:underline">Restock</button>
              </div>
            ))}
            {lowStockProducts.length === 0 && <p className="text-xs text-gray-400 text-center py-4">All stock levels are healthy.</p>}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white border border-[#c7c4d8] rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#c7c4d8] flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#191c1e]">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f2f4f6] text-[#464555] text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-b border-[#c7c4d8]/40">
                  <td className="p-4 font-bold">{order.customer_name}</td>
                  <td className="p-4 font-bold text-[#3525cd]">${Number(order.total_amount).toFixed(2)}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold uppercase text-[9px]">{order.status || 'Pending'}</span>
                  </td>
                  <td className="p-4 text-gray-500">{new Date(order.created_at || '').toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }: any) => (
  <div className="bg-white border border-[#c7c4d8] rounded-xl p-6 shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xs font-semibold text-[#464555]">{title}</h3>
      <span className={`material-symbols-outlined text-[#3525cd] bg-[#dad7ff]/50 p-2 rounded-lg`}>{icon}</span>
    </div>
    <span className="text-2xl font-extrabold text-[#191c1e]">{value}</span>
  </div>
);
