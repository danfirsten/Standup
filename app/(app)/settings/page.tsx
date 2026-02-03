'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth/context'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import type { Level } from '@/types/database'
import { Spinner } from '@/components/ui/spinner'

const LEVELS: { value: Level; label: string }[] = [
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Mid-Level' },
  { value: 'senior', label: 'Senior' },
  { value: 'staff', label: 'Staff' },
  { value: 'principal', label: 'Principal' },
]

export default function SettingsPage() {
  const { user, profile, refreshProfile } = useAuth()
  const supabase = createClient()

  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState('')
  const [level, setLevel] = useState<Level>('mid')
  const [companyType, setCompanyType] = useState('')
  const [timezone, setTimezone] = useState('')

  useEffect(() => {
    if (profile) {
      setRole(profile.role || '')
      setLevel((profile.level as Level) || 'mid')
      setCompanyType(profile.company_type || '')
      setTimezone(profile.timezone || '')
    }
  }, [profile])

  const handleSave = async () => {
    if (!user) return

    setLoading(true)

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          role,
          level,
          company_type: companyType || null,
          timezone,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (error) throw error

      await refreshProfile()
      toast.success('Profile updated successfully!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  if (!profile) {
    return (
      <div className="container py-8 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container max-w-2xl py-8">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-muted-foreground mb-8">Manage your profile and preferences</p>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input value={user?.email || ''} disabled />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Your profile helps the AI mentor provide personalized guidance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">
              Job Title / Role
            </label>
            <Input
              id="role"
              placeholder="e.g., Software Engineer, Tech Lead"
              value={role}
              onChange={e => setRole(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Experience Level</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {LEVELS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setLevel(value)}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                    level === value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  disabled={loading}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="companyType" className="text-sm font-medium">
              Company Type
            </label>
            <Input
              id="companyType"
              placeholder="e.g., Startup, Enterprise, Agency"
              value={companyType}
              onChange={e => setCompanyType(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="timezone" className="text-sm font-medium">
              Timezone
            </label>
            <Input
              id="timezone"
              value={timezone}
              onChange={e => setTimezone(e.target.value)}
              disabled={loading}
            />
          </div>

          <Button onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save changes'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
