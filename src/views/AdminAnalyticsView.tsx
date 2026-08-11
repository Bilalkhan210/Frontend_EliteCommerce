import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { REVENUE_SALES_DATA } from '../data/mockData';

export const AdminAnalyticsView: React.FC = () => {
  return (
    <div className="p-6 md:p-10 space-y-8 max-w-[1440px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[#191c1e]">Performance Analytics</h1>
        <p className="text-xs text-[#464555] mt-0.5">
          Detailed metrics, conversion breakdown, and growth projections.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Growth Chart */}
        <div className="bg-white border border-[#c7c4d8] rounded-xl p-6 shadow-sm flex flex-col">
          <h3 className="text-base font-bold text-[#191c1e] mb-4">Revenue Growth</h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_SALES_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3525cd" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3525cd" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#464555" fontSize={12} />
                <YAxis stroke="#464555" fontSize={12} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e3e5" />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#3525cd" fill="url(#colorRev)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Volume Chart */}
        <div className="bg-white border border-[#c7c4d8] rounded-xl p-6 shadow-sm flex flex-col">
          <h3 className="text-base font-bold text-[#191c1e] mb-4">Order Volume</h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_SALES_DATA}>
                <XAxis dataKey="month" stroke="#464555" fontSize={12} />
                <YAxis stroke="#464555" fontSize={12} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e3e5" />
                <Tooltip />
                <Bar dataKey="sales" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
