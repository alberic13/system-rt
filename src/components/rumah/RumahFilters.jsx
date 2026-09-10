import React from 'react';
import { Search, X, List, LayoutGrid } from 'lucide-react';

export default function RumahFilters({
  search,
  setSearch,
  filterHuni,
  setFilterHuni,
  viewMode,
  setViewMode,
  rumahList,
  totalDihuni,
  totalKosong,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
      <div className="relative w-full md:w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Cari blok/no rumah atau nama penghuni..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300/80 text-slate-800 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 text-xs font-bold"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 w-full md:w-auto">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1">Filter:</span>
          {[
            { id: 'All', label: `Semua (${rumahList.length})` },
            { id: 'Dihuni', label: `Dihuni (${totalDihuni})` },
            { id: 'Tidak Dihuni', label: `Kosong (${totalKosong})` },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setFilterHuni(st.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterHuni === st.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
          <button
            onClick={() => setViewMode('table')}
            title="Tampilan Tabel"
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'table'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            title="Tampilan Kartu Grid"
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
