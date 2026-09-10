import { STORAGE_KEYS } from './storageKeys';

export const pembayaranService = {
  getPembayaran: (bulan, tahun, jenisFilter) => {
    let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PEMBAYARAN) || '[]');
    const rumahList = JSON.parse(localStorage.getItem(STORAGE_KEYS.RUMAH) || '[]');
    const penghuniList = JSON.parse(localStorage.getItem(STORAGE_KEYS.PENGHUNI) || '[]');

    const targetBulan = bulan && bulan !== 'All' ? Number(bulan) : 8;
    const targetTahun = tahun ? Number(tahun) : 2026;

    // Automatic synchronization of bills for occupied houses
    let hasNewEntries = false;
    for (const rmh of rumahList) {
      if (rmh.status_huni === 'Dihuni' && rmh.penghuni_id) {
        const hasSatpam = list.some(p => p.rumah_id === rmh.id && p.penghuni_id === rmh.penghuni_id && p.bulan === targetBulan && p.tahun === targetTahun && p.jenis_iuran === 'Satpam');
        if (!hasSatpam) {
          list.push({
            id: Date.now() + Math.floor(Math.random() * 10000),
            rumah_id: rmh.id,
            penghuni_id: rmh.penghuni_id,
            jenis_iuran: 'Satpam',
            bulan: targetBulan,
            tahun: targetTahun,
            jumlah: 100000,
            status: 'Belum Lunas',
            tanggal_bayar: null,
            catatan: 'Tagihan iuran satpam bulanan',
          });
          hasNewEntries = true;
        }

        const hasKebersihan = list.some(p => p.rumah_id === rmh.id && p.penghuni_id === rmh.penghuni_id && p.bulan === targetBulan && p.tahun === targetTahun && p.jenis_iuran === 'Kebersihan');
        if (!hasKebersihan) {
          list.push({
            id: Date.now() + Math.floor(Math.random() * 10000) + 1,
            rumah_id: rmh.id,
            penghuni_id: rmh.penghuni_id,
            jenis_iuran: 'Kebersihan',
            bulan: targetBulan,
            tahun: targetTahun,
            jumlah: 15000,
            status: 'Belum Lunas',
            tanggal_bayar: null,
            catatan: 'Tagihan iuran kebersihan bulanan',
          });
          hasNewEntries = true;
        }
      }
    }

    // Purge orphan unpaid bills
    const validList = list.filter(p => {
      if (p.status === 'Belum Lunas') {
        const rmh = rumahList.find(r => r.id === p.rumah_id);
        const pen = penghuniList.find(pen => pen.id === p.penghuni_id);
        if (!rmh || rmh.status_huni !== 'Dihuni' || !pen || rmh.penghuni_id !== pen.id) {
          return false;
        }
      }
      return true;
    });

    if (validList.length !== list.length || hasNewEntries) {
      localStorage.setItem(STORAGE_KEYS.PEMBAYARAN, JSON.stringify(validList));
    }

    let filtered = validList;
    if (bulan && bulan !== 'All') filtered = filtered.filter(p => p.bulan === Number(bulan));
    if (tahun) filtered = filtered.filter(p => p.tahun === Number(tahun));
    if (jenisFilter && jenisFilter !== 'All') filtered = filtered.filter(p => p.jenis_iuran === jenisFilter);

    return filtered.map(p => ({
      ...p,
      rumah: rumahList.find(r => r.id === p.rumah_id) || null,
      penghuni: penghuniList.find(pen => pen.id === p.penghuni_id) || null,
    })).sort((a, b) => b.tahun - a.tahun || b.bulan - a.bulan || b.id - a.id);
  },

  updateStatusPembayaran: (id, status = 'Lunas') => {
    let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PEMBAYARAN) || '[]');
    list = list.map(p => {
      if (p.id === Number(id)) {
        return {
          ...p,
          status,
          tanggal_bayar: status === 'Lunas' ? new Date().toISOString().split('T')[0] : null,
        };
      }
      return p;
    });
    localStorage.setItem(STORAGE_KEYS.PEMBAYARAN, JSON.stringify(list));
  },

  addPembayaranBulk: (data) => {
    const { rumah_id, penghuni_id, jenis_iuran, bulan_mulai, tahun, durasi_bulan, catatan } = data;
    let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PEMBAYARAN) || '[]');

    const durasi = Number(durasi_bulan) || 1;
    const startBulan = Number(bulan_mulai);
    const startTahun = Number(tahun);
    const jenisList = jenis_iuran === 'Keduanya' ? ['Satpam', 'Kebersihan'] : [jenis_iuran];

    for (let i = 0; i < durasi; i++) {
      let targetBulan = startBulan + i;
      let targetTahun = startTahun;

      while (targetBulan > 12) {
        targetBulan -= 12;
        targetTahun += 1;
      }

      for (const jJenis of jenisList) {
        const nominal = jJenis === 'Satpam' ? 100000 : 15000;
        const existingIndex = list.findIndex(p => 
          p.rumah_id === Number(rumah_id) && 
          p.jenis_iuran === jJenis && 
          p.bulan === targetBulan && 
          p.tahun === targetTahun
        );

        if (existingIndex !== -1) {
          list[existingIndex] = {
            ...list[existingIndex],
            status: 'Lunas',
            tanggal_bayar: new Date().toISOString().split('T')[0],
            catatan: catatan || (durasi === 12 ? 'Pembayaran Lunas 1 Tahun' : 'Pembayaran Iuran Bulanan'),
          };
        } else {
          list.push({
            id: Date.now() + Math.floor(Math.random() * 1000),
            rumah_id: Number(rumah_id),
            penghuni_id: Number(penghuni_id),
            jenis_iuran: jJenis,
            bulan: targetBulan,
            tahun: targetTahun,
            jumlah: nominal,
            status: 'Lunas',
            tanggal_bayar: new Date().toISOString().split('T')[0],
            catatan: catatan || (durasi === 12 ? 'Pembayaran Lunas 1 Tahun' : 'Pembayaran Iuran Bulanan'),
          });
        }
      }
    }

    localStorage.setItem(STORAGE_KEYS.PEMBAYARAN, JSON.stringify(list));
  },
};
