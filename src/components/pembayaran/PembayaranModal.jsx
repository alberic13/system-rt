import React from 'react';
import { CreditCard, X } from 'lucide-react';
import { namaBulanList } from '../../utils/formatters';

export default function PembayaranModal({
  showModal,
  setShowModal,
  formData,
  setFormData,
  rumahList,
  handleSubmitPay,
}) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200/80 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-slate-900" />
            Input Pembayaran Iuran Warga
          </h2>
          <button onClick={() => setShowModal(false)} className="p-1 rounded-xl text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitPay} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Pilih Unit Rumah (Penghuni)</label>
            <select
              required
              value={formData.rumah_id}
              onChange={(e) => setFormData(prev => ({ ...prev, rumah_id: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-300/80 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
            >
              <option value="">-- Pilih Unit Rumah --</option>
              {rumahList.filter(r => r.status_huni === 'Dihuni').map(r => (
                <option key={r.id} value={r.id}>
                  {r.nomor_rumah} - {r.penghuni?.nama_lengkap} ({r.penghuni?.status_penghuni})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Jenis Iuran</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, jenis_iuran: 'Satpam' }))}
                className={`p-3 rounded-xl border text-center font-bold transition-all ${
                  formData.jenis_iuran === 'Satpam' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                🛡️ Satpam (100k)
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, jenis_iuran: 'Kebersihan' }))}
                className={`p-3 rounded-xl border text-center font-bold transition-all ${
                  formData.jenis_iuran === 'Kebersihan' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                🧹 Kebersihan (15k)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Mulai Bulan</label>
              <select
                value={formData.bulan_mulai}
                onChange={(e) => setFormData(prev => ({ ...prev, bulan_mulai: Number(e.target.value) }))}
                className="w-full bg-slate-50 border border-slate-300/80 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
              >
                {namaBulanList.map((m, idx) => (
                  <option key={idx + 1} value={idx + 1}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Durasi Bayar</label>
              <select
                value={formData.durasi_bulan}
                onChange={(e) => setFormData(prev => ({ ...prev, durasi_bulan: Number(e.target.value) }))}
                className="w-full bg-slate-50 border border-slate-300/80 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
              >
                <option value={1}>1 Bulan</option>
                <option value={2}>2 Bulan</option>
                <option value={3}>3 Bulan (Triwulan)</option>
                <option value={6}>6 Bulan (Semester)</option>
                <option value={12}>12 Bulan (1 Tahun Full)</option>
              </select>
            </div>
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
              Simpan Pembayaran
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
