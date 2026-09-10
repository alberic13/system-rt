import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CreditCard, PlusCircle } from 'lucide-react';

export default function HeroBanner() {
  return (
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
  );
}
