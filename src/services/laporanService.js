import { STORAGE_KEYS } from './storageKeys';
import { pembayaranService } from './pembayaranService';
import { pengeluaranService } from './pengeluaranService';
import { namaBulanList } from '../utils/formatters';

export const laporanService = {
  getLaporan: (tahunParam, bulanParam) => {
    const tahun = Number(tahunParam) || 2026;
    const bulan = bulanParam ? Number(bulanParam) : null;

    const payments = JSON.parse(localStorage.getItem(STORAGE_KEYS.PEMBAYARAN) || '[]')
      .filter(p => p.tahun === tahun && p.status === 'Lunas');

    const expenses = JSON.parse(localStorage.getItem(STORAGE_KEYS.PENGELUARAN) || '[]')
      .filter(e => new Date(e.tanggal).getFullYear() === tahun);

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
        namaBulan: namaBulanList[m - 1],
        pemasukan: totalPemasukan,
        pengeluaran: totalPengeluaran,
        surplusDefisit,
        saldoSisa: cumulativeSaldo,
      });
    }

    let detailBulan = null;
    if (bulan) {
      const listPemasukan = pembayaranService.getPembayaran(bulan, tahun).filter(p => p.status === 'Lunas');
      const listPengeluaran = pengeluaranService.getPengeluaran(bulan, tahun);

      const totalPemasukan = listPemasukan.reduce((acc, p) => acc + p.jumlah, 0);
      const totalPengeluaran = listPengeluaran.reduce((acc, e) => acc + e.jumlah, 0);

      detailBulan = {
        bulan,
        namaBulan: namaBulanList[bulan - 1],
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
};
