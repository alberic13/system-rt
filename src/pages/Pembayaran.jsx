import React, { useState, useEffect, useCallback } from 'react';
import {
  CreditCard,
  PlusCircle,
  Search,
  CheckCircle2,
  XCircle,
  X
} from 'lucide-react';
import { StorageService } from '../services/storage';

const namaBulanList = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export default function Pembayaran() {
  const [pembayaranList, setPembayaranList] = useState([]);
  const [rumahList, setRumahList] = useState([]);

  const [selectedBulan, setSelectedBulan] = useState(new Date().getMonth() + 1);
  const [selectedTahun, setSelectedTahun] = useState(2026);
  const [filterJenis, setFilterJenis] = useState('All');
  const [search, setSearch] = useState('');

  // Form Modal State
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    rumah_id: '',
    jenis_iuran: 'Satpam',
    bulan_mulai: new Date().getMonth() + 1,
    tahun: 2026,
    durasi_bulan: 1,
    catatan: '',
  });

  const loadData = useCallback(() => {
    const listP = StorageService.getPembayaran(selectedBulan, selectedTahun, filterJenis);
    const listR = StorageService.getRumah();
    setPembayaranList(listP);
    setRumahList(listR);
  }, [selectedBulan, selectedTahun, filterJenis]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOpenModal = () => {
    setFormData({
      rumah_id: rumahList.length > 0 ? String(rumahList[0].id) : '',
      jenis_iuran: 'Satpam',
      bulan_mulai: selectedBulan,
      tahun: selectedTahun,
      durasi_bulan: 1,
      catatan: '',
    });
    setShowModal(true);
  };

  const handleSubmitPay = (e) => {
    e.preventDefault();
    if (!formData.rumah_id) {
      alert("Mohon pilih Unit Rumah!");
      return;
    }

    const house = rumahList.find(r => r.id === Number(formData.rumah_id));
    if (!house || !house.penghuni_id) {
      alert("Unit rumah ini belum memiliki penghuni terdaftar!");
      return;
    }

    StorageService.addPembayaranBulk({
      rumah_id: Number(formData.rumah_id),
      penghuni_id: house.penghuni_id,
      jenis_iuran: formData.jenis_iuran,
      bulan_mulai: Number(formData.bulan_mulai),
      tahun: Number(formData.tahun),
      durasi_bulan: Number(formData.durasi_bulan),
      catatan: formData.catatan,
    });

    setShowModal(false);
    loadData();
  };

  const handleQuickMarkPay = (p) => {
    StorageService.updateStatusPembayaran(p.id, 'Lunas');
    loadData();
  };

  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  const filtered = pembayaranList.filter(p => {
    const rName = p.rumah?.nomor_rumah || '';
    const pName = p.penghuni?.nama_lengkap || '';
    return rName.toLowerCase().includes(search.toLowerCase()) || pName.toLowerCase().includes(search.toLowerCase());
  });

  const totalLunas = filtered.filter(p => p.status === 'Lunas').reduce((acc, p) => acc + p.jumlah, 0);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
            <CreditCard className="w-7 h-7 text-slate-800" />
            Pencatatan Iuran Warga (Pemasukan)
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-normal">
            Kelola transaksi iuran bulanan Satpam (Rp 100.000) & Kebersihan (Rp 15.000). Dukungan pembayaran sekaligus beberapa bulan.
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-md active:scale-95 shrink-0"
        >
          <PlusCircle className="w-4 h-4" /> Catat Iuran Baru
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari rumah / penghuni..."
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

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-500">Jenis:</label>
            <select
              value={filterJenis}
              onChange={(e) => setFilterJenis(e.target.value)}
              className="bg-slate-50 border border-slate-300/80 text-slate-800 text-xs rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
            >
              <option value="All">Semua</option>
              <option value="Satpam">Satpam</option>
              <option value="Kebersihan">Kebersihan</option>
            </select>
          </div>

          <div className="bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200/60 text-xs font-bold">
            Total Lunas: {formatRupiah(totalLunas)}
          </div>
        </div>
      </div>

      {/* Tabel Pembayaran */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-sm space-y-2">
            <CreditCard className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="font-semibold text-slate-700">Tidak ada catatan transaksi iuran pada periode ini.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 min-w-[700px]">
              <thead className="bg-slate-50 uppercase font-bold text-[11px] text-slate-400 tracking-wider border-b border-slate-200/80">
                <tr>
                  <th className="px-5 py-3.5">Unit Rumah & Warga</th>
                  <th className="px-5 py-3.5">Jenis Iuran</th>
                  <th className="px-5 py-3.5">Periode Tagihan</th>
                  <th className="px-5 py-3.5">Nominal Tarif</th>
                  <th className="px-5 py-3.5">Tanggal Bayar</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-extrabold text-slate-900 text-sm block leading-tight">
                        {p.rumah?.nomor_rumah}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {p.penghuni?.nama_lengkap} ({p.penghuni?.status_penghuni})
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        p.jenis_iuran === 'Satpam' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60' : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                      }`}>
                        {p.jenis_iuran === 'Satpam' ? '🛡️ Satpam' : '🧹 Kebersihan'}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {namaBulanList[p.bulan - 1]} {p.tahun}
                    </td>
                    <td className="px-5 py-4 font-extrabold text-slate-900 text-sm">
                      {formatRupiah(p.jumlah)}
                    </td>
                    <td className="px-5 py-4 text-slate-500 font-medium">
                      {p.tanggal_bayar || '-'}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        p.status === 'Lunas' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-rose-50 text-rose-700 border border-rose-200/60'
                      }`}>
                        {p.status === 'Lunas' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      {p.status === 'Belum Lunas' ? (
                        <button
                          onClick={() => handleQuickMarkPay(p)}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] transition-all shadow-xs active:scale-95"
                        >
                          Tandai Lunas
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-600 font-bold">✓ Lunas</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Input Iuran Baru */}
      {showModal && (
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
      )}
    </div>
  );
}
