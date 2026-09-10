import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { StorageService } from '../services/storage';

export function useRumah() {
  const [searchParams] = useSearchParams();
  const selectedHouseId = searchParams.get('id');

  const [rumahList, setRumahList] = useState([]);
  const [penghuniList, setPenghuniList] = useState([]);
  const [search, setSearch] = useState('');
  const [filterHuni, setFilterHuni] = useState('All');
  const [viewMode, setViewMode] = useState('table');

  // Assign Penghuni Modal State
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [targetRumah, setTargetRumah] = useState(null);
  const [selectedPenghuniId, setSelectedPenghuniId] = useState('');
  const [statusHuniForm, setStatusHuniForm] = useState('Dihuni');
  const [catatanRiwayatForm, setCatatanRiwayatForm] = useState('');

  // History Modal State
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyHouse, setHistoryHouse] = useState(null);
  const [historyList, setHistoryList] = useState([]);

  const handleOpenHistory = useCallback((r) => {
    setHistoryHouse(r);
    const hist = StorageService.getRiwayatByRumahId(r.id);
    setHistoryList(hist);
    setShowHistoryModal(true);
  }, []);

  const loadData = useCallback(() => {
    const listR = StorageService.getRumah();
    const listP = StorageService.getPenghuni();
    setRumahList(listR);
    setPenghuniList(listP);

    if (selectedHouseId) {
      const target = listR.find(r => r.id === Number(selectedHouseId));
      if (target) handleOpenHistory(target);
    }
  }, [selectedHouseId, handleOpenHistory]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOpenAssign = (r) => {
    setTargetRumah(r);
    setSelectedPenghuniId(r.penghuni_id ? String(r.penghuni_id) : '');
    setStatusHuniForm(r.status_huni);
    setCatatanRiwayatForm('');
    setShowAssignModal(true);
  };

  const handleSaveAssign = (e) => {
    e.preventDefault();
    if (!targetRumah) return;

    const newPenghuniId = statusHuniForm === 'Tidak Dihuni' ? null : (selectedPenghuniId ? Number(selectedPenghuniId) : null);

    StorageService.updateRumah({
      id: targetRumah.id,
      status_huni: statusHuniForm,
      penghuni_id: newPenghuniId,
      catatan_riwayat: catatanRiwayatForm,
    });

    setShowAssignModal(false);
    loadData();
  };

  const refreshHistory = (houseId) => {
    const hist = StorageService.getRiwayatByRumahId(houseId);
    setHistoryList(hist);
  };

  const handleDeleteHistory = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus catatan riwayat ini?")) {
      StorageService.deleteRiwayat(id);
      if (historyHouse) refreshHistory(historyHouse.id);
      loadData();
    }
  };

  const filtered = rumahList.filter(r => {
    const matchesSearch = r.nomor_rumah.toLowerCase().includes(search.toLowerCase()) ||
      (r.penghuni?.nama_lengkap || '').toLowerCase().includes(search.toLowerCase());
    const matchesHuni = filterHuni === 'All' || r.status_huni === filterHuni;
    return matchesSearch && matchesHuni;
  });

  const totalDihuni = rumahList.filter(r => r.status_huni === 'Dihuni').length;
  const totalKosong = rumahList.filter(r => r.status_huni === 'Tidak Dihuni').length;
  const occupancyPercentage = rumahList.length > 0 ? Math.round((totalDihuni / rumahList.length) * 100) : 0;

  return {
    rumahList,
    penghuniList,
    search,
    setSearch,
    filterHuni,
    setFilterHuni,
    viewMode,
    setViewMode,
    showAssignModal,
    setShowAssignModal,
    targetRumah,
    selectedPenghuniId,
    setSelectedPenghuniId,
    statusHuniForm,
    setStatusHuniForm,
    catatanRiwayatForm,
    setCatatanRiwayatForm,
    showHistoryModal,
    setShowHistoryModal,
    historyHouse,
    historyList,
    handleOpenAssign,
    handleSaveAssign,
    handleOpenHistory,
    handleDeleteHistory,
    filtered,
    totalDihuni,
    totalKosong,
    occupancyPercentage,
  };
}
