import React from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Building2,
  ArrowUpRight
} from 'lucide-react';
import { formatRupiah } from '../../utils/formatters';

export default function StatCards({ laporanData, tahun, rumahDihuniCount, rumahKosongCount }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {/* Card 1: Saldo Sisa */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Saldo Sisa Saat Ini</span>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/60">
            <Wallet className="w-4.5 h-4.5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {formatRupiah(laporanData?.saldoAkhir)}
          </div>
          <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" /> Akumulasi Surplus Kas RT
          </p>
        </div>
      </div>

      {/* Card 2: Total Pemasukan */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Pemasukan ({tahun})</span>
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200/60">
            <TrendingUp className="w-4.5 h-4.5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-extrabold text-indigo-600 tracking-tight">
            {formatRupiah(laporanData?.totalPemasukanTahun)}
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">Iuran Satpam & Kebersihan</p>
        </div>
      </div>

      {/* Card 3: Total Pengeluaran */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Pengeluaran ({tahun})</span>
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200/60">
            <TrendingDown className="w-4.5 h-4.5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-extrabold text-rose-600 tracking-tight">
            {formatRupiah(laporanData?.totalPengeluaranTahun)}
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">Gaji Satpam, Listrik, Perbaikan</p>
        </div>
      </div>

      {/* Card 4: Status Hunian Rumah */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hunian 20 Rumah</span>
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200/60">
            <Building2 className="w-4.5 h-4.5" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-slate-900 tracking-tight">{rumahDihuniCount}</span>
          <span className="text-xs text-emerald-600 font-bold">Dihuni</span>
          <span className="text-slate-300">/</span>
          <span className="text-xs text-amber-600 font-bold">{rumahKosongCount} Kosong</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden flex">
          <div
            className="bg-emerald-500 h-full transition-all duration-500"
            style={{ width: `${(rumahDihuniCount / 20) * 100}%` }}
          />
          <div
            className="bg-amber-500 h-full transition-all duration-500"
            style={{ width: `${(rumahKosongCount / 20) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
