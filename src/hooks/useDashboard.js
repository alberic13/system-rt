import { useState, useEffect, useCallback } from 'react';
import { StorageService } from '../services/storage';

export function useDashboard() {
  const [tahun, setTahun] = useState(2026);
  const [selectedBulan, setSelectedBulan] = useState(8);
  const [laporanData, setLaporanData] = useState(null);
  const [listRumah, setListRumah] = useState([]);
  const [unpaidList, setUnpaidList] = useState([]);

  // Quick Payment Modal State
  const [payModal, setPayModal] = useState(false);
  const [targetPayGroup, setTargetPayGroup] = useState(null);

  const loadData = useCallback(() => {
    const lap = StorageService.getLaporan(tahun);
    const rmh = StorageService.getRumah();
    const payments = StorageService.getPembayaran(selectedBulan, tahun);

    const unpaidRaw = payments.filter(p => p.status === 'Belum Lunas');
    const groupedMap = new Map();

    for (const p of unpaidRaw) {
      const houseId = p.rumah_id;
      if (!groupedMap.has(houseId)) {
        groupedMap.set(houseId, {
          id: houseId,
          rumah_id: houseId,
          penghuni_id: p.penghuni_id,
          rumah: p.rumah,
          penghuni: p.penghuni,
          bulan: p.bulan,
          tahun: p.tahun,
          items: [p],
          jenisList: [p.jenis_iuran],
          totalTunggakan: p.jumlah,
        });
      } else {
        const existing = groupedMap.get(houseId);
        existing.items.push(p);
        if (!existing.jenisList.includes(p.jenis_iuran)) {
          existing.jenisList.push(p.jenis_iuran);
        }
        existing.totalTunggakan += p.jumlah;
      }
    }

    setLaporanData(lap);
    setListRumah(rmh);
    setUnpaidList(Array.from(groupedMap.values()));
  }, [tahun, selectedBulan]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOpenQuickPay = (group) => {
    setTargetPayGroup(group);
    setPayModal(true);
  };

  const handleConfirmQuickPay = (e) => {
    e.preventDefault();
    if (!targetPayGroup) return;

    targetPayGroup.items.forEach(item => {
      StorageService.addPembayaranBulk({
        rumah_id: item.rumah_id,
        penghuni_id: item.penghuni_id,
        jenis_iuran: item.jenis_iuran,
        bulan_mulai: item.bulan,
        tahun: item.tahun,
        durasi_bulan: 1,
        catatan: 'Pelunasan Cepat via Dashboard RT',
      });
    });

    setPayModal(false);
    setTargetPayGroup(null);
    loadData();
  };

  const rumahDihuniCount = listRumah.filter(r => r.status_huni === 'Dihuni').length;
  const rumahKosongCount = listRumah.filter(r => r.status_huni === 'Tidak Dihuni').length;
  const totalTunggakanKeseluruhan = unpaidList.reduce((acc, g) => acc + g.totalTunggakan, 0);

  return {
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
  };
}
