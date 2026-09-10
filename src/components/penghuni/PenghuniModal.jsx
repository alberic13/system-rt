import React from 'react';
import { UserCheck, X, Upload } from 'lucide-react';

export default function PenghuniModal({
  showModal,
  setShowModal,
  isEdit,
  formData,
  setFormData,
  previewKtp,
  handleFileChange,
  handleSubmit,
}) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200/80 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
            <UserCheck className="w-5 h-5 text-slate-900" />
            {isEdit ? 'Edit Data Penghuni' : 'Tambah Penghuni Baru'}
          </h2>
          <button
            onClick={() => setShowModal(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nama Lengkap *</label>
            <input
              type="text"
              required
              placeholder="Contoh: Budi Santoso"
              value={formData.nama_lengkap}
              onChange={(e) => setFormData(prev => ({ ...prev, nama_lengkap: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-300/80 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Status Penghuni</label>
              <select
                value={formData.status_penghuni}
                onChange={(e) => setFormData(prev => ({ ...prev, status_penghuni: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-300/80 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
              >
                <option value="Tetap">Tetap</option>
                <option value="Kontrak">Kontrak</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Status Pernikahan</label>
              <select
                value={formData.status_pernikahan}
                onChange={(e) => setFormData(prev => ({ ...prev, status_pernikahan: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-300/80 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
              >
                <option value="Sudah Menikah">Sudah Menikah</option>
                <option value="Belum Menikah">Belum Menikah</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Nomor Telepon / WhatsApp *</label>
            <input
              type="text"
              required
              placeholder="Contoh: 081234567890"
              value={formData.nomor_telepon}
              onChange={(e) => setFormData(prev => ({ ...prev, nomor_telepon: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-300/80 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Foto KTP (Opsional / Simulasi)</label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center space-y-3 bg-slate-50/50">
              {previewKtp && (
                <div className="max-w-[260px] mx-auto rounded-xl overflow-hidden border border-slate-300 shadow-xs">
                  <img src={previewKtp} alt="KTP Preview" className="w-full h-auto object-cover" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="ktp-upload-input"
              />
              <label
                htmlFor="ktp-upload-input"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs cursor-pointer hover:bg-slate-800 transition-all shadow-xs"
              >
                <Upload className="w-3.5 h-3.5" /> Pilih File Foto KTP
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md active:scale-95"
            >
              {isEdit ? 'Simpan Perubahan' : 'Tambah Penghuni'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
