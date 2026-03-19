import { Plus, Users, Building2, Phone, MapPin } from "lucide-react";
import { customers } from "@/lib/mock-data";

const withCompany = customers.filter((c) => c.company);
const withPhone = customers.filter((c) => c.phone);
const withAddress = customers.filter((c) => c.address);

const clientStats = [
  {
    label: "Totala kunder",
    value: customers.length,
    icon: Users,
    color: "text-indigo-600 bg-indigo-50",
  },
  {
    label: "Med företag",
    value: withCompany.length,
    icon: Building2,
    color: "text-blue-600 bg-blue-50",
  },
  {
    label: "Med telefon",
    value: withPhone.length,
    icon: Phone,
    color: "text-green-600 bg-green-50",
  },
  {
    label: "Med adress",
    value: withAddress.length,
    icon: MapPin,
    color: "text-purple-600 bg-purple-50",
  },
];

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Kunder</h1>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors">
          <Plus className="w-4 h-4" />
          Ny kund
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {clientStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table */}
      {customers.length > 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Namn
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Företag
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    E-post
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Telefon
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Stad
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-gray-900">
                      {customer.name}
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">
                      {customer.company || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 hidden sm:table-cell">
                      {customer.email}
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 hidden md:table-cell">
                      {customer.phone || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 hidden lg:table-cell">
                      {customer.city || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-16 px-6 text-center">
          <div className="mx-auto w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
            <Users className="w-7 h-7 text-gray-400" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            Inga kunder ännu
          </h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
            Lägg till din första kund för att komma igång med offerter och fakturor.
          </p>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors">
            <Plus className="w-4 h-4" />
            Ny kund
          </button>
        </div>
      )}
    </div>
  );
}
