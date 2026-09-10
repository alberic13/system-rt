import { STORAGE_KEYS } from './storageKeys';
import { defaultKtpSvg } from './seedData';

export const penghuniService = {
  getPenghuni: (statusFilter = 'All') => {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PENGHUNI) || '[]');
    const rumahList = JSON.parse(localStorage.getItem(STORAGE_KEYS.RUMAH) || '[]');

    const enriched = list.map(p => ({
      ...p,
      rumah: rumahList.filter(r => r.penghuni_id === p.id),
    }));

    if (statusFilter && statusFilter !== 'All') {
      return enriched.filter(p => p.status_penghuni === statusFilter);
    }
    return enriched;
  },

  addPenghuni: (data) => {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PENGHUNI) || '[]');
    const newPenghuni = {
      id: Date.now(),
      nama_lengkap: data.nama_lengkap,
      foto_ktp: data.foto_ktp || defaultKtpSvg,
      status_penghuni: data.status_penghuni,
      nomor_telepon: data.nomor_telepon,
      status_pernikahan: data.status_pernikahan,
    };
    list.push(newPenghuni);
    localStorage.setItem(STORAGE_KEYS.PENGHUNI, JSON.stringify(list));
    return newPenghuni;
  },

  updatePenghuni: (data) => {
    let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PENGHUNI) || '[]');
    list = list.map(p => p.id === Number(data.id) ? { ...p, ...data, id: Number(data.id) } : p);
    localStorage.setItem(STORAGE_KEYS.PENGHUNI, JSON.stringify(list));
    return data;
  },

  deletePenghuni: (id) => {
    const targetId = Number(id);

    // 1. Remove from PENGHUNI
    let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PENGHUNI) || '[]');
    list = list.filter(p => p.id !== targetId);
    localStorage.setItem(STORAGE_KEYS.PENGHUNI, JSON.stringify(list));

    // 2. Unassign from RUMAH (Set house to empty)
    let rumahList = JSON.parse(localStorage.getItem(STORAGE_KEYS.RUMAH) || '[]');
    rumahList = rumahList.map(r => {
      if (r.penghuni_id === targetId) {
        return { ...r, status_huni: 'Tidak Dihuni', penghuni_id: null };
      }
      return r;
    });
    localStorage.setItem(STORAGE_KEYS.RUMAH, JSON.stringify(rumahList));

    // 3. Close open history in RIWAYAT
    let riwayatList = JSON.parse(localStorage.getItem(STORAGE_KEYS.RIWAYAT) || '[]');
    riwayatList = riwayatList.map(rw => {
      if (rw.penghuni_id === targetId && !rw.tanggal_keluar) {
        return { ...rw, tanggal_keluar: new Date().toISOString().split('T')[0] };
      }
      return rw;
    });
    localStorage.setItem(STORAGE_KEYS.RIWAYAT, JSON.stringify(riwayatList));

    // 4. Purge unpaid bills for this deleted resident
    let pembayaranList = JSON.parse(localStorage.getItem(STORAGE_KEYS.PEMBAYARAN) || '[]');
    pembayaranList = pembayaranList.filter(p => {
      if (p.penghuni_id === targetId && p.status === 'Belum Lunas') {
        return false;
      }
      return true;
    });
    localStorage.setItem(STORAGE_KEYS.PEMBAYARAN, JSON.stringify(pembayaranList));
  },
};
