import React, { useState, useEffect, useCallback } from 'react';
import {
  BarChart3,
  Printer,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { StorageService } from '../services/storage';

const namaBulanList = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export default function Laporan() {
  const [laporanData, setLaporanData] = useState(null);
  const [selectedBulan, setSelectedBulan] = useState(new Date().getMonth() + 1);
  const [selectedTahun, setSelectedTahun] = useState(2026);

  const loadLaporan = useCallback(() => {
    const data = StorageService.getLaporan(selectedTahun, selectedBulan);
    setLaporanData(data);
  }, [selectedTahun, selectedBulan]);

  useEffect(() => {
    loadLaporan();
  }, [loadLaporan]);

  const handlePrint = () => {
    window.print();
  };

  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs print:hidden">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
            <BarChart3 className="w-7 h-7 text-slate-800" />
            Laporan Keuangan & Rekap Kas RT
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-normal">
            Rekapitulasi transparansi kas iuran bulanan warga Perumahan Zalde (Tahun {selectedTahun}).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-500">Tahun:</label>
            <select
              value={selectedTahun}
              onChange={(e) => setSelectedTahun(Number(e.target.value))}
              className="bg-slate-50 border border-slate-300/80 text-slate-800 text-xs rounded-xl px-3 py-2 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
            >
              <option value={2026}>2026</option>
              <option value={2025}>2025</option>
            </select>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-md active:scale-95"
          >
            <Printer className="w-4 h-4" /> Cetak Laporan PDF
          </button>
        </div>
      </div>

      {/* Header Print Title */}
      <div className="hidden print:block text-center border-b border-slate-300 pb-4 mb-6">
        <h1 className="text-2xl font-extrabold uppercase tracking-wide">LAPORAN REKAPITULASI KAS PERUMAHAN ZALDE</h1>
        <p className="text-sm text-slate-600">RT 05 / RW 02 — Tahun Anggaran {selectedTahun}</p>
        <p className="text-xs text-slate-500 mt-1">Dicetak pada: {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 print:grid-cols-3">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Pemasukan Tahunan</span>
          <div className="text-2xl font-extrabold text-indigo-600 mt-2 tracking-tight">
            {formatRupiah(laporanData?.totalPemasukanTahun)}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Pengeluaran Tahunan</span>
          <div className="text-2xl font-extrabold text-rose-600 mt-2 tracking-tight">
            {formatRupiah(laporanData?.totalPengeluaranTahun)}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Saldo Sisa Akhir Kas RT</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-2 tracking-tight">
            {formatRupiah(laporanData?.saldoAkhir)}
          </div>
        </div>
      </div>

      {/* Summary Table 12 Months */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4 print:p-0 print:border-none print:shadow-none">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight print:text-black">
          Tabel Ringkasan Saldo Bulanan (1 Tahun)
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 border-collapse">
            <thead className="bg-slate-50 uppercase font-bold text-[11px] text-slate-400 tracking-wider border-b border-slate-200/80 print:bg-slate-200">
              <tr>
                <th className="px-4 py-3.5">Bulan</th>
                <th className="px-4 py-3.5 text-right">Pemasukan (Iuran)</th>
                <th className="px-4 py-3.5 text-right">Pengeluaran</th>
                <th className="px-4 py-3.5 text-right">Surplus / Defisit</th>
                <th className="px-4 py-3.5 text-right">Akumulasi Saldo Sisa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 print:divide-slate-300">
              {laporanData?.monthlySummary?.map((m) => (
                <tr key={m.bulanIndex} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3 font-extrabold text-slate-900">{m.namaBulan}</td>
                  <td className="px-4 py-3 text-right font-bold text-indigo-600">
                    {formatRupiah(m.pemasukan)}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-rose-600">
                    {formatRupiah(m.pengeluaran)}
                  </td>
                  <td className={`px-4 py-3 text-right font-bold ${m.surplusDefisit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {m.surplusDefisit > 0 ? `+${formatRupiah(m.surplusDefisit)}` : formatRupiah(m.surplusDefisit)}
                  </td>
                  <td className="px-4 py-3 text-right font-extrabold text-slate-900">
                    {formatRupiah(m.saldoSisa)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rincian Bulan Terpilih */}
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

        {/* 2 Grids: Pemasukan & Pengeluaran */}
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
    </div>
  );
}
