import React from 'react';
import { useLaporan } from '../hooks/useLaporan';
import LaporanHeader from '../components/laporan/LaporanHeader';
import LaporanSummaryCards from '../components/laporan/LaporanSummaryCards';
import LaporanMonthlyTable from '../components/laporan/LaporanMonthlyTable';
import LaporanMonthDetail from '../components/laporan/LaporanMonthDetail';

export default function Laporan() {
  const {
    laporanData,
    selectedBulan,
    setSelectedBulan,
    selectedTahun,
    setSelectedTahun,
    handlePrint,
  } = useLaporan();

  return (
    <div className="space-y-6">
      <LaporanHeader
        selectedTahun={selectedTahun}
        setSelectedTahun={setSelectedTahun}
        handlePrint={handlePrint}
      />

      <LaporanSummaryCards laporanData={laporanData} />

      <LaporanMonthlyTable monthlySummary={laporanData?.monthlySummary} />

      <LaporanMonthDetail
        laporanData={laporanData}
        selectedBulan={selectedBulan}
        setSelectedBulan={setSelectedBulan}
        selectedTahun={selectedTahun}
      />
    </div>
  );
}
