import React from 'react';
import { formatRupiah } from '../../utils/formatters';

export default function LaporanMonthlyTable({ monthlySummary }) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4 print:p-0 print:border-none print:shadow-none">
      <h2 className="text-lg font-bold text-slate-900 tracking-tight print:text-black">
        Tabel Ringkasan Saldo Bulanan (1 Tahun)
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700 border-collapse">
          <thead className="bg-slate-50 uppercase font-bold text-[11px] text-slate-400 tracking-wider border-b border-slate-200/80 print:bg-slate-200">
            <tr>
              <th className="px-4 py-3.5">Bulan</th>
              <th className="px-4 py-3.5 text-right">Pemasukan (Iuran)</th>
              <th className="px-4 py-3.5 text-right">Pengeluaran</th>
              <th className="px-4 py-3.5 text-right">Surplus / Defisit</th>
              <th className="px-4 py-3.5 text-right">Akumulasi Saldo Sisa</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 print:divide-slate-300">
            {monthlySummary?.map((m) => (
              <tr key={m.bulanIndex} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-4 py-3 font-extrabold text-slate-900">{m.namaBulan}</td>
                <td className="px-4 py-3 text-right font-bold text-indigo-600">
                  {formatRupiah(m.pemasukan)}
                </td>
                <td className="px-4 py-3 text-right font-bold text-rose-600">
                  {formatRupiah(m.pengeluaran)}
                </td>
                <td className={`px-4 py-3 text-right font-bold ${m.surplusDefisit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {m.surplusDefisit > 0 ? `+${formatRupiah(m.surplusDefisit)}` : formatRupiah(m.surplusDefisit)}
                </td>
                <td className="px-4 py-3 text-right font-extrabold text-slate-900">
                  {formatRupiah(m.saldoSisa)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
