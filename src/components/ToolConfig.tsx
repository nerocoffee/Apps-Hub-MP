import React, { useState } from 'react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Label } from './ui/Label'
import { ChevronDown, ChevronUp, Sparkles, Upload } from 'lucide-react'
export function ToolConfig() {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
        <h2 className="font-semibold text-slate-800">Configuration</h2>
        <p className="text-xs text-slate-500">
          Customize your generation parameters
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Essentials Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Essentials
          </h3>

          <div className="space-y-2">
            <Label htmlFor="topic">Topic or Prompt</Label>
            <textarea
              id="topic"
              className="w-full min-h-[100px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Describe what you want to write about..."
              defaultValue="A science fiction story about a robot who discovers gardening."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <div className="relative">
              <select
                id="tone"
                className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Professional</option>
                <option>Casual</option>
                <option>Enthusiastic</option>
                <option>Witty</option>
                <option>Dramatic</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-slate-500 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="format">Format</Label>
            <div className="grid grid-cols-2 gap-2">
              <button className="px-3 py-2 rounded-lg border border-blue-500 bg-blue-50 text-blue-700 text-sm font-medium">
                Blog Post
              </button>
              <button className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-medium">
                Social Caption
              </button>
              <button className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-medium">
                Email
              </button>
              <button className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-medium">
                Story
              </button>
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <Label>Reference Material (Optional)</Label>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-blue-400 hover:bg-blue-50/30 transition-colors cursor-pointer">
            <Upload className="h-8 w-8 text-slate-400 mb-2" />
            <p className="text-sm font-medium text-slate-700">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-slate-500 mt-1">
              PDF, TXT, or DOCX up to 10MB
            </p>
          </div>
        </div>

        {/* Collapsible Advanced Settings */}
        <div className="border-t border-slate-100 pt-4">
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Advanced Settings
            </h3>
            {isAdvancedOpen ? (
              <ChevronUp className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            )}
          </button>

          {isAdvancedOpen && (
            <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="length">Max Length</Label>
                  <span className="text-xs text-slate-500">1,500 words</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  defaultValue="1500"
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="seo" className="cursor-pointer">
                  SEO Optimization
                </Label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    name="seo"
                    id="seo"
                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 right-5 checked:border-blue-500"
                  />
                  <label
                    htmlFor="seo"
                    className="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 cursor-pointer checked:bg-blue-500"
                  ></label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-slate-100 bg-white">
        <Button
          className="w-full h-12 text-base shadow-md shadow-blue-500/20"
          variant="primary"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Generate Content
        </Button>
      </div>
    </div>
  )
}
