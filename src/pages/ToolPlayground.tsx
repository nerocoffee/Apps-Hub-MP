import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight, PenTool } from 'lucide-react'
import { ToolConfig } from '../components/ToolConfig.tsx'
import { ToolPreview } from '../components/ToolPreview.tsx'
export function ToolPlayground() {
  const { toolId } = useParams()
  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Breadcrumb Header */}
      <div className="flex items-center mb-4 lg:mb-6 text-xs sm:text-sm overflow-x-auto">
        <Link
          to="/"
          className="text-slate-500 hover:text-slate-800 transition-colors whitespace-nowrap"
        >
          Dashboard
        </Link>
        <ChevronRight className="h-4 w-4 text-slate-400 mx-1 sm:mx-2 flex-shrink-0" />
        <span className="text-slate-500 whitespace-nowrap">Creative Tools</span>
        <ChevronRight className="h-4 w-4 text-slate-400 mx-1 sm:mx-2 flex-shrink-0" />
        <div className="flex items-center font-semibold text-slate-800 bg-white px-2 sm:px-3 py-1 rounded-full border border-slate-200 shadow-sm whitespace-nowrap">
          <PenTool className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 sm:mr-2 text-purple-500 flex-shrink-0" />
          <span className="hidden sm:inline">Creative Writing Assistant</span>
          <span className="sm:hidden">Writer</span>
        </div>
      </div>

      {/* Split Pane Interface - Stack on mobile, side-by-side on desktop */}
      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-6 min-h-0">
        {/* Left Panel - Configuration */}
        <div className="lg:col-span-5 min-h-[400px] lg:h-full">
          <ToolConfig />
        </div>

        {/* Right Panel - Preview */}
        <div className="lg:col-span-7 min-h-[400px] lg:h-full">
          <ToolPreview />
        </div>
      </div>
    </div>
  )
}
