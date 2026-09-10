import { STORAGE_KEYS } from './storageKeys';
import { initializeSeedData } from './seedData';
import { penghuniService } from './penghuniService';
import { rumahService } from './rumahService';
import { pembayaranService } from './pembayaranService';
import { pengeluaranService } from './pengeluaranService';
import { laporanService } from './laporanService';

// Auto-run seed initialization
initializeSeedData();

// Storage Service Facade
export const StorageService = {
  // Penghuni
  getPenghuni: penghuniService.getPenghuni,
  addPenghuni: penghuniService.addPenghuni,
  updatePenghuni: penghuniService.updatePenghuni,
  deletePenghuni: penghuniService.deletePenghuni,

  // Rumah & Riwayat
  getRumah: rumahService.getRumah,
  getRumahById: rumahService.getRumahById,
  getRiwayatByRumahId: rumahService.getRiwayatByRumahId,
  addRiwayat: rumahService.addRiwayat,
  deleteRiwayat: rumahService.deleteRiwayat,
  addRumah: rumahService.addRumah,
  updateRumah: rumahService.updateRumah,

  // Pembayaran
  getPembayaran: pembayaranService.getPembayaran,
  updateStatusPembayaran: pembayaranService.updateStatusPembayaran,
  addPembayaranBulk: pembayaranService.addPembayaranBulk,

  // Pengeluaran
  getPengeluaran: pengeluaranService.getPengeluaran,
  addPengeluaran: pengeluaranService.addPengeluaran,
  deletePengeluaran: pengeluaranService.deletePengeluaran,

  // Laporan
  getLaporan: laporanService.getLaporan,

  // Database Reset
  resetDatabase: () => {
    localStorage.removeItem(STORAGE_KEYS.PENGHUNI);
    localStorage.removeItem(STORAGE_KEYS.RUMAH);
    localStorage.removeItem(STORAGE_KEYS.RIWAYAT);
    localStorage.removeItem(STORAGE_KEYS.PEMBAYARAN);
    localStorage.removeItem(STORAGE_KEYS.PENGELUARAN);
    initializeSeedData();
  },
};

export { STORAGE_KEYS };
