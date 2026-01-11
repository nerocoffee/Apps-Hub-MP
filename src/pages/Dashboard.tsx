import React, { useState, useMemo } from 'react'
import {
  Search,
  PenTool,
  BarChart3,
} from 'lucide-react'
import { ToolCard } from '../components/ToolCard'
import { Input } from '../components/ui/Input'
import { useTools } from '../hooks/useTools'
import { useAuth } from '../hooks/useAuth'
import { getIconComponent } from '../lib/iconMapping'

export function Dashboard() {
  const { tools, loading: toolsLoading } = useTools()
  const { profile, loading: authLoading } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')

  // Filter tools based on search query
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return tools

    const query = searchQuery.toLowerCase()
    return tools.filter(
      (tool) =>
        tool.title.toLowerCase().includes(query) ||
        tool.description?.toLowerCase().includes(query) ||
        tool.category?.toLowerCase().includes(query)
    )
  }, [tools, searchQuery])

  // Calculate usage percentage
  const usagePercentage = useMemo(() => {
    if (!profile) return 0
    return Math.round((profile.credits_used / profile.credits_limit) * 100)
  }, [profile])

  // Map tools from database to component props
  const toolsWithIcons = useMemo(() => {
    return filteredTools.map((tool) => ({
      id: tool.id,
      title: tool.title,
      description: tool.description || '',
      icon: getIconComponent(tool.icon),
      status: tool.status,
      color: tool.color || 'bg-slate-500',
    }))
  }, [filteredTools])

  // Get user's display name
  const displayName = profile?.full_name || profile?.username || 'User'

  // Get plan display
  const planDisplay = profile?.plan_type
    ? profile.plan_type.charAt(0).toUpperCase() + profile.plan_type.slice(1)
    : 'Free'
  // Show loading state
  if (toolsLoading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-slate-500 mt-4">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Welcome back, {displayName}
          </h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            Here's what's happening with your projects today.
          </p>
        </div>

        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm"
            placeholder="Search tools, projects, or files..."
          />
        </div>
      </div>

      {/* Tools Grid - 2 columns on XL (when right sidebar visible), 3 columns on LG */}
      <div>
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">
            Your Tools {searchQuery && `(${toolsWithIcons.length} results)`}
          </h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View All
          </button>
        </div>

        {toolsWithIcons.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
            <p className="text-slate-500">
              {searchQuery
                ? 'No tools found matching your search.'
                : 'No tools available yet.'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4 lg:gap-6">
            {toolsWithIcons.map((tool) => (
              <ToolCard key={tool.id} {...tool} />
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-2 gap-4 lg:gap-6">
        <div className="lg:col-span-2 xl:col-span-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-lg sm:text-xl font-bold mb-2">
              {planDisplay} Plan Features {profile?.plan_type !== 'free' ? 'Unlocked' : 'Available'}
            </h3>
            <p className="text-blue-100 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
              {profile?.plan_type === 'free'
                ? 'Upgrade to Pro for advanced models and unlimited generation. Check out our premium features.'
                : 'You have access to advanced models and unlimited generation. Check out the new Video Editor tool.'}
            </p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors">
              {profile?.plan_type === 'free' ? 'Upgrade Now' : 'Explore New Features'}
            </button>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
            <PenTool className="h-48 w-48 sm:h-64 sm:w-64" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-center items-center text-center">
          <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-3 ${
            usagePercentage >= 90
              ? 'bg-red-100'
              : usagePercentage >= 70
              ? 'bg-amber-100'
              : 'bg-emerald-100'
          }`}>
            <BarChart3 className={`h-6 w-6 ${
              usagePercentage >= 90
                ? 'text-red-600'
                : usagePercentage >= 70
                ? 'text-amber-600'
                : 'text-emerald-600'
            }`} />
          </div>
          <h3 className="font-bold text-slate-800 text-sm sm:text-base">
            Usage This Month
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 my-2">
            {usagePercentage}%
          </p>
          <p className="text-xs text-slate-500">
            {profile?.credits_used || 0} / {profile?.credits_limit || 0} credits used
          </p>
        </div>
      </div>
    </div>
  )
}
