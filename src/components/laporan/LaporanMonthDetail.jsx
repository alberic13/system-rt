import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatRupiah, namaBulanList } from '../../utils/formatters';

export default function LaporanMonthDetail({
  laporanData,
  selectedBulan,
  setSelectedBulan,
  selectedTahun,
}) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-6 print:break-before-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 print:border-slate-300">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Rincian Kas Bulan {namaBulanList[selectedBulan - 1]} {selectedTahun}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            Daftar transaksi lunas pemasukan iuran & rincian pengeluaran kas RT.
          </p>
        </div>

        <div className="flex items-center gap-2 print:hidden">
          <label className="text-xs font-semibold text-slate-500">Pilih Bulan:</label>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Table Pemasukan */}
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <span className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
              <ArrowUpRight className="w-4 h-4 text-indigo-600" /> Pemasukan (Iuran Lunas)
            </span>
            <span className="text-xs font-extrabold text-indigo-600">
              {formatRupiah(laporanData?.detailBulan?.totalPemasukan)}
            </span>
          </div>

          {laporanData?.detailBulan?.listPemasukan.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-4 text-center">Belum ada pemasukan lunas pada bulan ini.</p>
          ) : (
            <div className="max-h-80 overflow-y-auto border border-slate-200/80 rounded-xl">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 uppercase font-bold text-[10px] text-slate-400 sticky top-0">
                  <tr>
                    <th className="p-2.5">Rumah / Warga</th>
                    <th className="p-2.5">Jenis</th>
                    <th className="p-2.5 text-right">Nominal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {laporanData?.detailBulan?.listPemasukan.map((p) => (
                    <tr key={p.id}>
                      <td className="p-2.5">
                        <span className="font-extrabold text-slate-900">{p.rumah?.nomor_rumah}</span>
                        <span className="block text-[10px] text-slate-500">{p.penghuni?.nama_lengkap}</span>
                      </td>
                      <td className="p-2.5 font-semibold text-slate-700">{p.jenis_iuran}</td>
                      <td className="p-2.5 text-right font-bold text-indigo-600">{formatRupiah(p.jumlah)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Table Pengeluaran */}
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-rose-50/80 p-3.5 rounded-xl border border-rose-200/80">
            <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
              <ArrowDownRight className="w-4 h-4 text-rose-600" /> Pengeluaran Kas
            </span>
            <span className="text-xs font-extrabold text-rose-700">
              {formatRupiah(laporanData?.detailBulan?.totalPengeluaran)}
            </span>
          </div>

          {laporanData?.detailBulan?.listPengeluaran.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-4 text-center">Belum ada pengeluaran kas pada bulan ini.</p>
          ) : (
            <div className="max-h-80 overflow-y-auto border border-slate-200/80 rounded-xl">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 uppercase font-bold text-[10px] text-slate-400 sticky top-0">
                  <tr>
                    <th className="p-2.5">Kategori / Ket</th>
                    <th className="p-2.5 text-right">Nominal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {laporanData?.detailBulan?.listPengeluaran.map((e) => (
                    <tr key={e.id}>
                      <td className="p-2.5">
                        <span className="font-extrabold text-slate-900">{e.kategori}</span>
                        <span className="block text-[10px] text-slate-500">{e.keterangan}</span>
                      </td>
                      <td className="p-2.5 text-right font-bold text-rose-600">{formatRupiah(e.jumlah)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
