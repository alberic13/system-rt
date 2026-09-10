import React from 'react';
import { History, X, Trash2, Calendar, FileText } from 'lucide-react';

export default function HistoriPenghuniModal({
  showHistoryModal,
  setShowHistoryModal,
  historyHouse,
  historyList,
  handleDeleteHistory,
}) {
  if (!showHistoryModal || !historyHouse) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200/80 rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <History className="w-5 h-5 text-slate-900" />
              Histori Penghuni Unit {historyHouse.nomor_rumah}
            </h2>
            <p className="text-xs text-slate-500">Rekam jejak penghuni tetap & kontrak terdahulu</p>
          </div>
          <button
            onClick={() => setShowHistoryModal(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700">
            Daftar Rekam Jejak ({historyList.length})
          </span>
        </div>

        {historyList.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs italic space-y-1">
            <History className="w-8 h-8 mx-auto text-slate-300" />
            <p>Belum ada catatan riwayat penghuni untuk unit rumah ini.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {historyList.map((item) => {
              const isCurrentActive = !item.tanggal_keluar;
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border text-xs space-y-2 relative transition-all ${
                    isCurrentActive
                      ? 'bg-emerald-50/60 border-emerald-200/80'
                      : 'bg-slate-50 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isCurrentActive ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-white'
                      }`}>
                        {item.penghuni ? item.penghuni.nama_lengkap.charAt(0).toUpperCase() : '?'}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                          <span>{item.penghuni ? item.penghuni.nama_lengkap : 'Penghuni Terhapus'}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border ${
                            isCurrentActive
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-slate-200 text-slate-600 border-slate-300'
                          }`}>
                            {isCurrentActive ? 'Aktif' : 'Terdahulu'}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium">
                          Status Warga: {item.status_penghuni || item.penghuni?.status_penghuni || '-'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteHistory(item.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Hapus Catatan Riwayat"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-200/50 text-slate-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>
                        Huni: <strong className="text-slate-800">{item.tanggal_masuk}</strong> s/d <strong className="text-slate-800">{item.tanggal_keluar || 'Sekarang'}</strong>
                      </span>
                    </div>
                    {item.catatan && (
                      <div className="flex items-center gap-1 col-span-1 sm:col-span-2">
                        <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="italic text-slate-700">{item.catatan}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-right pt-2 border-t border-slate-100">
          <button
            onClick={() => setShowHistoryModal(false)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
