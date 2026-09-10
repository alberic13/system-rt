import React from 'react';
import { X } from 'lucide-react';
import { generateKtpSvg } from '../../utils/formatters';

export default function KtpPreviewModal({
  viewKtpModal,
  setViewKtpModal,
  targetKtpData,
}) {
  if (!viewKtpModal || !targetKtpData) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200/80 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">{targetKtpData.nama_lengkap}</h3>
            <p className="text-xs text-slate-500">Status Warga: {targetKtpData.status_penghuni}</p>
          </div>
          <button
            onClick={() => setViewKtpModal(false)}
            className="p-1 rounded-xl text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
          <img
            src={targetKtpData.foto_ktp || generateKtpSvg(targetKtpData.nama_lengkap, '3174091205900001')}
            alt="Foto KTP Warga"
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="text-right pt-2">
          <button
            onClick={() => setViewKtpModal(false)}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
