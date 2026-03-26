import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <span className="text-8xl font-bold bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">
            404
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Sidan hittades inte
        </h1>
        <p className="text-gray-500 mb-8">
          Sidan du letar efter finns inte eller har flyttats. Kontrollera
          adressen eller gå tillbaka till startsidan.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-full transition-all shadow-sm"
          >
            Till startsidan
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-full transition-all"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
