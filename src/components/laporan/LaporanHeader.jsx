import React from 'react';
import { BarChart3, Printer } from 'lucide-react';

export default function LaporanHeader({ selectedTahun, setSelectedTahun, handlePrint }) {
  return (
    <>
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

      <div className="hidden print:block text-center border-b border-slate-300 pb-4 mb-6">
        <h1 className="text-2xl font-extrabold uppercase tracking-wide">LAPORAN REKAPITULASI KAS PERUMAHAN ZALDE</h1>
        <p className="text-sm text-slate-600">RT 05 / RW 02 — Tahun Anggaran {selectedTahun}</p>
        <p className="text-xs text-slate-500 mt-1">Dicetak pada: {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
      </div>
    </>
  );
}
