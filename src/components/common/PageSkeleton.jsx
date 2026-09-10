import React from 'react';

export default function PageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Memuat halaman...">
      {/* Top Banner / Header Skeleton */}
      <div className="h-28 sm:h-36 bg-slate-200/80 rounded-2xl sm:rounded-3xl w-full"></div>

      {/* Metric Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 sm:h-28 bg-white border border-slate-200/70 rounded-2xl p-4 space-y-3">
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-6 bg-slate-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      {/* Main Content Table/Chart Skeleton */}
      <div className="h-80 bg-white border border-slate-200/70 rounded-2xl sm:rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-5 bg-slate-200 rounded w-1/4"></div>
          <div className="h-8 bg-slate-200 rounded w-28"></div>
        </div>
        <div className="space-y-3 pt-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-slate-100 rounded-xl w-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
