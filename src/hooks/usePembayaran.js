import { useState, useEffect, useCallback } from 'react';
import { StorageService } from '../services/storage';

export function usePembayaran() {
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

  const filtered = pembayaranList.filter(p => {
    const rName = p.rumah?.nomor_rumah || '';
    const pName = p.penghuni?.nama_lengkap || '';
    return rName.toLowerCase().includes(search.toLowerCase()) || pName.toLowerCase().includes(search.toLowerCase());
  });

  const totalLunas = filtered.filter(p => p.status === 'Lunas').reduce((acc, p) => acc + p.jumlah, 0);

  return {
    pembayaranList,
    rumahList,
    selectedBulan,
    setSelectedBulan,
    selectedTahun,
    setSelectedTahun,
    filterJenis,
    setFilterJenis,
    search,
    setSearch,
    showModal,
    setShowModal,
    formData,
    setFormData,
    handleOpenModal,
    handleSubmitPay,
    handleQuickMarkPay,
    filtered,
    totalLunas,
  };
}
