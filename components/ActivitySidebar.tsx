import React from 'react'
import {
  Clock,
  CheckCircle2,
  FileText,
  Zap,
  Image as ImageIcon,
} from 'lucide-react'
export function ActivitySidebar() {
  const activities = [
    {
      id: 1,
      type: 'generate',
      text: "Generated image 'Sunset'",
      time: '2 mins ago',
      icon: ImageIcon,
      color: 'text-purple-600 bg-purple-100',
    },
    {
      id: 2,
      type: 'save',
      text: "Saved draft 'Blog Post Intro'",
      time: '15 mins ago',
      icon: FileText,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      id: 3,
      type: 'deploy',
      text: 'Deployed v2.4.0',
      time: '1 hour ago',
      icon: Zap,
      color: 'text-amber-600 bg-amber-100',
    },
    {
      id: 4,
      type: 'complete',
      text: 'Batch processing complete',
      time: '3 hours ago',
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-100',
    },
    {
      id: 5,
      type: 'generate',
      text: "Generated copy 'Product Launch'",
      time: '5 hours ago',
      icon: FileText,
      color: 'text-blue-600 bg-blue-100',
    },
  ]
  return (
    <aside className="w-80 bg-[#e5e7eb] border-l border-slate-300 flex flex-col h-screen fixed right-0 top-0 z-30 hidden xl:flex">
      <div className="h-16 flex items-center px-6 border-b border-slate-300/50">
        <h2 className="font-semibold text-slate-800 flex items-center">
          <Clock className="mr-2 h-4 w-4 text-slate-500" />
          Recent Activity
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="relative pl-4 border-l border-slate-300 space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="relative">
              <div
                className={`absolute -left-[25px] h-8 w-8 rounded-full border-2 border-[#e5e7eb] flex items-center justify-center ${activity.color}`}
              >
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                <p className="text-sm font-medium text-slate-800">
                  {activity.text}
                </p>
                <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-300">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            System Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">API Status</span>
              <span className="flex items-center text-emerald-600 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Database</span>
              <span className="flex items-center text-emerald-600 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Storage</span>
              <span className="text-slate-800 font-medium">45% Used</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1">
              <div className="bg-blue-500 h-1.5 rounded-full w-[45%]"></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}