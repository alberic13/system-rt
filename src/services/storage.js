// LocalStorage Key Identifiers
const STORAGE_KEYS = {
  PENGHUNI: 'system_rt_penghuni_v1',
  RUMAH: 'system_rt_rumah_v1',
  RIWAYAT: 'system_rt_riwayat_v1',
  PEMBAYARAN: 'system_rt_pembayaran_v1',
  PENGELUARAN: 'system_rt_pengeluaran_v1',
};

const defaultKtpSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="180" viewBox="0 0 300 180" fill="none"><rect width="300" height="180" rx="12" fill="%231e293b"/><rect x="15" y="15" width="270" height="150" rx="8" fill="%230f172a" stroke="%2338bdf8" stroke-width="2"/><text x="30" y="40" fill="%2338bdf8" font-family="sans-serif" font-size="14" font-weight="bold">PROVINSI DKI JAKARTA</text><text x="30" y="55" fill="%2338bdf8" font-family="sans-serif" font-size="11">KOTA JAKARTA SELATAN</text><rect x="30" y="70" width="70" height="80" rx="6" fill="%23334155"/><circle cx="65" cy="100" r="20" fill="%2394a3b8"/><path d="M40 140 C 40 120, 90 120, 90 140 Z" fill="%2394a3b8"/><text x="115" y="85" fill="%23f8fafc" font-family="sans-serif" font-size="11" font-weight="bold">NIK: 3174091205900001</text><text x="115" y="105" fill="%2338bdf8" font-family="sans-serif" font-size="11" font-weight="bold">KTP SIMULASI WARGA</text><text x="115" y="125" fill="%2394a3b8" font-family="sans-serif" font-size="9">Perumahan Zalde RT 05 / RW 02</text><text x="115" y="140" fill="%2310b981" font-family="sans-serif" font-size="9" font-weight="bold">VERIFIED RESIDENT</text></svg>`;

const initialPenghuni = [
  { id: 1, nama_lengkap: "Budi Santoso", foto_ktp: defaultKtpSvg, status_penghuni: "Tetap", nomor_telepon: "081234567801", status_pernikahan: "Sudah Menikah" },
  { id: 2, nama_lengkap: "Siti Rahmawati", foto_ktp: defaultKtpSvg, status_penghuni: "Tetap", nomor_telepon: "081234567802", status_pernikahan: "Sudah Menikah" },
  { id: 3, nama_lengkap: "Ahmad Dahlan", foto_ktp: defaultKtpSvg, status_penghuni: "Tetap", nomor_telepon: "081234567803", status_pernikahan: "Sudah Menikah" },
  { id: 4, nama_lengkap: "Dewi Lestari", foto_ktp: defaultKtpSvg, status_penghuni: "Tetap", nomor_telepon: "081234567804", status_pernikahan: "Belum Menikah" },
  { id: 5, nama_lengkap: "Eko Prasetyo", foto_ktp: defaultKtpSvg, status_penghuni: "Tetap", nomor_telepon: "081234567805", status_pernikahan: "Sudah Menikah" },
  { id: 6, nama_lengkap: "Fajar Nugraha", foto_ktp: defaultKtpSvg, status_penghuni: "Tetap", nomor_telepon: "081234567806", status_pernikahan: "Sudah Menikah" },
  { id: 7, nama_lengkap: "Gita Gutawa", foto_ktp: defaultKtpSvg, status_penghuni: "Tetap", nomor_telepon: "081234567807", status_pernikahan: "Belum Menikah" },
  { id: 8, nama_lengkap: "Hendra Wijaya", foto_ktp: defaultKtpSvg, status_penghuni: "Tetap", nomor_telepon: "081234567808", status_pernikahan: "Sudah Menikah" },
  { id: 9, nama_lengkap: "Indah Permata", foto_ktp: defaultKtpSvg, status_penghuni: "Tetap", nomor_telepon: "081234567809", status_pernikahan: "Sudah Menikah" },
  { id: 10, nama_lengkap: "Joko Widodo", foto_ktp: defaultKtpSvg, status_penghuni: "Tetap", nomor_telepon: "081234567810", status_pernikahan: "Sudah Menikah" },
  { id: 11, nama_lengkap: "Kartika Putri", foto_ktp: defaultKtpSvg, status_penghuni: "Tetap", nomor_telepon: "081234567811", status_pernikahan: "Belum Menikah" },
  { id: 12, nama_lengkap: "Luki Hermawan", foto_ktp: defaultKtpSvg, status_penghuni: "Tetap", nomor_telepon: "081234567812", status_pernikahan: "Sudah Menikah" },
  { id: 13, nama_lengkap: "Maya Saputri", foto_ktp: defaultKtpSvg, status_penghuni: "Tetap", nomor_telepon: "081234567813", status_pernikahan: "Belum Menikah" },
  { id: 14, nama_lengkap: "Naufal Azhar", foto_ktp: defaultKtpSvg, status_penghuni: "Tetap", nomor_telepon: "081234567814", status_pernikahan: "Sudah Menikah" },
  { id: 15, nama_lengkap: "Oki Setiana", foto_ktp: defaultKtpSvg, status_penghuni: "Tetap", nomor_telepon: "081234567815", status_pernikahan: "Sudah Menikah" },
  { id: 16, nama_lengkap: "Rian D'Masiv", foto_ktp: defaultKtpSvg, status_penghuni: "Kontrak", nomor_telepon: "081234567816", status_pernikahan: "Belum Menikah" },
  { id: 17, nama_lengkap: "Sinta Nuria", foto_ktp: defaultKtpSvg, status_penghuni: "Kontrak", nomor_telepon: "081234567817", status_pernikahan: "Sudah Menikah" },
];

const daftarRumah = [
  "Blok A1", "Blok A2", "Blok A3", "Blok A4", "Blok A5",
  "Blok A6", "Blok A7", "Blok A8", "Blok A9", "Blok A10",
  "Blok B1", "Blok B2", "Blok B3", "Blok B4", "Blok B5",
  "Blok B6", "Blok B7", "Blok B8", "Blok B9", "Blok B10"
];

function initializeSeedData() {
  if (!localStorage.getItem(STORAGE_KEYS.PENGHUNI)) {
    localStorage.setItem(STORAGE_KEYS.PENGHUNI, JSON.stringify(initialPenghuni));
  }

  if (!localStorage.getItem(STORAGE_KEYS.RUMAH)) {
    const rumahArr = [];
    const riwayatArr = [];

    for (let i = 0; i < daftarRumah.length; i++) {
      const nomor = daftarRumah[i];
      let penghuniId = null;
      let statusHuni = "Tidak Dihuni";

      if (i < 17) {
        penghuniId = initialPenghuni[i].id;
        statusHuni = "Dihuni";
      }

      const rmhObj = {
        id: i + 1,
        nomor_rumah: nomor,
        status_huni: statusHuni,
        penghuni_id: penghuniId,
      };
      rumahArr.push(rmhObj);

      if (penghuniId) {
        riwayatArr.push({
          id: riwayatArr.length + 1,
          rumah_id: rmhObj.id,
          penghuni_id: penghuniId,
          tanggal_masuk: "2025-01-01",
          tanggal_keluar: null,
          catatan: "Penghuni awal perumahan",
        });
      }
    }
    localStorage.setItem(STORAGE_KEYS.RUMAH, JSON.stringify(rumahArr));
    localStorage.setItem(STORAGE_KEYS.RIWAYAT, JSON.stringify(riwayatArr));

    // Seed Pembayaran (Bulan 1-8 2026)
    const pembayaranArr = [];
    let pId = 1;
    const tahun = 2026;

    for (let bulan = 1; bulan <= 8; bulan++) {
      for (const rmh of rumahArr) {
        if (rmh.status_huni === "Dihuni" && rmh.penghuni_id) {
          const isPaidSatpam = !(bulan === 8 && rmh.id % 4 === 0);
          pembayaranArr.push({
            id: pId++,
            rumah_id: rmh.id,
            penghuni_id: rmh.penghuni_id,
            jenis_iuran: "Satpam",
            bulan: bulan,
            tahun: tahun,
            jumlah: 100000,
            status: isPaidSatpam ? "Lunas" : "Belum Lunas",
            tanggal_bayar: isPaidSatpam ? `${tahun}-0${bulan}-05` : null,
            catatan: isPaidSatpam ? "Pembayaran iuran satpam bulanan" : "Belum dibayar",
          });

          const isPaidKebersihan = !(bulan === 8 && rmh.id % 3 === 0);
          pembayaranArr.push({
            id: pId++,
            rumah_id: rmh.id,
            penghuni_id: rmh.penghuni_id,
            jenis_iuran: "Kebersihan",
            bulan: bulan,
            tahun: tahun,
            jumlah: 15000,
            status: isPaidKebersihan ? "Lunas" : "Belum Lunas",
            tanggal_bayar: isPaidKebersihan ? `${tahun}-0${bulan}-05` : null,
            catatan: isPaidKebersihan ? "Pembayaran iuran kebersihan bulanan" : "Belum dibayar",
          });
        }
      }
    }

    // 1-Year bulk payment for Blok A1
    for (let bulan = 9; bulan <= 12; bulan++) {
      pembayaranArr.push({
        id: pId++,
        rumah_id: 1,
        penghuni_id: 1,
        jenis_iuran: "Kebersihan",
        bulan: bulan,
        tahun: tahun,
        jumlah: 15000,
        status: "Lunas",
        tanggal_bayar: "2026-01-10",
        catatan: "Pembayaran lunas 1 tahun di depan",
      });
      pembayaranArr.push({
        id: pId++,
        rumah_id: 1,
        penghuni_id: 1,
        jenis_iuran: "Satpam",
        bulan: bulan,
        tahun: tahun,
        jumlah: 100000,
        status: "Lunas",
        tanggal_bayar: "2026-01-10",
        catatan: "Pembayaran lunas 1 tahun di depan",
      });
    }

    localStorage.setItem(STORAGE_KEYS.PEMBAYARAN, JSON.stringify(pembayaranArr));

    // Seed Pengeluaran
    const pengeluaranArr = [];
    let eId = 1;
    for (let bulan = 1; bulan <= 8; bulan++) {
      const bStr = bulan < 10 ? `0${bulan}` : `${bulan}`;
      pengeluaranArr.push({
        id: eId++,
        kategori: "Gaji Satpam",
        keterangan: "Honorarium 2 Petugas Satpam Malam & Siang",
        jumlah: 1500000,
        tanggal: `${tahun}-${bStr}-28`,
      });
      pengeluaranArr.push({
        id: eId++,
        kategori: "Listrik Pos Satpam",
        keterangan: "Biaya Token Listrik & Penerangan Pos",
        jumlah: 150000,
        tanggal: `${tahun}-${bStr}-28`,
      });

      if (bulan === 3) {
        pengeluaranArr.push({
          id: eId++,
          kategori: "Perbaikan Selokan",
          keterangan: "Pembersihan dan semen perbaikan selokan Blok A",
          jumlah: 350000,
          tanggal: `${tahun}-03-15`,
        });
      }
      if (bulan === 6) {
        pengeluaranArr.push({
          id: eId++,
          kategori: "Perbaikan Jalan",
          keterangan: "Penambalan aspal lubang depan pos satpam utama",
          jumlah: 850000,
          tanggal: `${tahun}-06-20`,
        });
      }
    }
    localStorage.setItem(STORAGE_KEYS.PENGELUARAN, JSON.stringify(pengeluaranArr));
  }
}

// Auto-run seed initialization
initializeSeedData();

// Storage Service API Methods
export const StorageService = {
  // PENGHUNI
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

    // 4. PURGE UNPAID BILLS FOR THIS DELETED RESIDENT
    let pembayaranList = JSON.parse(localStorage.getItem(STORAGE_KEYS.PEMBAYARAN) || '[]');
    pembayaranList = pembayaranList.filter(p => {
      if (p.penghuni_id === targetId && p.status === 'Belum Lunas') {
        return false; // Remove unpaid bill for deleted resident
      }
      return true;
    });
    localStorage.setItem(STORAGE_KEYS.PEMBAYARAN, JSON.stringify(pembayaranList));
  },

  // RUMAH
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

        // AUTOMATIC BILLING GENERATION FOR NEWLY ASSIGNED RESIDENT IN THIS HOUSE (Current Month & Year)
        const currentBulan = new Date().getMonth() + 1;
        const currentTahun = 2026;

        // 1. Satpam (100k)
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

        // 2. Kebersihan (15k)
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
        // If house becomes empty (unassigned), PURGE ALL UNPAID BILLS FOR THIS EMPTY HOUSE
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

  // PEMBAYARAN
  getPembayaran: (bulan, tahun, jenisFilter) => {
    let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PEMBAYARAN) || '[]');
    const rumahList = JSON.parse(localStorage.getItem(STORAGE_KEYS.RUMAH) || '[]');
    const penghuniList = JSON.parse(localStorage.getItem(STORAGE_KEYS.PENGHUNI) || '[]');

    const targetBulan = bulan && bulan !== 'All' ? Number(bulan) : 8;
    const targetTahun = tahun ? Number(tahun) : 2026;

    // AUTOMATIC SINKRONISASI TAGIHAN UNTUK SETIAP RUMAH DIHUNI
    let hasNewEntries = false;
    for (const rmh of rumahList) {
      if (rmh.status_huni === 'Dihuni' && rmh.penghuni_id) {
        // Satpam Check
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

        // Kebersihan Check
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

    // PURGE ANY ORPHAN UNPAID BILLS BELONGING TO UNASSIGNED / DELETED RESIDENTS / UNOCCUPIED HOUSES
    const validList = list.filter(p => {
      if (p.status === 'Belum Lunas') {
        const rmh = rumahList.find(r => r.id === p.rumah_id);
        const pen = penghuniList.find(pen => pen.id === p.penghuni_id);
        if (!rmh || rmh.status_huni !== 'Dihuni' || !pen || rmh.penghuni_id !== pen.id) {
          return false; // Remove orphan unpaid record!
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

  // PENGELUARAN
  getPengeluaran: (bulan, tahun) => {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PENGELUARAN) || '[]');

    let filtered = list;
    if (tahun) {
      filtered = filtered.filter(e => {
        const d = new Date(e.tanggal);
        return d.getFullYear() === Number(tahun);
      });
    }
    if (bulan && bulan !== 'All') {
      filtered = filtered.filter(e => {
        const d = new Date(e.tanggal);
        return d.getMonth() + 1 === Number(bulan);
      });
    }

    return filtered.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
  },

  addPengeluaran: (data) => {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PENGELUARAN) || '[]');
    const newEntry = {
      id: Date.now(),
      kategori: data.kategori,
      keterangan: data.keterangan,
      jumlah: Number(data.jumlah),
      tanggal: data.tanggal || new Date().toISOString().split('T')[0],
    };
    list.push(newEntry);
    localStorage.setItem(STORAGE_KEYS.PENGELUARAN, JSON.stringify(list));
    return newEntry;
  },

  deletePengeluaran: (id) => {
    let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PENGELUARAN) || '[]');
    list = list.filter(e => e.id !== Number(id));
    localStorage.setItem(STORAGE_KEYS.PENGELUARAN, JSON.stringify(list));
  },

  // LAPORAN SUMMARY & SALDO
  getLaporan: (tahunParam, bulanParam) => {
    const tahun = Number(tahunParam) || 2026;
    const bulan = bulanParam ? Number(bulanParam) : null;

    const payments = JSON.parse(localStorage.getItem(STORAGE_KEYS.PEMBAYARAN) || '[]')
      .filter(p => p.tahun === tahun && p.status === 'Lunas');

    const expenses = JSON.parse(localStorage.getItem(STORAGE_KEYS.PENGELUARAN) || '[]')
      .filter(e => new Date(e.tanggal).getFullYear() === tahun);

    const namaBulan = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    let cumulativeSaldo = 0;
    const monthlySummary = [];

    for (let m = 1; m <= 12; m++) {
      const monthPayments = payments.filter(p => p.bulan === m);
      const totalPemasukan = monthPayments.reduce((acc, p) => acc + p.jumlah, 0);

      const monthExpenses = expenses.filter(e => new Date(e.tanggal).getMonth() + 1 === m);
      const totalPengeluaran = monthExpenses.reduce((acc, e) => acc + e.jumlah, 0);

      const surplusDefisit = totalPemasukan - totalPengeluaran;
      cumulativeSaldo += surplusDefisit;

      monthlySummary.push({
        bulanIndex: m,
        namaBulan: namaBulan[m - 1],
        pemasukan: totalPemasukan,
        pengeluaran: totalPengeluaran,
        surplusDefisit,
        saldoSisa: cumulativeSaldo,
      });
    }

    let detailBulan = null;
    if (bulan) {
      const listPemasukan = StorageService.getPembayaran(bulan, tahun).filter(p => p.status === 'Lunas');
      const listPengeluaran = StorageService.getPengeluaran(bulan, tahun);

      const totalPemasukan = listPemasukan.reduce((acc, p) => acc + p.jumlah, 0);
      const totalPengeluaran = listPengeluaran.reduce((acc, e) => acc + e.jumlah, 0);

      detailBulan = {
        bulan,
        namaBulan: namaBulan[bulan - 1],
        tahun,
        totalPemasukan,
        totalPengeluaran,
        saldoBulan: totalPemasukan - totalPengeluaran,
        listPemasukan,
        listPengeluaran,
      };
    }

    const totalPemasukanTahun = payments.reduce((acc, p) => acc + p.jumlah, 0);
    const totalPengeluaranTahun = expenses.reduce((acc, e) => acc + e.jumlah, 0);

    return {
      tahun,
      totalPemasukanTahun,
      totalPengeluaranTahun,
      saldoAkhir: totalPemasukanTahun - totalPengeluaranTahun,
      monthlySummary,
      detailBulan,
    };
  },

  resetDatabase: () => {
    localStorage.removeItem(STORAGE_KEYS.PENGHUNI);
    localStorage.removeItem(STORAGE_KEYS.RUMAH);
    localStorage.removeItem(STORAGE_KEYS.RIWAYAT);
    localStorage.removeItem(STORAGE_KEYS.PEMBAYARAN);
    localStorage.removeItem(STORAGE_KEYS.PENGELUARAN);
    initializeSeedData();
  }
};
