import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { formatRupiah, namaBulanList } from '../../utils/formatters';

export default function QuickPayModal({
  payModal,
  setPayModal,
  targetPayGroup,
  handleConfirmQuickPay
}) {
  if (!payModal || !targetPayGroup) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200/80 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Konfirmasi Pelunasan Iuran
          </h2>
          <button
            onClick={() => setPayModal(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">Unit Rumah:</span>
            <span className="font-extrabold text-slate-900">{targetPayGroup.rumah?.nomor_rumah}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Nama Penghuni:</span>
            <span className="font-bold text-slate-800">{targetPayGroup.penghuni?.nama_lengkap} ({targetPayGroup.penghuni?.status_penghuni})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Tagihan Iuran:</span>
            <span className="font-semibold text-slate-800">
              {targetPayGroup.jenisList.join(' & ')} ({namaBulanList[targetPayGroup.bulan - 1]} {targetPayGroup.tahun})
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-200/80 text-sm">
            <span className="font-bold text-slate-700">Total Nominal Lunas:</span>
            <span className="font-extrabold text-emerald-600">{formatRupiah(targetPayGroup.totalTunggakan)}</span>
          </div>
        </div>

        <form onSubmit={handleConfirmQuickPay} className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setPayModal(false)}
            className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md active:scale-95"
          >
            Proses Pelunasan ({formatRupiah(targetPayGroup.totalTunggakan)})
          </button>
        </form>
      </div>
    </div>
  );
}
