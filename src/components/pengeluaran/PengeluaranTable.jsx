import React from 'react';
import { Receipt, Trash2 } from 'lucide-react';
import { formatRupiah } from '../../utils/formatters';

export default function PengeluaranTable({ filtered, handleDelete }) {
  if (filtered.length === 0) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-2xl p-16 text-center text-slate-400 text-sm space-y-2">
        <Receipt className="w-10 h-10 text-slate-300 mx-auto" />
        <p className="font-semibold text-slate-700">Belum ada catatan pengeluaran kas pada periode ini.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700 min-w-[650px]">
          <thead className="bg-slate-50 uppercase font-bold text-[11px] text-slate-400 tracking-wider border-b border-slate-200/80">
            <tr>
              <th className="px-5 py-3.5">Tanggal</th>
              <th className="px-5 py-3.5">Kategori Pengeluaran</th>
              <th className="px-5 py-3.5">Keterangan / Rincian</th>
              <th className="px-5 py-3.5 text-right">Nominal Pengeluaran</th>
              <th className="px-5 py-3.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((e) => (
              <tr key={e.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-5 py-4 font-extrabold text-slate-900">
                  {e.tanggal}
                </td>
                <td className="px-5 py-4">
                  <span className="bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded-lg border border-slate-200">
                    {e.kategori}
                  </span>
                </td>
                <td className="px-5 py-4 font-medium text-slate-700">
                  {e.keterangan || '-'}
                </td>
                <td className="px-5 py-4 text-right font-extrabold text-rose-600 text-sm">
                  {formatRupiah(e.jumlah)}
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() => handleDelete(e.id, e.kategori)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Hapus Pengeluaran"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
