import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Wallet,
  TrendingUp,
  TrendingDown,
  CreditCard,
  PlusCircle,
  ShieldCheck,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Check
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { StorageService } from '../services/storage';

const namaBulanList = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

// Custom Glassmorphism Tooltip for Recharts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-slate-700/60 space-y-2 text-xs min-w-[210px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <p className="font-extrabold text-white text-sm">{label}</p>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Kas RT</span>
        </div>
        <div className="space-y-1.5 pt-0.5">
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                <span className="text-slate-300 font-medium">{entry.name}:</span>
              </div>
              <span className="font-extrabold" style={{ color: entry.color }}>
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(entry.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [tahun, setTahun] = useState(2026);
  const [selectedBulan, setSelectedBulan] = useState(8); // Default bulan 8 (Agustus)
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
    
    // Filter unpaid items and GROUP BY HOUSE
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

    const groupedUnpaid = Array.from(groupedMap.values());

    setLaporanData(lap);
    setListRumah(rmh);
    setUnpaidList(groupedUnpaid);
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

    // Settle all unpaid items for this house in 1 click
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

  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  const rumahDihuniCount = listRumah.filter(r => r.status_huni === 'Dihuni').length;
  const rumahKosongCount = listRumah.filter(r => r.status_huni === 'Tidak Dihuni').length;
  const totalTunggakanKeseluruhan = unpaidList.reduce((acc, g) => acc + g.totalTunggakan, 0);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Executive Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-slate-200 text-xs font-semibold backdrop-blur-md mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Portal Administrasi & Keuangan RT
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Selamat Datang, Bapak Ketua RT
            </h1>
            <p className="mt-1.5 text-slate-300 text-sm max-w-2xl font-normal leading-relaxed">
              Perumahan Zalde — Total 20 Rumah (15 Penghuni Tetap & 5 Rumah Kontrak/Kosong). 
              Tarif Iuran: Satpam <span className="font-extrabold text-emerald-400">Rp 100.000/bln</span> & Kebersihan <span className="font-extrabold text-emerald-400">Rp 15.000/bln</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/pembayaran"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-all shadow-md active:scale-95"
            >
              <CreditCard className="w-4 h-4 text-slate-950" /> Catat Pembayaran
            </Link>
            <Link
              to="/pengeluaran"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/20 transition-all active:scale-95 backdrop-blur-md"
            >
              <PlusCircle className="w-4 h-4 text-white" /> Catat Pengeluaran
            </Link>
          </div>
        </div>
      </div>

      {/* Minimalist Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Saldo Sisa */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Saldo Sisa Saat Ini</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/60">
              <Wallet className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {formatRupiah(laporanData?.saldoAkhir)}
            </div>
            <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" /> Akumulasi Surplus Kas RT
            </p>
          </div>
        </div>

        {/* Card 2: Total Pemasukan */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Pemasukan ({tahun})</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200/60">
              <TrendingUp className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-indigo-600 tracking-tight">
              {formatRupiah(laporanData?.totalPemasukanTahun)}
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Iuran Satpam & Kebersihan</p>
          </div>
        </div>

        {/* Card 3: Total Pengeluaran */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Pengeluaran ({tahun})</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200/60">
              <TrendingDown className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-rose-600 tracking-tight">
              {formatRupiah(laporanData?.totalPengeluaranTahun)}
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Gaji Satpam, Listrik, Perbaikan</p>
          </div>
        </div>

        {/* Card 4: Status Hunian Rumah */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hunian 20 Rumah</span>
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200/60">
              <Building2 className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">{rumahDihuniCount}</span>
            <span className="text-xs text-emerald-600 font-bold">Dihuni</span>
            <span className="text-slate-300">/</span>
            <span className="text-xs text-amber-600 font-bold">{rumahKosongCount} Kosong</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full transition-all duration-500"
              style={{ width: `${(rumahDihuniCount / 20) * 100}%` }}
            />
            <div
              className="bg-amber-500 h-full transition-all duration-500"
              style={{ width: `${(rumahKosongCount / 20) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Minimalist Recharts Area Chart */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              Grafik Tren Keuangan Bulanan ({tahun})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 font-normal">
              Visualisasi kontinyu Pemasukan (Iuran), Pengeluaran, dan Akumulasi Saldo Sisa.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-500">Tahun:</label>
            <select
              value={tahun}
              onChange={(e) => setTahun(Number(e.target.value))}
              className="bg-slate-50 border border-slate-300/80 text-slate-800 text-xs rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
            >
              <option value={2026}>2026</option>
              <option value={2025}>2025</option>
            </select>
          </div>
        </div>

        <div className="h-72 sm:h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              key={`chart-${tahun}-${laporanData?.monthlySummary?.length || 0}`}
              data={laporanData?.monthlySummary || []}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                {/* Saldo Area Fill Gradient: Soft Emerald Area Glow */}
                <linearGradient id="saldoAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.30} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.01} />
                </linearGradient>

                {/* Pemasukan Gradient: Vibrant Indigo Blue */}
                <linearGradient id="pemasukanAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.20} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.01} />
                </linearGradient>

                {/* Pengeluaran Gradient: Coral Pink to Rose Red */}
                <linearGradient id="pengeluaranAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.20} />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.01} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="namaBulan"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={10}
                tickFormatter={(v) => `Rp ${(v / 1000).toLocaleString('id-ID')}k`}
                tickLine={false}
                axisLine={false}
              />
              
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 600 }}
                iconType="circle"
              />

              {/* Smooth Area Curve for Pemasukan */}
              <Area
                type="monotone"
                dataKey="pemasukan"
                name="Pemasukan (Iuran)"
                fill="url(#pemasukanAreaGradient)"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ fill: '#6366f1', r: 4, stroke: '#ffffff', strokeWidth: 2 }}
                activeDot={{ r: 7, fill: '#6366f1', stroke: '#ffffff', strokeWidth: 2 }}
                isAnimationActive={true}
                animationDuration={2200}
                animationEasing="ease-in-out"
                animationBegin={200}
              />

              {/* Smooth Area Curve for Pengeluaran */}
              <Area
                type="monotone"
                dataKey="pengeluaran"
                name="Pengeluaran"
                fill="url(#pengeluaranAreaGradient)"
                stroke="#f43f5e"
                strokeWidth={3}
                dot={{ fill: '#f43f5e', r: 4, stroke: '#ffffff', strokeWidth: 2 }}
                activeDot={{ r: 7, fill: '#f43f5e', stroke: '#ffffff', strokeWidth: 2 }}
                isAnimationActive={true}
                animationDuration={2400}
                animationEasing="ease-in-out"
                animationBegin={350}
              />

              {/* Glowing Curved Area for Akumulasi Saldo Sisa */}
              <Area
                type="monotone"
                dataKey="saldoSisa"
                name="Akumulasi Saldo Sisa"
                fill="url(#saldoAreaGradient)"
                stroke="#10b981"
                strokeWidth={3.5}
                dot={{ fill: '#10b981', r: 4.5, stroke: '#ffffff', strokeWidth: 2 }}
                activeDot={{ r: 8, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }}
                isAnimationActive={true}
                animationDuration={2600}
                animationEasing="ease-in-out"
                animationBegin={500}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABEL WARGA YANG BELUM LUNAS IURAN (GROUPED PER HOUSE) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              Daftar Penagihan & Warga Belum Lunas (Bulan Ini)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 font-normal">
              Daftar unit rumah dihuni yang belum melunasi iuran bulanan (Satpam 100k / Kebersihan 15k).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-500">Bulan:</label>
              <select
                value={selectedBulan}
                onChange={(e) => setSelectedBulan(Number(e.target.value))}
                className="bg-slate-50 border border-slate-300/80 text-slate-800 text-xs rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-slate-900 outline-none font-semibold"
              >
                {namaBulanList.map((m, idx) => (
                  <option key={idx + 1} value={idx + 1}>{m}</option>
                ))}
              </select>
            </div>

            <div className="bg-rose-50/80 px-3 py-1.5 rounded-xl border border-rose-200/80 text-rose-700 text-xs font-bold flex items-center gap-1.5">
              <span>{unpaidList.length} Rumah Belum Lunas</span>
              <span className="text-rose-300">|</span>
              <span>Total: {formatRupiah(totalTunggakanKeseluruhan)}</span>
            </div>
          </div>
        </div>

        {unpaidList.length === 0 ? (
          <div className="py-12 text-center bg-emerald-50/50 rounded-2xl border border-emerald-200/60 text-emerald-800 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-sm font-bold">Semua Penghuni Telah Melunasi Iuran Bulan Ini!</h3>
            <p className="text-xs text-emerald-700">
              Tidak ada tunggakan iuran satpam maupun kebersihan untuk bulan {namaBulanList[selectedBulan - 1]} {tahun}.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 min-w-[650px]">
              <thead className="bg-slate-50 uppercase font-bold text-[11px] text-slate-400 tracking-wider border-b border-slate-200/80">
                <tr>
                  <th className="px-5 py-3.5">Unit Rumah</th>
                  <th className="px-5 py-3.5">Nama Penghuni</th>
                  <th className="px-5 py-3.5">Status Penghuni</th>
                  <th className="px-5 py-3.5">Jenis Iuran Belum Lunas</th>
                  <th className="px-5 py-3.5">Total Nominal Tunggakan</th>
                  <th className="px-5 py-3.5">Status Bayar</th>
                  <th className="px-5 py-3.5 text-right">Aksi Pelunasan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {unpaidList.map((group) => {
                  const hasSatpam = group.jenisList.includes('Satpam');
                  const hasKebersihan = group.jenisList.includes('Kebersihan');

                  return (
                    <tr key={group.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4 font-extrabold text-slate-900">
                        {group.rumah?.nomor_rumah}
                      </td>
                      <td className="px-5 py-4 font-bold text-slate-800">
                        {group.penghuni?.nama_lengkap}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            group.penghuni?.status_penghuni === 'Tetap'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                              : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                          }`}
                        >
                          {group.penghuni?.status_penghuni}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-800">
                        {hasSatpam && hasKebersihan ? (
                          <span className="text-slate-800 font-bold bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                            🛡️ Satpam & 🧹 Kebersihan
                          </span>
                        ) : hasSatpam ? (
                          <span className="text-indigo-700 font-bold">🛡️ Satpam (100k)</span>
                        ) : (
                          <span className="text-emerald-700 font-bold">🧹 Kebersihan (15k)</span>
                        )}
                      </td>
                      <td className="px-5 py-4 font-extrabold text-rose-600 text-sm">
                        {formatRupiah(group.totalTunggakan)}
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10px] bg-rose-50 text-rose-700 border border-rose-200/60">
                          <XCircle className="w-3.5 h-3.5" /> Belum Lunas
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => handleOpenQuickPay(group)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-xs active:scale-95"
                        >
                          <Check className="w-3.5 h-3.5" /> Pelunasan Sekarang
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Pay Modal */}
      {payModal && targetPayGroup && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/80 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Konfirmasi Pelunasan Iuran
              </h2>
              <button
                onClick={() => setPayModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Unit Rumah:</span>
                <span className="font-extrabold text-slate-900">{targetPayGroup.rumah?.nomor_rumah}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nama Penghuni:</span>
                <span className="font-bold text-slate-800">{targetPayGroup.penghuni?.nama_lengkap} ({targetPayGroup.penghuni?.status_penghuni})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tagihan Iuran:</span>
                <span className="font-semibold text-slate-800">
                  {targetPayGroup.jenisList.join(' & ')} ({namaBulanList[targetPayGroup.bulan - 1]} {targetPayGroup.tahun})
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200/80 text-sm">
                <span className="font-bold text-slate-700">Total Nominal Lunas:</span>
                <span className="font-extrabold text-emerald-600">{formatRupiah(targetPayGroup.totalTunggakan)}</span>
              </div>
            </div>

            <form onSubmit={handleConfirmQuickPay} className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPayModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md active:scale-95"
              >
                Proses Pelunasan ({formatRupiah(targetPayGroup.totalTunggakan)})
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
