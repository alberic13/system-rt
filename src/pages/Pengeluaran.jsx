import React from 'react';
import { usePengeluaran } from '../hooks/usePengeluaran';
import PengeluaranHeader from '../components/pengeluaran/PengeluaranHeader';
import PengeluaranFilters from '../components/pengeluaran/PengeluaranFilters';
import PengeluaranTable from '../components/pengeluaran/PengeluaranTable';
import PengeluaranModal from '../components/pengeluaran/PengeluaranModal';

export default function Pengeluaran() {
  const {
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
  } = usePengeluaran();

  return (
    <div className="space-y-6">
      <PengeluaranHeader onOpenModal={handleOpenModal} />

      <PengeluaranFilters
        search={search}
        setSearch={setSearch}
        selectedTahun={selectedTahun}
        setSelectedTahun={setSelectedTahun}
        selectedBulan={selectedBulan}
        setSelectedBulan={setSelectedBulan}
        totalPengeluaranBulanIni={totalPengeluaranBulanIni}
      />

      <PengeluaranTable
        filtered={filtered}
        handleDelete={handleDelete}
      />

      <PengeluaranModal
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
