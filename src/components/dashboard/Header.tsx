"use client";

import { Menu, Search, Bell, HelpCircle } from "lucide-react";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Sök offerter, kunder..."
              className="w-full pl-9 pr-4 py-2 text-[13px] bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:bg-white transition-colors placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger-500 rounded-full ring-2 ring-white" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <HelpCircle className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </header>
  );
}
