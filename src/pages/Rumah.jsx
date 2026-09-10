import React from 'react';
import { Building2 } from 'lucide-react';
import { useRumah } from '../hooks/useRumah';
import RumahHeader from '../components/rumah/RumahHeader';
import RumahFilters from '../components/rumah/RumahFilters';
import RumahTable from '../components/rumah/RumahTable';
import RumahGrid from '../components/rumah/RumahGrid';
import AturPenghuniModal from '../components/rumah/AturPenghuniModal';
import HistoriPenghuniModal from '../components/rumah/HistoriPenghuniModal';

export default function Rumah() {
  const {
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
  } = useRumah();

  return (
    <div className="space-y-6">
      <RumahHeader
        totalDihuni={totalDihuni}
        totalKosong={totalKosong}
        occupancyPercentage={occupancyPercentage}
      />

      <RumahFilters
        search={search}
        setSearch={setSearch}
        filterHuni={filterHuni}
        setFilterHuni={setFilterHuni}
        viewMode={viewMode}
        setViewMode={setViewMode}
        rumahList={rumahList}
        totalDihuni={totalDihuni}
        totalKosong={totalKosong}
      />

      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center text-slate-500 space-y-3">
          <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">Tidak ada unit rumah ditemukan</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Tidak ada unit rumah yang cocok dengan pencarian <span className="font-semibold text-slate-700">"{search}"</span>.
          </p>
          <button
            onClick={() => { setSearch(''); setFilterHuni('All'); }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all"
          >
            Reset Pencarian
          </button>
        </div>
      ) : viewMode === 'table' ? (
        <RumahTable
          filtered={filtered}
          handleOpenAssign={handleOpenAssign}
          handleOpenHistory={handleOpenHistory}
        />
      ) : (
        <RumahGrid
          filtered={filtered}
          handleOpenAssign={handleOpenAssign}
          handleOpenHistory={handleOpenHistory}
        />
      )}

      <AturPenghuniModal
        showAssignModal={showAssignModal}
        setShowAssignModal={setShowAssignModal}
        targetRumah={targetRumah}
        statusHuniForm={statusHuniForm}
        setStatusHuniForm={setStatusHuniForm}
        selectedPenghuniId={selectedPenghuniId}
        setSelectedPenghuniId={setSelectedPenghuniId}
        catatanRiwayatForm={catatanRiwayatForm}
        setCatatanRiwayatForm={setCatatanRiwayatForm}
        penghuniList={penghuniList}
        handleSaveAssign={handleSaveAssign}
      />

      <HistoriPenghuniModal
        showHistoryModal={showHistoryModal}
        setShowHistoryModal={setShowHistoryModal}
        historyHouse={historyHouse}
        historyList={historyList}
        handleDeleteHistory={handleDeleteHistory}
      />
    </div>
  );
}
