"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { UserProvider } from "@/lib/user-context";
import { ToastProvider } from "@/components/Toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <UserProvider>
      <ToastProvider>
        <div className="flex h-screen overflow-hidden">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="flex-1 flex flex-col min-w-0">
            <Header onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
            <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </div>
      </ToastProvider>
    </UserProvider>
  );
}
