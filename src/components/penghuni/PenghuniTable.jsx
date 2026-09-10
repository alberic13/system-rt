import React from 'react';
import { Users, Phone, Eye, Edit3, Trash2 } from 'lucide-react';

export default function PenghuniTable({
  filtered,
  handleOpenViewKtp,
  handleOpenEdit,
  handleDelete,
}) {
  if (filtered.length === 0) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-2xl p-16 text-center text-slate-500 text-sm space-y-2">
        <Users className="w-10 h-10 text-slate-300 mx-auto" />
        <p className="font-semibold text-slate-700">Tidak ada data penghuni ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700 min-w-[650px]">
          <thead className="bg-slate-50 uppercase font-bold text-[11px] text-slate-400 tracking-wider border-b border-slate-200/80">
            <tr>
              <th className="px-5 py-3.5">Nama Penghuni</th>
              <th className="px-5 py-3.5">Status Huni</th>
              <th className="px-5 py-3.5">Status Pernikahan</th>
              <th className="px-5 py-3.5">No. Telepon / WA</th>
              <th className="px-5 py-3.5">Unit Rumah Terdaftar</th>
              <th className="px-5 py-3.5">KTP</th>
              <th className="px-5 py-3.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0">
                      {p.nama_lengkap.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-900 text-sm block leading-tight">
                        {p.nama_lengkap}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">ID: #{p.id}</span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      p.status_penghuni === 'Tetap'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                        : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                    }`}
                  >
                    {p.status_penghuni}
                  </span>
                </td>
                <td className="px-5 py-4 font-semibold text-slate-700">
                  {p.status_pernikahan}
                </td>
                <td className="px-5 py-4">
                  <a
                    href={`https://wa.me/${p.nomor_telepon.replace(/^0/, '62')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-800 font-semibold hover:text-emerald-600 transition-colors bg-slate-100 hover:bg-emerald-50 px-2.5 py-1 rounded-lg border border-slate-200/60"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    {p.nomor_telepon}
                  </a>
                </td>
                <td className="px-5 py-4">
                  {p.rumah && p.rumah.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {p.rumah.map(r => (
                        <span key={r.id} className="bg-slate-900 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                          {r.nomor_rumah}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-400 italic text-[11px]">Belum diisi</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => handleOpenViewKtp(p)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 hover:text-slate-950 underline"
                  >
                    <Eye className="w-3.5 h-3.5" /> Lihat KTP
                  </button>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                      title="Edit Penghuni"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.nama_lengkap)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Hapus Penghuni"
                    >
                      <Trash2 className="w-4 h-4" />
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
