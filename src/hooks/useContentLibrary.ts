import { useState, useEffect } from 'react'
import { supabase, ContentItem } from '../lib/supabase.ts'
import { useAuth } from './useAuth'

export function useContentLibrary() {
  const { user } = useAuth()
  const [content, setContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (user) {
      loadContent()
    } else {
      setContent([])
      setLoading(false)
    }
  }, [user])

  const loadContent = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('content_library')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setContent(data || [])
    } catch (err) {
      setError(err as Error)
      console.error('Error loading content:', err)
    } finally {
      setLoading(false)
    }
  }

  const addContent = async (newContent: Omit<ContentItem, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return { error: new Error('Not authenticated') }

    try {
      const { data, error } = await supabase
        .from('content_library')
        .insert([{ ...newContent, user_id: user.id }])
        .select()
        .single()

      if (error) throw error

      setContent([data, ...content])
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err as Error }
    }
  }

  const updateContent = async (id: string, updates: Partial<ContentItem>) => {
    try {
      const { data, error } = await supabase
        .from('content_library')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setContent(content.map(item => item.id === id ? data : item))
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err as Error }
    }
  }

  const deleteContent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('content_library')
        .delete()
        .eq('id', id)

      if (error) throw error

      setContent(content.filter(item => item.id !== id))
      return { error: null }
    } catch (err) {
      return { error: err as Error }
    }
  }

  const toggleFavorite = async (id: string) => {
    const item = content.find(c => c.id === id)
    if (!item) return

    return updateContent(id, { is_favorite: !item.is_favorite })
  }

  return {
    content,
    loading,
    error,
    loadContent,
    addContent,
    updateContent,
    deleteContent,
    toggleFavorite,
  }
}
