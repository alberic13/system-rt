import { STORAGE_KEYS } from './storageKeys';

export const defaultKtpSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="180" viewBox="0 0 300 180" fill="none"><rect width="300" height="180" rx="12" fill="%231e293b"/><rect x="15" y="15" width="270" height="150" rx="8" fill="%230f172a" stroke="%2338bdf8" stroke-width="2"/><text x="30" y="40" fill="%2338bdf8" font-family="sans-serif" font-size="14" font-weight="bold">PROVINSI DKI JAKARTA</text><text x="30" y="55" fill="%2338bdf8" font-family="sans-serif" font-size="11">KOTA JAKARTA SELATAN</text><rect x="30" y="70" width="70" height="80" rx="6" fill="%23334155"/><circle cx="65" cy="100" r="20" fill="%2394a3b8"/><path d="M40 140 C 40 120, 90 120, 90 140 Z" fill="%2394a3b8"/><text x="115" y="85" fill="%23f8fafc" font-family="sans-serif" font-size="11" font-weight="bold">NIK: 3174091205900001</text><text x="115" y="105" fill="%2338bdf8" font-family="sans-serif" font-size="11" font-weight="bold">KTP SIMULASI WARGA</text><text x="115" y="125" fill="%2394a3b8" font-family="sans-serif" font-size="9">Perumahan Zalde RT 05 / RW 02</text><text x="115" y="140" fill="%2310b981" font-family="sans-serif" font-size="9" font-weight="bold">VERIFIED RESIDENT</text></svg>`;

export const initialPenghuni = [
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

export const daftarRumah = [
  "Blok A1", "Blok A2", "Blok A3", "Blok A4", "Blok A5",
  "Blok A6", "Blok A7", "Blok A8", "Blok A9", "Blok A10",
  "Blok B1", "Blok B2", "Blok B3", "Blok B4", "Blok B5",
  "Blok B6", "Blok B7", "Blok B8", "Blok B9", "Blok B10"
];

export function initializeSeedData() {
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
