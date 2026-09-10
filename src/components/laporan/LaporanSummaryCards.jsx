import React from 'react';
import { formatRupiah } from '../../utils/formatters';

export default function LaporanSummaryCards({ laporanData }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 print:grid-cols-3">
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Pemasukan Tahunan</span>
        <div className="text-2xl font-extrabold text-indigo-600 mt-2 tracking-tight">
          {formatRupiah(laporanData?.totalPemasukanTahun)}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Pengeluaran Tahunan</span>
        <div className="text-2xl font-extrabold text-rose-600 mt-2 tracking-tight">
          {formatRupiah(laporanData?.totalPengeluaranTahun)}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Saldo Sisa Akhir Kas RT</span>
        <div className="text-2xl font-extrabold text-emerald-600 mt-2 tracking-tight">
          {formatRupiah(laporanData?.saldoAkhir)}
        </div>
      </div>
    </div>
  );
}
