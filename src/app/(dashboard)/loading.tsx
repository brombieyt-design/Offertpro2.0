export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-48 bg-gray-200 rounded-lg" />
          <div className="h-4 w-32 bg-gray-100 rounded mt-2" />
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded-full" />
      </div>

      {/* KPI cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 w-20 bg-gray-100 rounded" />
              <div className="h-10 w-10 bg-gray-100 rounded-xl" />
            </div>
            <div className="h-8 w-28 bg-gray-200 rounded-lg mb-2" />
            <div className="h-3 w-24 bg-gray-100 rounded" />
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-7">
          <div className="h-5 w-32 bg-gray-200 rounded mb-6" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-10 w-10 bg-gray-100 rounded-full shrink-0" />
                <div className="flex-1">
                  <div className="h-4 w-3/4 bg-gray-100 rounded mb-1.5" />
                  <div className="h-3 w-1/2 bg-gray-50 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-7">
          <div className="h-5 w-40 bg-gray-200 rounded mb-6" />
          <div className="h-48 bg-gray-50 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
