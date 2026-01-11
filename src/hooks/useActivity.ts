import { useState, useEffect } from 'react'
import { supabase, Activity } from '../lib/supabase.ts'
import { useAuth } from './useAuth'

export function useActivity() {
  const { user } = useAuth()
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (user) {
      loadActivities()
    } else {
      setActivities([])
      setLoading(false)
    }
  }, [user])

  const loadActivities = async (limit = 50) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      setActivities(data || [])
    } catch (err) {
      setError(err as Error)
      console.error('Error loading activities:', err)
    } finally {
      setLoading(false)
    }
  }

  const logActivity = async (
    action: string,
    toolId?: string,
    details?: Record<string, any>,
    creditsUsed: number = 0
  ) => {
    if (!user) return { error: new Error('Not authenticated') }

    try {
      const { data, error } = await supabase
        .from('activities')
        .insert([{
          user_id: user.id,
          tool_id: toolId,
          action,
          details,
          credits_used: creditsUsed,
        }])
        .select()
        .single()

      if (error) throw error

      // Update local state
      setActivities([data, ...activities])

      // Update profile credits if needed
      if (creditsUsed > 0) {
        await updateCreditsUsed(creditsUsed)
      }

      return { data, error: null }
    } catch (err) {
      return { data: null, error: err as Error }
    }
  }

  const updateCreditsUsed = async (creditsUsed: number) => {
    if (!user) return

    try {
      await supabase.rpc('increment_credits', {
        user_id: user.id,
        amount: creditsUsed,
      })
    } catch (err) {
      console.error('Error updating credits:', err)
    }
  }

  return {
    activities,
    loading,
    error,
    loadActivities,
    logActivity,
  }
}
