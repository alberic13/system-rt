import React from 'react';
import { Home, Phone, History } from 'lucide-react';

export default function RumahTable({ filtered, handleOpenAssign, handleOpenHistory }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700 min-w-[650px]">
          <thead className="bg-slate-50 uppercase font-bold text-[11px] text-slate-400 tracking-wider border-b border-slate-200/80">
            <tr>
              <th className="px-5 py-3.5">Unit Rumah</th>
              <th className="px-5 py-3.5">Status Hunian</th>
              <th className="px-5 py-3.5">Penghuni Terdaftar saat ini</th>
              <th className="px-5 py-3.5">Status Warga</th>
              <th className="px-5 py-3.5">No. Telepon / WA</th>
              <th className="px-5 py-3.5 text-right">Aksi Manajemen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-xs shadow-xs ${
                      r.status_huni === 'Dihuni' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}>
                      <Home className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-900 text-sm block leading-tight">
                        {r.nomor_rumah}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">Unit #{r.id}</span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      r.status_huni === 'Dihuni'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                        : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                    }`}
                  >
                    {r.status_huni}
                  </span>
                </td>
                <td className="px-5 py-4 font-extrabold text-slate-900">
                  {r.penghuni ? r.penghuni.nama_lengkap : <span className="text-slate-400 italic font-normal">Tidak Ada Penghuni</span>}
                </td>
                <td className="px-5 py-4 font-semibold text-slate-700">
                  {r.penghuni ? r.penghuni.status_penghuni : '-'}
                </td>
                <td className="px-5 py-4 font-semibold text-slate-700">
                  {r.penghuni ? (
                    <a
                      href={`https://wa.me/${r.penghuni.nomor_telepon.replace(/^0/, '62')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 hover:text-emerald-600 transition-colors"
                    >
                      <Phone className="w-3 h-3 text-emerald-600" />
                      {r.penghuni.nomor_telepon}
                    </a>
                  ) : '-'}
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenAssign(r)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] transition-all shadow-xs active:scale-95"
                    >
                      Atur Penghuni
                    </button>
                    <button
                      onClick={() => handleOpenHistory(r)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] transition-all shadow-xs active:scale-95 flex items-center gap-1"
                    >
                      <History className="w-3.5 h-3.5" /> Riwayat
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
