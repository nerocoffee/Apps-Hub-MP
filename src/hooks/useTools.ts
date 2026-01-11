import { useState, useEffect } from 'react'
import { supabase, Tool } from '../lib/supabase'

export function useTools() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    loadTools()
  }, [])

  const loadTools = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: true })

      if (error) throw error
      setTools(data || [])
    } catch (err) {
      setError(err as Error)
      console.error('Error loading tools:', err)
    } finally {
      setLoading(false)
    }
  }

  const getToolById = (id: string) => {
    return tools.find(tool => tool.id === id)
  }

  return {
    tools,
    loading,
    error,
    loadTools,
    getToolById,
  }
}
