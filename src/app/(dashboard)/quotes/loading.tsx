export default function QuotesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-32 bg-gray-200 rounded-lg" />
          <div className="h-4 w-48 bg-gray-100 rounded mt-2" />
        </div>
        <div className="h-10 w-28 bg-brand-200 rounded-full" />
      </div>

      {/* Filter tabs skeleton */}
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-9 w-20 bg-gray-100 rounded-full" />
        ))}
      </div>

      {/* Table skeleton */}
      <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="h-4 w-24 bg-gray-100 rounded" />
        </div>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="px-6 py-4 border-b border-gray-50 flex items-center gap-4"
          >
            <div className="h-4 w-24 bg-gray-100 rounded" />
            <div className="h-4 w-32 bg-gray-100 rounded flex-1" />
            <div className="h-4 w-20 bg-gray-100 rounded" />
            <div className="h-6 w-16 bg-gray-100 rounded-full" />
            <div className="h-4 w-24 bg-gray-50 rounded hidden md:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
