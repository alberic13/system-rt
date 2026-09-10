import { STORAGE_KEYS } from './storageKeys';

export const pengeluaranService = {
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
};
