import React from 'react';
import { TrendingUp } from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { formatRupiah } from '../../utils/formatters';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-slate-700/60 space-y-2 text-xs min-w-[210px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <p className="font-extrabold text-white text-sm">{label}</p>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Kas RT</span>
        </div>
        <div className="space-y-1.5 pt-0.5">
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                <span className="text-slate-300 font-medium">{entry.name}:</span>
              </div>
              <span className="font-extrabold" style={{ color: entry.color }}>
                {formatRupiah(entry.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function FinanceTrendChart({ tahun, setTahun, laporanData }) {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            Grafik Tren Keuangan Bulanan ({tahun})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            Visualisasi kontinyu Pemasukan (Iuran), Pengeluaran, dan Akumulasi Saldo Sisa.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500">Tahun:</label>
          <select
            value={tahun}
            onChange={(e) => setTahun(Number(e.target.value))}
            className="bg-slate-50 border border-slate-300/80 text-slate-800 text-xs rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
          >
            <option value={2026}>2026</option>
            <option value={2025}>2025</option>
          </select>
        </div>
      </div>

      <div className="h-72 sm:h-80 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            key={`chart-${tahun}-${laporanData?.monthlySummary?.length || 0}`}
            data={laporanData?.monthlySummary || []}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="saldoAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.30} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.01} />
              </linearGradient>

              <linearGradient id="pemasukanAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.20} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.01} />
              </linearGradient>

              <linearGradient id="pengeluaranAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.20} />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.01} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="namaBulan"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={10}
              tickFormatter={(v) => `Rp ${(v / 1000).toLocaleString('id-ID')}k`}
              tickLine={false}
              axisLine={false}
            />
            
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 600 }}
              iconType="circle"
            />

            <Area
              type="monotone"
              dataKey="pemasukan"
              name="Pemasukan (Iuran)"
              fill="url(#pemasukanAreaGradient)"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ fill: '#6366f1', r: 4, stroke: '#ffffff', strokeWidth: 2 }}
              activeDot={{ r: 7, fill: '#6366f1', stroke: '#ffffff', strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={2200}
              animationEasing="ease-in-out"
              animationBegin={200}
            />

            <Area
              type="monotone"
              dataKey="pengeluaran"
              name="Pengeluaran"
              fill="url(#pengeluaranAreaGradient)"
              stroke="#f43f5e"
              strokeWidth={3}
              dot={{ fill: '#f43f5e', r: 4, stroke: '#ffffff', strokeWidth: 2 }}
              activeDot={{ r: 7, fill: '#f43f5e', stroke: '#ffffff', strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={2400}
              animationEasing="ease-in-out"
              animationBegin={350}
            />

            <Area
              type="monotone"
              dataKey="saldoSisa"
              name="Akumulasi Saldo Sisa"
              fill="url(#saldoAreaGradient)"
              stroke="#10b981"
              strokeWidth={3.5}
              dot={{ fill: '#10b981', r: 4.5, stroke: '#ffffff', strokeWidth: 2 }}
              activeDot={{ r: 8, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={2600}
              animationEasing="ease-in-out"
              animationBegin={500}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
