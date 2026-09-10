export const namaBulanList = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export const formatRupiah = (val) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(val || 0);
};

export const generateKtpSvg = (nama, nik) => {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="180" viewBox="0 0 300 180" fill="none"><rect width="300" height="180" rx="12" fill="%23f8fafc"/><rect x="15" y="15" width="270" height="150" rx="8" fill="%23ffffff" stroke="%230f172a" stroke-width="2"/><text x="30" y="40" fill="%230f172a" font-family="sans-serif" font-size="14" font-weight="bold">PROVINSI DKI JAKARTA</text><text x="30" y="55" fill="%2364748b" font-family="sans-serif" font-size="11">KOTA JAKARTA SELATAN</text><rect x="30" y="70" width="70" height="80" rx="6" fill="%23e2e8f0"/><circle cx="65" cy="100" r="20" fill="%2394a3b8"/><path d="M40 140 C 40 120, 90 120, 90 140 Z" fill="%2394a3b8"/><text x="115" y="85" fill="%230f172a" font-family="sans-serif" font-size="11" font-weight="bold">NIK: ${nik}</text><text x="115" y="105" fill="%230f172a" font-family="sans-serif" font-size="11" font-weight="bold">${nama.substring(0, 18)}</text><text x="115" y="125" fill="%2364748b" font-family="sans-serif" font-size="9">Perumahan Zalde RT 05 / RW 02</text><text x="115" y="140" fill="%23059669" font-family="sans-serif" font-size="9" font-weight="bold">VERIFIED RESIDENT</text></svg>`;
};
