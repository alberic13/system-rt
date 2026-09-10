import { useState, useEffect, useCallback } from 'react';
import { StorageService } from '../services/storage';

export function usePengeluaran() {
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

  const filtered = pengeluaranList.filter(e =>
    e.kategori.toLowerCase().includes(search.toLowerCase()) ||
    e.keterangan.toLowerCase().includes(search.toLowerCase())
  );

  const totalPengeluaranBulanIni = filtered.reduce((acc, e) => acc + e.jumlah, 0);

  return {
    pengeluaranList,
    selectedBulan,
    setSelectedBulan,
    selectedTahun,
    setSelectedTahun,
    search,
    setSearch,
    showModal,
    setShowModal,
    formData,
    setFormData,
    handleOpenModal,
    handleSubmit,
    handleDelete,
    filtered,
    totalPengeluaranBulanIni,
  };
}
