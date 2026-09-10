import { useState, useEffect, useCallback } from 'react';
import { StorageService } from '../services/storage';
import { generateKtpSvg } from '../utils/formatters';

export function usePenghuni() {
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

  return {
    penghuniList,
    search,
    setSearch,
    filterStatus,
    setFilterStatus,
    showModal,
    setShowModal,
    isEdit,
    formData,
    setFormData,
    previewKtp,
    viewKtpModal,
    setViewKtpModal,
    targetKtpData,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenViewKtp,
    handleFileChange,
    handleSubmit,
    handleDelete,
    filtered,
    tetapCount,
    kontrakCount,
  };
}
