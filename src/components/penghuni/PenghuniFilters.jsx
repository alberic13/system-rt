import React from 'react';
import { Search } from 'lucide-react';

export default function PenghuniFilters({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  penghuniList,
  tetapCount,
  kontrakCount,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Cari nama penghuni atau no. telp..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300/80 text-slate-800 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
        />
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Status:</span>
        {[
          { id: 'All', label: `Semua (${penghuniList.length})` },
          { id: 'Tetap', label: `Tetap (${tetapCount})` },
          { id: 'Kontrak', label: `Kontrak (${kontrakCount})` },
        ].map((st) => (
          <button
            key={st.id}
            onClick={() => setFilterStatus(st.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterStatus === st.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>
    </div>
  );
}
