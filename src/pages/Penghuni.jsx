import React from 'react';
import { usePenghuni } from '../hooks/usePenghuni';
import PenghuniHeader from '../components/penghuni/PenghuniHeader';
import PenghuniFilters from '../components/penghuni/PenghuniFilters';
import PenghuniTable from '../components/penghuni/PenghuniTable';
import PenghuniModal from '../components/penghuni/PenghuniModal';
import KtpPreviewModal from '../components/penghuni/KtpPreviewModal';

export default function Penghuni() {
  const {
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
  } = usePenghuni();

  return (
    <div className="space-y-6">
      <PenghuniHeader onOpenCreate={handleOpenCreate} />

      <PenghuniFilters
        search={search}
        setSearch={setSearch}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        penghuniList={penghuniList}
        tetapCount={tetapCount}
        kontrakCount={kontrakCount}
      />

      <PenghuniTable
        filtered={filtered}
        handleOpenViewKtp={handleOpenViewKtp}
        handleOpenEdit={handleOpenEdit}
        handleDelete={handleDelete}
      />

      <PenghuniModal
        showModal={showModal}
        setShowModal={setShowModal}
        isEdit={isEdit}
        formData={formData}
        setFormData={setFormData}
        previewKtp={previewKtp}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
      />

      <KtpPreviewModal
        viewKtpModal={viewKtpModal}
        setViewKtpModal={setViewKtpModal}
        targetKtpData={targetKtpData}
      />
    </div>
  );
}
