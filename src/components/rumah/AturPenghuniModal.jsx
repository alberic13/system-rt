import React from 'react';
import { Edit3, X, Info } from 'lucide-react';

export default function AturPenghuniModal({
  showAssignModal,
  setShowAssignModal,
  targetRumah,
  statusHuniForm,
  setStatusHuniForm,
  selectedPenghuniId,
  setSelectedPenghuniId,
  catatanRiwayatForm,
  setCatatanRiwayatForm,
  penghuniList,
  handleSaveAssign,
}) {
  if (!showAssignModal || !targetRumah) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200/80 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-slate-900" />
            Atur Penghuni Unit {targetRumah.nomor_rumah}
          </h2>
          <button
            onClick={() => setShowAssignModal(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveAssign} className="space-y-4 text-xs">
          <div>
            <label htmlFor="select-status-huni" className="block font-bold text-slate-700 mb-1">
              Status Okupansi Rumah
            </label>
            <select
              id="select-status-huni"
              value={statusHuniForm}
              onChange={(e) => setStatusHuniForm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300/80 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
            >
              <option value="Dihuni">Dihuni</option>
              <option value="Tidak Dihuni">Tidak Dihuni (Kosong)</option>
            </select>
          </div>

          {statusHuniForm === 'Dihuni' && (
            <div>
              <label htmlFor="select-penghuni" className="block font-bold text-slate-700 mb-1">
                Pilih Penghuni Terdaftar *
              </label>
              <select
                id="select-penghuni"
                required
                value={selectedPenghuniId}
                onChange={(e) => setSelectedPenghuniId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300/80 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
              >
                <option value="">-- Pilih Warga / Penghuni --</option>
                {penghuniList.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.nama_lengkap} ({p.status_penghuni})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="input-catatan-riwayat" className="block font-bold text-slate-700 mb-1">
              Catatan Riwayat / Keterangan (Opsional)
            </label>
            <input
              id="input-catatan-riwayat"
              type="text"
              placeholder="Contoh: Perpanjangan masa sewa, Kontrak 1 tahun..."
              value={catatanRiwayatForm}
              onChange={(e) => setCatatanRiwayatForm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300/80 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
            />
          </div>

          <div className="p-3 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-blue-800 text-[11px] flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              Perubahan penghuni akan otomatis mencatat tanggal pergantian di modul <strong>Riwayat Penghuni</strong> dan memicu pembuatan tagihan iuran bulanan.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowAssignModal(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md active:scale-95"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
