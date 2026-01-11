import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Grid, FolderOpen, Settings, User } from 'lucide-react'
interface SidebarProps {
  onNavigate?: () => void
}
export function Sidebar({ onNavigate }: SidebarProps) {
  const navItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/',
    },
    {
      icon: Grid,
      label: 'My Tools',
      path: '/tools',
    },
    {
      icon: FolderOpen,
      label: 'Content Library',
      path: '/library',
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/settings',
    },
  ]
  return (
    <aside className="w-64 bg-[#e5e7eb] border-r border-slate-300 flex flex-col h-screen">
      {/* Branding */}
      <div className="h-16 flex items-center px-6 border-b border-slate-300/50">
        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
          <Grid className="h-5 w-5 text-white" />
        </div>
        <span className="font-bold text-lg text-slate-800 tracking-tight">
          Content Hub
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${isActive ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'}`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`mr-3 h-5 w-5 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-500 group-hover:text-slate-700'}`}
                />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-300/50">
        <div className="flex items-center p-2 rounded-lg bg-slate-200/50 border border-slate-300/50 hover:bg-slate-200 transition-colors cursor-pointer">
          <div className="h-10 w-10 rounded-full bg-slate-300 flex items-center justify-center overflow-hidden border border-slate-300">
            <User className="h-6 w-6 text-slate-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold text-slate-800">Alex Chen</p>
            <p className="text-xs font-medium text-blue-600">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
