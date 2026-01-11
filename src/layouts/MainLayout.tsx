import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Sidebar } from '../components/Sidebar'
import { ActivitySidebar } from '../components/ActivitySidebar'
interface MainLayoutProps {
  children: React.ReactNode
}
export function MainLayout({ children }: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  return (
    <div className="min-h-screen bg-[#e5e7eb]">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 h-10 w-10 rounded-lg bg-white border border-slate-300 shadow-md flex items-center justify-center hover:bg-slate-50 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5 text-slate-700" />
        ) : (
          <Menu className="h-5 w-5 text-slate-700" />
        )}
      </button>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/50 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Sidebar - Always visible on desktop */}
        <Sidebar onNavigate={() => setIsMobileMenuOpen(false)} />

        {/* Main Content - Add margin for right sidebar on XL */}
        <main className="flex-1 min-h-screen overflow-auto xl:mr-80">
          <div className="p-8 h-full max-w-6xl">{children}</div>
        </main>

        {/* Right Sidebar - Fixed position on XL screens */}
        <div className="hidden xl:block">
          <ActivitySidebar />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen">
        {/* Mobile Sidebar - Slide in overlay */}
        <div
          className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <Sidebar onNavigate={() => setIsMobileMenuOpen(false)} />
        </div>

        {/* Mobile Content */}
        <main className="min-h-screen">
          <div className="p-4 sm:p-6 pt-16">{children}</div>
        </main>
      </div>
    </div>
  )
}
