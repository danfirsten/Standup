'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/context'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import type { Level } from '@/types/database'

const LEVELS: { value: Level; label: string }[] = [
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Mid-Level' },
  { value: 'senior', label: 'Senior' },
  { value: 'staff', label: 'Staff' },
  { value: 'principal', label: 'Principal' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user, refreshProfile } = useAuth()
  const supabase = createClient()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Form data
  const [role, setRole] = useState('')
  const [level, setLevel] = useState<Level>('mid')
  const [companyType, setCompanyType] = useState('')
  const [timezone, setTimezone] = useState('')

  useEffect(() => {
    // Auto-detect timezone
    const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    setTimezone(detectedTimezone)
  }, [])

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Not authenticated')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          role,
          level,
          company_type: companyType || null,
          timezone,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (error) throw error

      await refreshProfile()
      toast.success('Profile setup complete!')
      router.push('/chat')
    } catch (error: any) {
      toast.error(error.message || 'Failed to save profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Welcome! Let's get to know you</CardTitle>
            <CardDescription>
              This helps your AI mentor provide personalized guidance
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Progress indicator */}
            <div className="flex gap-2 mb-8">
              {[1, 2, 3].map(s => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded ${
                    s <= step ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold">What's your role?</h3>
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Job Title
                  </label>
                  <Input
                    id="role"
                    placeholder="e.g., Software Engineer, Tech Lead, Engineering Manager"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground">
                    This helps contextualize advice to your current position
                  </p>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button onClick={() => setStep(2)} disabled={!role.trim() || loading}>
                    Next
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-semibold">What's your experience level?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {LEVELS.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setLevel(value)}
                      className={`p-4 rounded-lg border-2 text-left transition-colors ${
                        level === value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      disabled={loading}
                    >
                      <div className="font-medium">{label}</div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between gap-2 mt-6">
                  <Button variant="outline" onClick={() => setStep(1)} disabled={loading}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)} disabled={loading}>
                    Next
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Tell us about your company (optional)</h3>
                <div className="space-y-2">
                  <label htmlFor="companyType" className="text-sm font-medium">
                    Company Type
                  </label>
                  <Input
                    id="companyType"
                    placeholder="e.g., Startup, Enterprise, Agency, etc."
                    value={companyType}
                    onChange={e => setCompanyType(e.target.value)}
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground">
                    Optional - helps provide relevant context for your work environment
                  </p>
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
                  <p className="text-xs text-muted-foreground">Auto-detected from your browser</p>
                </div>

                <div className="flex justify-between gap-2 mt-6">
                  <Button variant="outline" onClick={() => setStep(2)} disabled={loading}>
                    Back
                  </Button>
                  <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Saving...' : 'Complete setup'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
