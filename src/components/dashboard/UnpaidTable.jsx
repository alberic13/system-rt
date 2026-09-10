import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle, Check } from 'lucide-react';
import { formatRupiah, namaBulanList } from '../../utils/formatters';

export default function UnpaidTable({
  unpaidList,
  selectedBulan,
  setSelectedBulan,
  tahun,
  totalTunggakanKeseluruhan,
  handleOpenQuickPay
}) {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            Daftar Penagihan & Warga Belum Lunas (Bulan Ini)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            Daftar unit rumah dihuni yang belum melunasi iuran bulanan (Satpam 100k / Kebersihan 15k).
          </p>
        </div>

        <div className="flex items-center gap-3">
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

          <div className="bg-rose-50/80 px-3 py-1.5 rounded-xl border border-rose-200/80 text-rose-700 text-xs font-bold flex items-center gap-1.5">
            <span>{unpaidList.length} Rumah Belum Lunas</span>
            <span className="text-rose-300">|</span>
            <span>Total: {formatRupiah(totalTunggakanKeseluruhan)}</span>
          </div>
        </div>
      </div>

      {unpaidList.length === 0 ? (
        <div className="py-12 text-center bg-emerald-50/50 rounded-2xl border border-emerald-200/60 text-emerald-800 space-y-2">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
          <h3 className="text-sm font-bold">Semua Penghuni Telah Melunasi Iuran Bulan Ini!</h3>
          <p className="text-xs text-emerald-700">
            Tidak ada tunggakan iuran satpam maupun kebersihan untuk bulan {namaBulanList[selectedBulan - 1]} {tahun}.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 min-w-[650px]">
            <thead className="bg-slate-50 uppercase font-bold text-[11px] text-slate-400 tracking-wider border-b border-slate-200/80">
              <tr>
                <th className="px-5 py-3.5">Unit Rumah</th>
                <th className="px-5 py-3.5">Nama Penghuni</th>
                <th className="px-5 py-3.5">Status Penghuni</th>
                <th className="px-5 py-3.5">Jenis Iuran Belum Lunas</th>
                <th className="px-5 py-3.5">Total Nominal Tunggakan</th>
                <th className="px-5 py-3.5">Status Bayar</th>
                <th className="px-5 py-3.5 text-right">Aksi Pelunasan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {unpaidList.map((group) => {
                const hasSatpam = group.jenisList.includes('Satpam');
                const hasKebersihan = group.jenisList.includes('Kebersihan');

                return (
                  <tr key={group.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-4 font-extrabold text-slate-900">
                      {group.rumah?.nomor_rumah}
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-800">
                      {group.penghuni?.nama_lengkap}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          group.penghuni?.status_penghuni === 'Tetap'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                            : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                        }`}
                      >
                        {group.penghuni?.status_penghuni}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {hasSatpam && hasKebersihan ? (
                        <span className="text-slate-800 font-bold bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                          🛡️ Satpam & 🧹 Kebersihan
                        </span>
                      ) : hasSatpam ? (
                        <span className="text-indigo-700 font-bold">🛡️ Satpam (100k)</span>
                      ) : (
                        <span className="text-emerald-700 font-bold">🧹 Kebersihan (15k)</span>
                      )}
                    </td>
                    <td className="px-5 py-4 font-extrabold text-rose-600 text-sm">
                      {formatRupiah(group.totalTunggakan)}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10px] bg-rose-50 text-rose-700 border border-rose-200/60">
                        <XCircle className="w-3.5 h-3.5" /> Belum Lunas
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleOpenQuickPay(group)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-xs active:scale-95"
                      >
                        <Check className="w-3.5 h-3.5" /> Pelunasan Sekarang
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
