import { STORAGE_KEYS } from './storageKeys';

export const rumahService = {
  getRumah: () => {
    const rumahList = JSON.parse(localStorage.getItem(STORAGE_KEYS.RUMAH) || '[]');
    const penghuniList = JSON.parse(localStorage.getItem(STORAGE_KEYS.PENGHUNI) || '[]');

    return rumahList.map(r => ({
      ...r,
      penghuni: penghuniList.find(p => p.id === r.penghuni_id) || null,
    }));
  },

  getRumahById: (id) => {
    const rumahList = JSON.parse(localStorage.getItem(STORAGE_KEYS.RUMAH) || '[]');
    const penghuniList = JSON.parse(localStorage.getItem(STORAGE_KEYS.PENGHUNI) || '[]');
    const riwayatList = JSON.parse(localStorage.getItem(STORAGE_KEYS.RIWAYAT) || '[]');
    const pembayaranList = JSON.parse(localStorage.getItem(STORAGE_KEYS.PEMBAYARAN) || '[]');

    const rmh = rumahList.find(r => r.id === Number(id));
    if (!rmh) return null;

    const rmhPenghuni = penghuniList.find(p => p.id === rmh.penghuni_id) || null;

    const enrichedRiwayat = riwayatList
      .filter(rw => rw.rumah_id === Number(id))
      .map(rw => ({
        ...rw,
        penghuni: penghuniList.find(p => p.id === rw.penghuni_id) || null,
      }))
      .sort((a, b) => b.id - a.id);

    const enrichedPembayaran = pembayaranList
      .filter(p => p.rumah_id === Number(id))
      .map(p => ({
        ...p,
        penghuni: penghuniList.find(pen => pen.id === p.penghuni_id) || null,
      }))
      .sort((a, b) => b.tahun - a.tahun || b.bulan - a.bulan);

    return {
      ...rmh,
      penghuni: rmhPenghuni,
      riwayat: enrichedRiwayat,
      pembayaran: enrichedPembayaran,
    };
  },

  getRiwayatByRumahId: (rumahId) => {
    const riwayatList = JSON.parse(localStorage.getItem(STORAGE_KEYS.RIWAYAT) || '[]');
    const penghuniList = JSON.parse(localStorage.getItem(STORAGE_KEYS.PENGHUNI) || '[]');

    return riwayatList
      .filter(rw => rw.rumah_id === Number(rumahId))
      .map(rw => {
        const pen = penghuniList.find(p => p.id === rw.penghuni_id);
        return {
          ...rw,
          penghuni: pen || null,
          status_penghuni: rw.status_penghuni || (pen ? pen.status_penghuni : 'Tetap')
        };
      })
      .sort((a, b) => b.id - a.id);
  },

  addRiwayat: (data) => {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.RIWAYAT) || '[]');
    const newRiwayat = {
      id: Date.now(),
      rumah_id: Number(data.rumah_id),
      penghuni_id: Number(data.penghuni_id),
      tanggal_masuk: data.tanggal_masuk || new Date().toISOString().split('T')[0],
      tanggal_keluar: data.tanggal_keluar || null,
      catatan: data.catatan || 'Riwayat dimasukkan manual',
    };
    list.push(newRiwayat);
    localStorage.setItem(STORAGE_KEYS.RIWAYAT, JSON.stringify(list));
    return newRiwayat;
  },

  deleteRiwayat: (id) => {
    let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.RIWAYAT) || '[]');
    list = list.filter(rw => rw.id !== Number(id));
    localStorage.setItem(STORAGE_KEYS.RIWAYAT, JSON.stringify(list));
  },

  addRumah: (nomor_rumah) => {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.RUMAH) || '[]');
    const newRumah = {
      id: Date.now(),
      nomor_rumah,
      status_huni: 'Tidak Dihuni',
      penghuni_id: null,
    };
    list.push(newRumah);
    localStorage.setItem(STORAGE_KEYS.RUMAH, JSON.stringify(list));
    return newRumah;
  },

  updateRumah: (idParam, status_huniParam, penghuni_idParam, catatan_riwayatParam) => {
    let id, status_huni, penghuni_id, catatan_riwayat;
    if (typeof idParam === 'object' && idParam !== null) {
      id = idParam.id;
      status_huni = idParam.status_huni;
      penghuni_id = idParam.penghuni_id;
      catatan_riwayat = idParam.catatan_riwayat;
    } else {
      id = idParam;
      status_huni = status_huniParam;
      penghuni_id = penghuni_idParam;
      catatan_riwayat = catatan_riwayatParam;
    }

    let rumahList = JSON.parse(localStorage.getItem(STORAGE_KEYS.RUMAH) || '[]');
    let riwayatList = JSON.parse(localStorage.getItem(STORAGE_KEYS.RIWAYAT) || '[]');
    let pembayaranList = JSON.parse(localStorage.getItem(STORAGE_KEYS.PEMBAYARAN) || '[]');

    const targetId = Number(id);
    const rmhIndex = rumahList.findIndex(r => r.id === targetId);
    if (rmhIndex === -1) return null;

    const currentRmh = rumahList[rmhIndex];
    const targetPenghuniId = status_huni === 'Dihuni' && penghuni_id ? Number(penghuni_id) : null;
    const targetStatusHuni = targetPenghuniId ? 'Dihuni' : 'Tidak Dihuni';

    if (currentRmh.penghuni_id !== targetPenghuniId) {
      if (currentRmh.penghuni_id) {
        // Close last history entry
        riwayatList = riwayatList.map(rw => {
          if (rw.rumah_id === targetId && rw.penghuni_id === currentRmh.penghuni_id && !rw.tanggal_keluar) {
            return { ...rw, tanggal_keluar: new Date().toISOString().split('T')[0] };
          }
          return rw;
        });
      }

      if (targetPenghuniId) {
        riwayatList.push({
          id: Date.now(),
          rumah_id: targetId,
          penghuni_id: targetPenghuniId,
          tanggal_masuk: new Date().toISOString().split('T')[0],
          tanggal_keluar: null,
          catatan: catatan_riwayat || 'Pergantian penghuni rumah baru',
        });

        // Automatic billing generation for newly assigned resident
        const currentBulan = new Date().getMonth() + 1;
        const currentTahun = 2026;

        const hasSatpam = pembayaranList.some(p => 
          p.rumah_id === targetId && p.penghuni_id === targetPenghuniId && p.bulan === currentBulan && p.tahun === currentTahun && p.jenis_iuran === 'Satpam'
        );
        if (!hasSatpam) {
          pembayaranList.push({
            id: Date.now() + 1,
            rumah_id: targetId,
            penghuni_id: targetPenghuniId,
            jenis_iuran: 'Satpam',
            bulan: currentBulan,
            tahun: currentTahun,
            jumlah: 100000,
            status: 'Belum Lunas',
            tanggal_bayar: null,
            catatan: 'Tagihan otomatis iuran satpam (penghuni baru)',
          });
        }

        const hasKebersihan = pembayaranList.some(p => 
          p.rumah_id === targetId && p.penghuni_id === targetPenghuniId && p.bulan === currentBulan && p.tahun === currentTahun && p.jenis_iuran === 'Kebersihan'
        );
        if (!hasKebersihan) {
          pembayaranList.push({
            id: Date.now() + 2,
            rumah_id: targetId,
            penghuni_id: targetPenghuniId,
            jenis_iuran: 'Kebersihan',
            bulan: currentBulan,
            tahun: currentTahun,
            jumlah: 15000,
            status: 'Belum Lunas',
            tanggal_bayar: null,
            catatan: 'Tagihan otomatis iuran kebersihan (penghuni baru)',
          });
        }
      } else {
        // Purge unpaid bills for unoccupied house
        pembayaranList = pembayaranList.filter(p => !(p.rumah_id === targetId && p.status === 'Belum Lunas'));
      }
      localStorage.setItem(STORAGE_KEYS.PEMBAYARAN, JSON.stringify(pembayaranList));
    }

    rumahList[rmhIndex] = {
      ...currentRmh,
      status_huni: targetStatusHuni,
      penghuni_id: targetPenghuniId,
    };

    localStorage.setItem(STORAGE_KEYS.RUMAH, JSON.stringify(rumahList));
    localStorage.setItem(STORAGE_KEYS.RIWAYAT, JSON.stringify(riwayatList));
    return rumahList[rmhIndex];
  },
};
