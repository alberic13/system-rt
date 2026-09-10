import React from 'react';
import { Home, History } from 'lucide-react';

export default function RumahGrid({ filtered, handleOpenAssign, handleOpenHistory }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {filtered.map((r) => {
        const isOccupied = r.status_huni === 'Dihuni';
        return (
          <div
            key={r.id}
            className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                    isOccupied ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}>
                    <Home className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base leading-tight">
                      {r.nomor_rumah}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-bold">Unit #{r.id}</span>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  isOccupied ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                }`}>
                  {r.status_huni}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400 font-medium">Penghuni:</span>
                  <span className="font-bold text-slate-900">
                    {r.penghuni ? r.penghuni.nama_lengkap : 'Kosong'}
                  </span>
                </div>
                {r.penghuni && (
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400 font-medium">Status:</span>
                    <span className="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {r.penghuni.status_penghuni}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => handleOpenAssign(r)}
                className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all text-center"
              >
                Atur
              </button>
              <button
                onClick={() => handleOpenHistory(r)}
                className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center justify-center gap-1"
              >
                <History className="w-3.5 h-3.5" /> Riwayat
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
