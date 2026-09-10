import React from 'react';
import { Building2 } from 'lucide-react';

export default function RumahHeader({ totalDihuni, totalKosong, occupancyPercentage }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
          <Building2 className="w-7 h-7 text-slate-800" />
          Manajemen Unit Rumah & Histori Penghuni
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-normal">
          Daftar 20 unit rumah Perumahan Zalde (Blok A1–A10 & Blok B1–B10), status okupansi, serta rekam jejak penghuni.
        </p>
      </div>

      <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-2xl border border-slate-200/80 shrink-0">
        <div className="px-3 py-1 bg-emerald-50 border border-emerald-200/60 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          {totalDihuni} Dihuni ({occupancyPercentage}%)
        </div>
        <div className="px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-xl text-amber-800 text-xs font-bold">
          {totalKosong} Kosong
        </div>
      </div>
    </div>
  );
}
