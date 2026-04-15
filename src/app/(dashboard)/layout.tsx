"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import MobileBottomNav from "@/components/dashboard/MobileBottomNav";
import { UserProvider } from "@/lib/user-context";
import { ToastProvider } from "@/components/Toast";
import { ThemeProvider } from "@/lib/theme-context";

// Lazy-load non-critical client widgets
const CommandPalette = dynamic(() => import("@/components/CommandPalette"), { ssr: false });
const ShortcutsModal = dynamic(() => import("@/components/ShortcutsModal"), { ssr: false });
const KeyboardShortcuts = dynamic(() => import("@/components/KeyboardShortcuts"), { ssr: false });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <UserProvider>
        <ToastProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col min-w-0">
              <Header onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
              <main
                id="main-content"
                className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8"
              >
                {children}
              </main>
            </div>
            <MobileBottomNav />
            <CommandPalette />
            <ShortcutsModal />
            <KeyboardShortcuts />
          </div>
        </ToastProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
