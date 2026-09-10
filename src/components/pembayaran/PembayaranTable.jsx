import React from 'react';
import { CreditCard, CheckCircle2, XCircle } from 'lucide-react';
import { formatRupiah, namaBulanList } from '../../utils/formatters';

export default function PembayaranTable({ filtered, handleQuickMarkPay }) {
  if (filtered.length === 0) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-2xl p-16 text-center text-slate-400 text-sm space-y-2">
        <CreditCard className="w-10 h-10 text-slate-300 mx-auto" />
        <p className="font-semibold text-slate-700">Tidak ada catatan transaksi iuran pada periode ini.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700 min-w-[700px]">
          <thead className="bg-slate-50 uppercase font-bold text-[11px] text-slate-400 tracking-wider border-b border-slate-200/80">
            <tr>
              <th className="px-5 py-3.5">Unit Rumah & Warga</th>
              <th className="px-5 py-3.5">Jenis Iuran</th>
              <th className="px-5 py-3.5">Periode Tagihan</th>
              <th className="px-5 py-3.5">Nominal Tarif</th>
              <th className="px-5 py-3.5">Tanggal Bayar</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-5 py-4">
                  <span className="font-extrabold text-slate-900 text-sm block leading-tight">
                    {p.rumah?.nomor_rumah}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {p.penghuni?.nama_lengkap} ({p.penghuni?.status_penghuni})
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                    p.jenis_iuran === 'Satpam' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60' : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                  }`}>
                    {p.jenis_iuran === 'Satpam' ? '🛡️ Satpam' : '🧹 Kebersihan'}
                  </span>
                </td>
                <td className="px-5 py-4 font-semibold text-slate-800">
                  {namaBulanList[p.bulan - 1]} {p.tahun}
                </td>
                <td className="px-5 py-4 font-extrabold text-slate-900 text-sm">
                  {formatRupiah(p.jumlah)}
                </td>
                <td className="px-5 py-4 text-slate-500 font-medium">
                  {p.tanggal_bayar || '-'}
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10px] ${
                    p.status === 'Lunas' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-rose-50 text-rose-700 border border-rose-200/60'
                  }`}>
                    {p.status === 'Lunas' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {p.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  {p.status === 'Belum Lunas' ? (
                    <button
                      onClick={() => handleQuickMarkPay(p)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] transition-all shadow-xs active:scale-95"
                    >
                      Tandai Lunas
                    </button>
                  ) : (
                    <span className="text-[11px] text-emerald-600 font-bold">✓ Lunas</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
