import { useState, useEffect, useCallback } from 'react';
import { StorageService } from '../services/storage';

export function useLaporan() {
  const [laporanData, setLaporanData] = useState(null);
  const [selectedBulan, setSelectedBulan] = useState(new Date().getMonth() + 1);
  const [selectedTahun, setSelectedTahun] = useState(2026);

  const loadLaporan = useCallback(() => {
    const data = StorageService.getLaporan(selectedTahun, selectedBulan);
    setLaporanData(data);
  }, [selectedTahun, selectedBulan]);

  useEffect(() => {
    loadLaporan();
  }, [loadLaporan]);

  const handlePrint = () => {
    window.print();
  };

  return {
    laporanData,
    selectedBulan,
    setSelectedBulan,
    selectedTahun,
    setSelectedTahun,
    handlePrint,
  };
}
