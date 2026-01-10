import React from 'react'
import {
  Search,
  PenTool,
  Image as ImageIcon,
  Code2,
  BarChart3,
  Video,
  Mic,
} from 'lucide-react'
import { ToolCard } from '../components/ToolCard'
import { Input } from '../components/ui/Input'
export function Dashboard() {
  const tools = [
    {
      id: 'writer',
      title: 'Creative Writing Assistant',
      description:
        'Generate blog posts, stories, and marketing copy with advanced AI models.',
      icon: PenTool,
      status: 'active' as const,
      color: 'bg-purple-500',
    },
    {
      id: 'ocr',
      title: 'Image OCR Tool',
      description:
        'Extract text from images and documents with high precision.',
      icon: ImageIcon,
      status: 'active' as const,
      color: 'bg-blue-500',
    },
    {
      id: 'code',
      title: 'Code Generator',
      description:
        'Convert natural language to production-ready code in multiple languages.',
      icon: Code2,
      status: 'beta' as const,
      color: 'bg-emerald-500',
    },
    {
      id: 'data',
      title: 'Data Analyzer',
      description:
        'Visualize complex datasets and generate actionable insights instantly.',
      icon: BarChart3,
      status: 'new' as const,
      color: 'bg-amber-500',
    },
    {
      id: 'video',
      title: 'Video Editor',
      description:
        'Automated video trimming, captioning, and enhancement tools.',
      icon: Video,
      status: 'active' as const,
      color: 'bg-rose-500',
    },
    {
      id: 'audio',
      title: 'Audio Transcriber',
      description:
        'Convert speech to text with speaker detection and timestamping.',
      icon: Mic,
      status: 'active' as const,
      color: 'bg-cyan-500',
    },
  ]
  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Welcome back, Alex
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
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm"
            placeholder="Search tools, projects, or files..."
          />
        </div>
      </div>

      {/* Tools Grid - 2 columns on XL (when right sidebar visible), 3 columns on LG */}
      <div>
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">
            Your Tools
          </h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4 lg:gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-2 gap-4 lg:gap-6">
        <div className="lg:col-span-2 xl:col-span-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-lg sm:text-xl font-bold mb-2">
              Pro Plan Features Unlocked
            </h3>
            <p className="text-blue-100 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
              You have access to advanced models and unlimited generation. Check
              out the new Video Editor tool.
            </p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors">
              Explore New Features
            </button>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
            <PenTool className="h-48 w-48 sm:h-64 sm:w-64" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
            <BarChart3 className="h-6 w-6 text-emerald-600" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm sm:text-base">
            Usage This Month
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 my-2">
            84%
          </p>
          <p className="text-xs text-slate-500">of monthly credits used</p>
        </div>
      </div>
    </div>
  )
}
