export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Level = 'junior' | 'mid' | 'senior' | 'staff' | 'principal'
export type MessageRole = 'user' | 'assistant' | 'system'
export type ArtifactType = 'summary' | 'action_plan' | 'question_draft' | 'goal' | 'insight'
export type GoalStatus = 'not_started' | 'in_progress' | 'done' | 'dropped'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: string | null
          level: Level | null
          company_type: string | null
          timezone: string | null
          onboarding_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: string | null
          level?: Level | null
          company_type?: string | null
          timezone?: string | null
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: string | null
          level?: Level | null
          company_type?: string | null
          timezone?: string | null
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      sessions: {
        Row: {
          id: string
          user_id: string
          title: string | null
          is_brain_dump: boolean
          started_at: string
          ended_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title?: string | null
          is_brain_dump?: boolean
          started_at?: string
          ended_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string | null
          is_brain_dump?: boolean
          started_at?: string
          ended_at?: string | null
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          session_id: string
          role: MessageRole
          content: string
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          role: MessageRole
          content: string
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          role?: MessageRole
          content?: string
          metadata?: Json
          created_at?: string
        }
      }
      artifacts: {
        Row: {
          id: string
          user_id: string
          session_id: string | null
          type: ArtifactType
          title: string | null
          content: Json
          is_pinned: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          session_id?: string | null
          type: ArtifactType
          title?: string | null
          content: Json
          is_pinned?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          session_id?: string | null
          type?: ArtifactType
          title?: string | null
          content?: Json
          is_pinned?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      themes: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          occurrence_count: number
          first_seen: string
          last_seen: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          occurrence_count?: number
          first_seen?: string
          last_seen?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          occurrence_count?: number
          first_seen?: string
          last_seen?: string
        }
      }
      theme_occurrences: {
        Row: {
          id: string
          theme_id: string
          session_id: string
          created_at: string
        }
        Insert: {
          id?: string
          theme_id: string
          session_id: string
          created_at?: string
        }
        Update: {
          id?: string
          theme_id?: string
          session_id?: string
          created_at?: string
        }
      }
      goals: {
        Row: {
          id: string
          user_id: string
          artifact_id: string | null
          description: string
          time_horizon: string | null
          status: GoalStatus
          target_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          artifact_id?: string | null
          description: string
          time_horizon?: string | null
          status?: GoalStatus
          target_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          artifact_id?: string | null
          description?: string
          time_horizon?: string | null
          status?: GoalStatus
          target_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
