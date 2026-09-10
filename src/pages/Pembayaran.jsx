import React from 'react';
import { usePembayaran } from '../hooks/usePembayaran';
import PembayaranHeader from '../components/pembayaran/PembayaranHeader';
import PembayaranFilters from '../components/pembayaran/PembayaranFilters';
import PembayaranTable from '../components/pembayaran/PembayaranTable';
import PembayaranModal from '../components/pembayaran/PembayaranModal';

export default function Pembayaran() {
  const {
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
  } = usePembayaran();

  return (
    <div className="space-y-6">
      <PembayaranHeader onOpenModal={handleOpenModal} />

      <PembayaranFilters
        search={search}
        setSearch={setSearch}
        selectedTahun={selectedTahun}
        setSelectedTahun={setSelectedTahun}
        selectedBulan={selectedBulan}
        setSelectedBulan={setSelectedBulan}
        filterJenis={filterJenis}
        setFilterJenis={setFilterJenis}
        totalLunas={totalLunas}
      />

      <PembayaranTable
        filtered={filtered}
        handleQuickMarkPay={handleQuickMarkPay}
      />

      <PembayaranModal
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        setFormData={setFormData}
        rumahList={rumahList}
        handleSubmitPay={handleSubmitPay}
      />
    </div>
  );
}
