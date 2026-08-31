import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Edit3, 
  Trash2, 
  Phone, 
  UserCheck, 
  X, 
  Upload, 
  Eye
} from 'lucide-react';
import { StorageService } from '../services/storage';

export default function Penghuni() {
  const [penghuniList, setPenghuniList] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Form Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    nama_lengkap: '',
    foto_ktp: '',
    status_penghuni: 'Tetap',
    nomor_telepon: '',
    status_pernikahan: 'Sudah Menikah',
  });
  const [previewKtp, setPreviewKtp] = useState('');

  // KTP View Modal State
  const [viewKtpModal, setViewKtpModal] = useState(false);
  const [targetKtpData, setTargetKtpData] = useState(null);

  const loadPenghuni = useCallback(() => {
    const list = StorageService.getPenghuni(filterStatus);
    setPenghuniList(list);
  }, [filterStatus]);

  useEffect(() => {
    loadPenghuni();
  }, [loadPenghuni]);

  const generateKtpSvg = (nama, nik) => {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="180" viewBox="0 0 300 180" fill="none"><rect width="300" height="180" rx="12" fill="%23f8fafc"/><rect x="15" y="15" width="270" height="150" rx="8" fill="%23ffffff" stroke="%230f172a" stroke-width="2"/><text x="30" y="40" fill="%230f172a" font-family="sans-serif" font-size="14" font-weight="bold">PROVINSI DKI JAKARTA</text><text x="30" y="55" fill="%2364748b" font-family="sans-serif" font-size="11">KOTA JAKARTA SELATAN</text><rect x="30" y="70" width="70" height="80" rx="6" fill="%23e2e8f0"/><circle cx="65" cy="100" r="20" fill="%2394a3b8"/><path d="M40 140 C 40 120, 90 120, 90 140 Z" fill="%2394a3b8"/><text x="115" y="85" fill="%230f172a" font-family="sans-serif" font-size="11" font-weight="bold">NIK: ${nik}</text><text x="115" y="105" fill="%230f172a" font-family="sans-serif" font-size="11" font-weight="bold">${nama.substring(0, 18)}</text><text x="115" y="125" fill="%2364748b" font-family="sans-serif" font-size="9">Perumahan Zalde RT 05 / RW 02</text><text x="115" y="140" fill="%23059669" font-family="sans-serif" font-size="9" font-weight="bold">VERIFIED RESIDENT</text></svg>`;
  };

  const handleOpenCreate = () => {
    setIsEdit(false);
    const initialSvg = generateKtpSvg('WARGA BARU', '3174000000000000');
    setFormData({
      id: null,
      nama_lengkap: '',
      foto_ktp: initialSvg,
      status_penghuni: 'Tetap',
      nomor_telepon: '',
      status_pernikahan: 'Sudah Menikah',
    });
    setPreviewKtp(initialSvg);
    setShowModal(true);
  };

  const handleOpenEdit = (p) => {
    setIsEdit(true);
    const ktpSvg = p.foto_ktp || generateKtpSvg(p.nama_lengkap, '3174091205900001');
    setFormData({
      id: p.id,
      nama_lengkap: p.nama_lengkap,
      foto_ktp: ktpSvg,
      status_penghuni: p.status_penghuni,
      nomor_telepon: p.nomor_telepon,
      status_pernikahan: p.status_pernikahan,
    });
    setPreviewKtp(ktpSvg);
    setShowModal(true);
  };

  const handleOpenViewKtp = (p) => {
    setTargetKtpData(p);
    setViewKtpModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewKtp(reader.result);
        setFormData(prev => ({ ...prev, foto_ktp: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nama_lengkap || !formData.nomor_telepon) {
      alert("Mohon lengkapi Nama Lengkap dan Nomor Telepon!");
      return;
    }

    if (isEdit) {
      StorageService.updatePenghuni(formData);
    } else {
      StorageService.addPenghuni(formData);
    }

    setShowModal(false);
    loadPenghuni();
  };

  const handleDelete = (id, nama) => {
    if (confirm(`Apakah Anda yakin ingin menghapus data warga "${nama}"?`)) {
      StorageService.deletePenghuni(id);
      loadPenghuni();
    }
  };

  const filtered = penghuniList.filter(p =>
    p.nama_lengkap.toLowerCase().includes(search.toLowerCase()) ||
    p.nomor_telepon.includes(search)
  );

  const tetapCount = penghuniList.filter(p => p.status_penghuni === 'Tetap').length;
  const kontrakCount = penghuniList.filter(p => p.status_penghuni === 'Kontrak').length;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
            <Users className="w-7 h-7 text-slate-800" />
            Daftar Penghuni Perumahan
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-normal">
            Kelola data identitas warga, status hunian (Tetap/Kontrak), foto KTP terverifikasi, dan kontak RT.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-md active:scale-95 shrink-0"
        >
          <UserPlus className="w-4 h-4" /> Tambah Penghuni Baru
        </button>
      </div>

      {/* Summary Filter Pills & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari nama penghuni atau no. telp..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300/80 text-slate-800 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Status:</span>
          {[
            { id: 'All', label: `Semua (${penghuniList.length})` },
            { id: 'Tetap', label: `Tetap (${tetapCount})` },
            { id: 'Kontrak', label: `Kontrak (${kontrakCount})` },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setFilterStatus(st.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterStatus === st.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabel Data Penghuni Format List */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm space-y-2">
            <Users className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="font-semibold text-slate-700">Tidak ada data penghuni ditemukan.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 min-w-[650px]">
              <thead className="bg-slate-50 uppercase font-bold text-[11px] text-slate-400 tracking-wider border-b border-slate-200/80">
                <tr>
                  <th className="px-5 py-3.5">Nama Penghuni</th>
                  <th className="px-5 py-3.5">Status Huni</th>
                  <th className="px-5 py-3.5">Status Pernikahan</th>
                  <th className="px-5 py-3.5">No. Telepon / WA</th>
                  <th className="px-5 py-3.5">Unit Rumah Terdaftar</th>
                  <th className="px-5 py-3.5">KTP</th>
                  <th className="px-5 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0">
                          {p.nama_lengkap.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-extrabold text-slate-900 text-sm block leading-tight">
                            {p.nama_lengkap}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold">ID: #{p.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.status_penghuni === 'Tetap'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                            : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                        }`}
                      >
                        {p.status_penghuni}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-700">
                      {p.status_pernikahan}
                    </td>
                    <td className="px-5 py-4">
                      <a
                        href={`https://wa.me/${p.nomor_telepon.replace(/^0/, '62')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-slate-800 font-semibold hover:text-emerald-600 transition-colors bg-slate-100 hover:bg-emerald-50 px-2.5 py-1 rounded-lg border border-slate-200/60"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        {p.nomor_telepon}
                      </a>
                    </td>
                    <td className="px-5 py-4">
                      {p.rumah && p.rumah.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {p.rumah.map(r => (
                            <span key={r.id} className="bg-slate-900 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                              {r.nomor_rumah}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">Belum diisi</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleOpenViewKtp(p)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 hover:text-slate-950 underline"
                      >
                        <Eye className="w-3.5 h-3.5" /> Lihat KTP
                      </button>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                          title="Edit Penghuni"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.nama_lengkap)}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Hapus Penghuni"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form Create/Edit Penghuni */}
      {showModal && (
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

              {/* Upload Foto KTP */}
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
      )}

      {/* Modal View KTP */}
      {viewKtpModal && targetKtpData && (
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
      )}
    </div>
  );
}
