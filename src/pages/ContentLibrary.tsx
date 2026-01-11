import React from 'react'
import {
  FolderOpen,
  FileText,
  Image as ImageIcon,
  MoreVertical,
} from 'lucide-react'
import { Card } from '../components/ui/Card.tsx'
export function ContentLibrary() {
  const files = [
    {
      name: 'Blog Post Intro',
      type: 'text',
      date: 'Today, 10:23 AM',
      size: '2.4 KB',
    },
    {
      name: 'Sunset Generation',
      type: 'image',
      date: 'Yesterday, 4:15 PM',
      size: '1.2 MB',
    },
    {
      name: 'Product Description',
      type: 'text',
      date: 'Oct 24, 2023',
      size: '1.8 KB',
    },
    {
      name: 'Logo Concepts',
      type: 'image',
      date: 'Oct 22, 2023',
      size: '4.5 MB',
    },
    {
      name: 'Email Campaign',
      type: 'text',
      date: 'Oct 20, 2023',
      size: '3.2 KB',
    },
    {
      name: 'Meeting Notes',
      type: 'text',
      date: 'Oct 18, 2023',
      size: '1.5 KB',
    },
  ]
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Content Library</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          Upload New
        </button>
      </div>

      <Card noPadding className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Date Modified</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {files.map((file, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 flex items-center">
                    {file.type === 'text' ? (
                      <FileText className="h-4 w-4 mr-3 text-blue-500" />
                    ) : (
                      <ImageIcon className="h-4 w-4 mr-3 text-purple-500" />
                    )}
                    {file.name}
                  </td>
                  <td className="px-6 py-4 text-slate-500 capitalize">
                    {file.type}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{file.date}</td>
                  <td className="px-6 py-4 text-slate-500">{file.size}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreVertical className="h-4 w-4 ml-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
