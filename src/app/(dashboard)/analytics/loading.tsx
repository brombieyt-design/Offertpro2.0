export default function AnalyticsLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div>
        <div className="h-7 w-24 bg-gray-200 rounded-lg" />
        <div className="h-4 w-56 bg-gray-100 rounded mt-2" />
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-5"
          >
            <div className="h-3 w-16 bg-gray-100 rounded mb-3" />
            <div className="h-7 w-20 bg-gray-200 rounded mb-1" />
            <div className="h-3 w-24 bg-gray-50 rounded" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-7">
          <div className="h-5 w-40 bg-gray-200 rounded mb-6" />
          <div className="h-56 bg-gray-50 rounded-xl" />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-7">
          <div className="h-5 w-32 bg-gray-200 rounded mb-6" />
          <div className="h-56 bg-gray-50 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
