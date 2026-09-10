import React from 'react';
import { Receipt, X } from 'lucide-react';

export default function PengeluaranModal({
  showModal,
  setShowModal,
  formData,
  setFormData,
  handleSubmit,
}) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200/80 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-slate-900" />
            Input Pengeluaran Kas RT Baru
          </h2>
          <button onClick={() => setShowModal(false)} className="p-1 rounded-xl text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Kategori Pengeluaran</label>
            <select
              value={formData.kategori}
              onChange={(e) => setFormData(prev => ({ ...prev, kategori: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-300/80 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
            >
              <option value="Gaji Satpam">Gaji Satpam</option>
              <option value="Kebersihan & Sampah">Kebersihan & Sampah</option>
              <option value="Listrik Post & Gapura">Listrik Post & Gapura</option>
              <option value="Perbaikan & Perawatan">Perbaikan & Perawatan</option>
              <option value="Acara & Kegiatan RT">Acara & Kegiatan RT</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Nominal Pengeluaran (Rp) *</label>
            <input
              type="number"
              required
              placeholder="Contoh: 1500000"
              value={formData.jumlah}
              onChange={(e) => setFormData(prev => ({ ...prev, jumlah: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-300/80 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Tanggal Transaksi</label>
            <input
              type="date"
              required
              value={formData.tanggal}
              onChange={(e) => setFormData(prev => ({ ...prev, tanggal: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-300/80 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Keterangan / Catatan Rincian</label>
            <textarea
              rows={3}
              placeholder="Contoh: Pembayaran gaji satpam bulan Agustus..."
              value={formData.keterangan}
              onChange={(e) => setFormData(prev => ({ ...prev, keterangan: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-300/80 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-md active:scale-95"
            >
              Simpan Pengeluaran
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
