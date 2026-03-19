"use client";

import { Menu, Search, Bell, HelpCircle } from "lucide-react";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100/60 px-6 sm:px-10 py-5">
      <div className="flex items-center justify-between gap-4">
        {/* Hamburger (mobile) */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2.5 -ml-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all duration-300"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <div className="hidden sm:flex flex-1 max-w-lg">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Sök offerter, kunder..."
              className="w-full pl-11 pr-5 py-3 text-sm bg-gray-50/60 border border-gray-200/60 rounded-full focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white shadow-sm hover:shadow transition-all duration-300 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          <button className="relative p-2.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 hover:shadow-sm transition-all duration-300">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>
          <button className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 hover:shadow-sm transition-all duration-300">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
