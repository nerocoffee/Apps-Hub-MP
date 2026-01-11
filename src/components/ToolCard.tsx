import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BoxIcon } from 'lucide-react'
import { Card } from './ui/Card'
import { Badge } from './ui/Badge'
interface ToolCardProps {
  id: string
  title: string
  description: string
  icon: BoxIcon
  status: 'active' | 'beta' | 'new'
  color: string
}
export function ToolCard({
  id,
  title,
  description,
  icon: Icon,
  status,
  color,
}: ToolCardProps) {
  const statusVariant = {
    active: 'success',
    beta: 'warning',
    new: 'default',
  } as const
  return (
    <Link to={`/tool/${id}`} className="block group h-full">
      <Card className="h-full transition-all duration-200 hover:shadow-md hover:-translate-y-1 relative group-hover:border-blue-200">
        <div className="flex justify-between items-start mb-4">
          <div
            className={`h-12 w-12 rounded-xl flex items-center justify-center ${color}`}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
          <Badge variant={statusVariant[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>

        <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2">
          {description}
        </p>

        <div className="flex justify-end mt-auto">
          <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
          </div>
        </div>
      </Card>
    </Link>
  )
}
