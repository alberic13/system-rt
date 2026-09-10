import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import HeroBanner from '../components/dashboard/HeroBanner';
import StatCards from '../components/dashboard/StatCards';
import FinanceTrendChart from '../components/dashboard/FinanceTrendChart';
import UnpaidTable from '../components/dashboard/UnpaidTable';
import QuickPayModal from '../components/dashboard/QuickPayModal';

export default function Dashboard() {
  const {
    tahun,
    setTahun,
    selectedBulan,
    setSelectedBulan,
    laporanData,
    unpaidList,
    payModal,
    setPayModal,
    targetPayGroup,
    handleOpenQuickPay,
    handleConfirmQuickPay,
    rumahDihuniCount,
    rumahKosongCount,
    totalTunggakanKeseluruhan,
  } = useDashboard();

  return (
    <div className="space-y-6 sm:space-y-8">
      <HeroBanner />

      <StatCards
        laporanData={laporanData}
        tahun={tahun}
        rumahDihuniCount={rumahDihuniCount}
        rumahKosongCount={rumahKosongCount}
      />

      <FinanceTrendChart
        tahun={tahun}
        setTahun={setTahun}
        laporanData={laporanData}
      />

      <UnpaidTable
        unpaidList={unpaidList}
        selectedBulan={selectedBulan}
        setSelectedBulan={setSelectedBulan}
        tahun={tahun}
        totalTunggakanKeseluruhan={totalTunggakanKeseluruhan}
        handleOpenQuickPay={handleOpenQuickPay}
      />

      <QuickPayModal
        payModal={payModal}
        setPayModal={setPayModal}
        targetPayGroup={targetPayGroup}
        handleConfirmQuickPay={handleConfirmQuickPay}
      />
    </div>
  );
}
