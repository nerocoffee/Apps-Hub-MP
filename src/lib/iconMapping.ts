import {
  PenTool,
  Image as ImageIcon,
  Code2,
  BarChart3,
  Video,
  Mic,
  Box,
  LucideIcon,
} from 'lucide-react'

// Map icon names from database to Lucide React components
export const iconMap: Record<string, LucideIcon> = {
  PenTool,
  ImageIcon,
  Code2,
  BarChart3,
  Video,
  Mic,
  Box, // Default fallback icon
}

// Get icon component by name, with fallback
export function getIconComponent(iconName?: string): LucideIcon {
  if (!iconName) return Box
  return iconMap[iconName] || Box
}
