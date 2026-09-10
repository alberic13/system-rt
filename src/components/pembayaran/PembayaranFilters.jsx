import React from 'react';
import { Search } from 'lucide-react';
import { formatRupiah, namaBulanList } from '../../utils/formatters';

export default function PembayaranFilters({
  search,
  setSearch,
  selectedTahun,
  setSelectedTahun,
  selectedBulan,
  setSelectedBulan,
  filterJenis,
  setFilterJenis,
  totalLunas,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Cari rumah / penghuni..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300/80 text-slate-800 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500">Tahun:</label>
          <select
            value={selectedTahun}
            onChange={(e) => setSelectedTahun(Number(e.target.value))}
            className="bg-slate-50 border border-slate-300/80 text-slate-800 text-xs rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
          >
            <option value={2026}>2026</option>
            <option value={2025}>2025</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500">Bulan:</label>
          <select
            value={selectedBulan}
            onChange={(e) => setSelectedBulan(Number(e.target.value))}
            className="bg-slate-50 border border-slate-300/80 text-slate-800 text-xs rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
          >
            {namaBulanList.map((m, idx) => (
              <option key={idx + 1} value={idx + 1}>{m}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500">Jenis:</label>
          <select
            value={filterJenis}
            onChange={(e) => setFilterJenis(e.target.value)}
            className="bg-slate-50 border border-slate-300/80 text-slate-800 text-xs rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
          >
            <option value="All">Semua</option>
            <option value="Satpam">Satpam</option>
            <option value="Kebersihan">Kebersihan</option>
          </select>
        </div>

        <div className="bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200/60 text-xs font-bold">
          Total Lunas: {formatRupiah(totalLunas)}
        </div>
      </div>
    </div>
  );
}
