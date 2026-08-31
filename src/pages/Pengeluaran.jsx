import React, { useState, useEffect, useCallback } from 'react';
import {
  Receipt,
  PlusCircle,
  Search,
  Trash2,
  X
} from 'lucide-react';
import { StorageService } from '../services/storage';

const namaBulanList = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export default function Pengeluaran() {
  const [pengeluaranList, setPengeluaranList] = useState([]);
  const [selectedBulan, setSelectedBulan] = useState(new Date().getMonth() + 1);
  const [selectedTahun, setSelectedTahun] = useState(2026);
  const [search, setSearch] = useState('');

  // Modal Input Pengeluaran
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    kategori: 'Gaji Satpam',
    jumlah: '',
    keterangan: '',
    tanggal: new Date().toISOString().split('T')[0],
  });

  const loadData = useCallback(() => {
    const list = StorageService.getPengeluaran(selectedBulan, selectedTahun);
    setPengeluaranList(list);
  }, [selectedBulan, selectedTahun]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOpenModal = () => {
    setFormData({
      kategori: 'Gaji Satpam',
      jumlah: '',
      keterangan: '',
      tanggal: new Date().toISOString().split('T')[0],
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.jumlah || Number(formData.jumlah) <= 0) {
      alert("Mohon masukkan jumlah nominal pengeluaran yang valid!");
      return;
    }

    StorageService.addPengeluaran(formData);
    setShowModal(false);
    loadData();
  };

  const handleDelete = (id, ket) => {
    if (confirm(`Apakah Anda yakin ingin menghapus catatan pengeluaran "${ket}"?`)) {
      StorageService.deletePengeluaran(id);
      loadData();
    }
  };

  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  const filtered = pengeluaranList.filter(e =>
    e.kategori.toLowerCase().includes(search.toLowerCase()) ||
    e.keterangan.toLowerCase().includes(search.toLowerCase())
  );

  const totalPengeluaranBulanIni = filtered.reduce((acc, e) => acc + e.jumlah, 0);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
            <Receipt className="w-7 h-7 text-slate-800" />
            Pencatatan Pengeluaran Kas RT
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-normal">
            Kelola pengeluaran operasional perumahan (Gaji Satpam, Petugas Kebersihan, Listrik, Perbaikan Jalan & Fasilitas).
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-md active:scale-95 shrink-0"
        >
          <PlusCircle className="w-4 h-4" /> Catat Pengeluaran Baru
        </button>
      </div>

      {/* Filter & Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari kategori atau keterangan pengeluaran..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300/80 text-slate-800 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-500">Tahun:</label>
            <select
              value={selectedTahun}
              onChange={(e) => setSelectedTahun(Number(e.target.value))}
              className="bg-slate-50 border border-slate-300/80 text-slate-800 text-xs rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
            >
              <option value={2026}>2026</option>
              <option value={2025}>2025</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-500">Bulan:</label>
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

          <div className="bg-rose-50 text-rose-800 px-3 py-1.5 rounded-xl border border-rose-200/60 text-xs font-bold">
            Total Pengeluaran: {formatRupiah(totalPengeluaranBulanIni)}
          </div>
        </div>
      </div>

      {/* Tabel Pengeluaran */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-sm space-y-2">
            <Receipt className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="font-semibold text-slate-700">Belum ada catatan pengeluaran kas pada periode ini.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 min-w-[650px]">
              <thead className="bg-slate-50 uppercase font-bold text-[11px] text-slate-400 tracking-wider border-b border-slate-200/80">
                <tr>
                  <th className="px-5 py-3.5">Tanggal</th>
                  <th className="px-5 py-3.5">Kategori Pengeluaran</th>
                  <th className="px-5 py-3.5">Keterangan / Rincian</th>
                  <th className="px-5 py-3.5 text-right">Nominal Pengeluaran</th>
                  <th className="px-5 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-4 font-extrabold text-slate-900">
                      {e.tanggal}
                    </td>
                    <td className="px-5 py-4">
                      <span className="bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded-lg border border-slate-200">
                        {e.kategori}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-700">
                      {e.keterangan || '-'}
                    </td>
                    <td className="px-5 py-4 text-right font-extrabold text-rose-600 text-sm">
                      {formatRupiah(e.jumlah)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleDelete(e.id, e.kategori)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Hapus Pengeluaran"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Input Pengeluaran Baru */}
      {showModal && (
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
      )}
    </div>
  );
}
