"use client";

import { Menu, Search, Bell, HelpCircle } from "lucide-react";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3.5">
      <div className="flex items-center justify-between gap-4">
        {/* Hamburger (mobile) */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 text-gray-500"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <div className="hidden sm:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Sök offerter, kunder..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
