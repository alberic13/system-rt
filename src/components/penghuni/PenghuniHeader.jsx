import React from 'react';
import { Users, UserPlus } from 'lucide-react';

export default function PenghuniHeader({ onOpenCreate }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
          <Users className="w-7 h-7 text-slate-800" />
          Daftar Penghuni Perumahan
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-normal">
          Kelola data identitas warga, status hunian (Tetap/Kontrak), foto KTP terverifikasi, dan kontak RT.
        </p>
      </div>

      <button
        onClick={onOpenCreate}
        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-md active:scale-95 shrink-0"
      >
        <UserPlus className="w-4 h-4" /> Tambah Penghuni Baru
      </button>
    </div>
  );
}
