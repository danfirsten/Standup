# Implementation Plan: AI Mentor for Software Engineers

## Overview
Build a persistent AI mentor web application per the PRD specifications:
- **Frontend**: Next.js with TypeScript
- **Backend**: Node.js API with TypeScript
- **Database/Auth**: Supabase (Postgres + Auth)
- **AI**: OpenAI API integration
- **Deployment**: Open source, self-hosted (users provide their own Supabase + OpenAI credentials)

---

## Phase 1: Project Foundation & Infrastructure

### Objective
Set up the complete project structure, development environment, and core infrastructure.

### Tasks

#### 1.1 Initialize Next.js Project
- Create Next.js 14+ app with App Router and TypeScript
- Configure ESLint, Prettier, and TypeScript strict mode
- Set up path aliases (`@/components`, `@/lib`, etc.)
- Create `.env.local` template with required environment variables

#### 1.2 Configure Supabase Client & Provide Setup Instructions
- Set up Supabase client library for users to connect to their own instance
- Create SQL migration files in `/supabase/migrations/` for users to run
- Provide clear setup documentation in README
- Database schema (users will create in their own Supabase project):
  ```
  profiles (extends Supabase auth.users)
    - id, role, level, company_type, timezone, created_at, updated_at

  sessions (conversations)
    - id, user_id, title, started_at, ended_at, is_brain_dump

  messages
    - id, session_id, role (user/assistant), content, created_at

  artifacts
    - id, user_id, session_id, type (summary/action_plan/question_draft/goal),
      content (jsonb), is_pinned, created_at

  themes
    - id, user_id, name, count, first_seen, last_seen

  goals
    - id, user_id, artifact_id, description, time_horizon,
      status (not_started/in_progress/done/dropped), created_at, updated_at
  ```
- Include Row Level Security (RLS) policies in migrations for user data isolation
- Document Supabase Auth setup (email/password and magic link)

#### 1.3 Project Structure
```
/src
  /app                    # Next.js App Router
    /api                  # API routes
    /(auth)               # Auth pages (login, signup)
    /(app)                # Authenticated app pages
      /chat               # Main chat interface
      /artifacts          # Artifacts list/detail views
      /settings           # User settings
  /components
    /ui                   # Base UI components
    /chat                 # Chat-specific components
    /artifacts            # Artifact display components
  /lib
    /supabase             # Supabase client & helpers
    /openai               # OpenAI integration
    /orchestration        # Conversation orchestration logic
    /memory               # Memory retrieval & storage
  /types                  # TypeScript types
  /hooks                  # Custom React hooks
```

#### 1.4 Base UI Components
- Design system setup (Tailwind CSS configuration)
- Core components: Button, Input, Card, Modal, Spinner, Toast
- Layout components: AppShell, Sidebar, Header

### Deliverables
- Runnable Next.js application with placeholder pages
- SQL migration files for database setup
- README with setup instructions (Supabase project creation, environment variables)
- Basic navigation between placeholder pages

---

## Phase 2: Authentication & User Profile

### Objective
Implement complete authentication flow and user profile management.

### Tasks

#### 2.1 Auth Implementation
- Sign up page with email/password
- Login page with email/password and magic link option
- Password reset flow
- Session management and protected routes
- Auth middleware for API routes

#### 2.2 User Profile
- Onboarding flow for new users:
  - Role/title input
  - Level selection (Junior/Mid/Senior/Staff)
  - Company type (optional)
  - Timezone detection
- Profile settings page
- Profile data persistence to Supabase

#### 2.3 Auth Hooks & Context
- `useAuth` hook for auth state
- `useUser` hook for user profile
- Auth context provider
- Automatic session refresh

### Deliverables
- Complete auth flow (signup, login, logout, password reset)
- User onboarding capturing role, level, company type
- Protected routes with auth middleware

---

## Phase 3: Core Chat Interface & OpenAI Integration

### Objective
Build the main chat interface with OpenAI integration and message persistence.

### Tasks

#### 3.1 OpenAI Integration Layer
- OpenAI client wrapper with error handling and retries
- System prompt construction with:
  - Base mentor personality and behavior rules
  - Conversation phase awareness (clarify vs. advise)
  - Memory context injection
  - User profile context
- Streaming response support
- Token usage tracking

#### 3.2 Chat UI Components
- Message list with virtualization for performance
- Message bubble component (user/assistant variants)
- Message input with:
  - Multi-line support
  - "Take your time" encouragement copy
  - Send on Enter, newline on Shift+Enter
- Typing indicator during AI response
- Brain dump mode toggle

#### 3.3 Session Management
- Create new session
- Load existing session
- Session list sidebar
- Session title generation (AI-generated from first message)
- Session timestamps and duration

#### 3.4 Message Persistence
- Real-time message storage to Supabase
- Message loading with pagination
- Optimistic UI updates
- Error handling and retry logic

### Deliverables
- Functional chat with OpenAI streaming responses
- Message history persistence
- Session creation and switching
- Brain dump mode toggle

---

## Phase 4: Conversation Orchestration & Mentor Behavior

### Objective
Implement the mentor's intelligent conversation flow with phase-aware behavior.

### Tasks

#### 4.1 Conversation Phase Engine
- Phase detection logic:
  - **Clarification Phase**: First 2-5 exchanges, focus on questions
  - **Analysis Phase**: Categorize the issue, apply frameworks
  - **Output Phase**: Generate concrete artifacts
- System prompt switching based on phase
- Phase indicators in UI (optional subtle cue)

#### 4.2 Issue Categorization
- Detect conversation category:
  - Feedback decoding
  - Performance review analysis
  - Confidence/comparison check
  - Promotion planning
  - Brain dump organization
  - Repeating problems
- Category-specific prompt templates
- Framework selection based on category

#### 4.3 Structured Output Generation
- Output format definitions for each artifact type
- JSON schema for structured AI responses
- Parse and extract artifacts from responses
- Auto-suggest artifact saving

#### 4.4 Memory Context Injection
- Retrieve relevant context for each message:
  - User profile
  - Recent sessions (last 5)
  - Active goals
  - Relevant themes
  - Pinned insights
- Context window management (token limits)
- Relevance scoring for memory retrieval

### Deliverables
- Mentor that asks clarifying questions before advising
- Issue category detection and framework application
- Structured output generation
- Memory-aware responses

---

## Phase 5: Artifacts System

### Objective
Implement the complete artifacts system for storing, viewing, and managing outputs.

### Tasks

#### 5.1 Artifact Types Implementation
- **Conversation Summary**
  - 3-7 bullet points
  - What user said, what mentor inferred, what was decided
  - Auto-generate at session end

- **Action Plan**
  - 1-3 concrete next steps
  - Timeline suggestions (this week, this month)
  - Check-in reminders

- **Question Draft**
  - Questions to ask manager/peers
  - Framing suggestions

- **Goal**
  - Description, time horizon, status
  - Link to originating session
  - Progress tracking

#### 5.2 Artifact Creation Flow
- In-chat artifact preview
- Save artifact button
- Edit before saving
- Auto-save option with visibility

#### 5.3 Artifacts Views
- Artifacts list page with filters:
  - By type
  - By date range
  - Search by content
- Artifact detail view
- Pin/unpin functionality
- Delete with confirmation

#### 5.4 Artifact-Session Linking
- Navigate from artifact to source session
- Show related artifacts in session view
- Artifact timeline visualization

### Deliverables
- All artifact types (summary, action plan, questions, goals)
- Artifacts CRUD operations
- List and detail views with search/filter
- Pin/unpin and delete functionality

---

## Phase 6: Memory & Pattern Detection

### Objective
Implement persistent memory with pattern detection and theme tracking.

### Tasks

#### 6.1 Theme Detection
- Extract themes from conversations using LLM
- Theme categories: visibility, scope, communication, confidence, etc.
- Theme aggregation and counting
- Last-seen tracking

#### 6.2 Pattern Detection Engine
- Identify recurring themes across sessions
- Flag potential patterns (3+ occurrences)
- Generate pattern insights
- Store pattern metadata

#### 6.3 Memory Surfacing
- "What do you remember about me?" view
- List all stored:
  - Profile attributes
  - Themes with counts
  - Active goals
  - Pinned insights
- Memory editing (delete themes, edit profile)

#### 6.4 Contextual Memory References
- Surface patterns in conversation naturally
- Hedged language ("This reminds me of when...")
- Link to past sessions when relevant
- Frequency limits to avoid "creepy" feeling

### Deliverables
- Theme extraction and tracking
- Pattern detection across sessions
- Memory transparency view
- User-controlled memory deletion

---

## Phase 7: User Experience Polish & Edge Cases

### Objective
Refine the UX, handle edge cases, and ensure reliability.

### Tasks

#### 7.1 Error Handling
- OpenAI API failures (rate limits, timeouts)
- Supabase connection issues
- Graceful degradation modes
- User-friendly error messages
- Retry mechanisms

#### 7.2 Loading States
- Skeleton loaders for lists
- Streaming message animation
- Session loading states
- Optimistic updates

#### 7.3 Empty States
- No sessions yet
- No artifacts yet
- No themes detected
- Onboarding prompts

#### 7.4 Responsive Design
- Mobile-responsive chat interface
- Collapsible sidebar on mobile
- Touch-friendly interactions
- Viewport-aware layouts

#### 7.5 Accessibility
- Keyboard navigation
- Screen reader support
- Focus management
- ARIA labels

### Deliverables
- Robust error handling throughout
- Polished loading and empty states
- Mobile-responsive design
- Basic accessibility compliance

---

## Phase 8: Settings, Privacy & Data Management

### Objective
Implement user settings, privacy controls, and data management features.

### Tasks

#### 8.1 Settings Page
- Profile editing (role, level, company)
- Notification preferences (check-in reminders)
- Theme preference (if implementing dark mode)

#### 8.2 Privacy Controls
- View all stored data
- Delete individual artifacts
- Delete individual themes
- Clear all memory option
- Export data as JSON

#### 8.3 Account Management
- Change password
- Change email
- Delete account (hard delete all data)
- Session management (active sessions)

#### 8.4 Privacy Documentation
- In-app privacy explanation
- What is stored and why
- How memory is used
- Data retention policy

### Deliverables
- Complete settings page
- Privacy controls with data deletion
- Account management features
- Privacy documentation

---

## Database Schema (Complete)

```sql
-- User profiles (extends Supabase auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT,
  level TEXT CHECK (level IN ('junior', 'mid', 'senior', 'staff', 'principal')),
  company_type TEXT,
  timezone TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat sessions
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT,
  is_brain_dump BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Artifacts
CREATE TABLE artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
  type TEXT CHECK (type IN ('summary', 'action_plan', 'question_draft', 'goal', 'insight')),
  title TEXT,
  content JSONB NOT NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Themes
CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  occurrence_count INTEGER DEFAULT 1,
  first_seen TIMESTAMPTZ DEFAULT NOW(),
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, name)
);

-- Theme occurrences (links themes to sessions)
CREATE TABLE theme_occurrences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  theme_id UUID REFERENCES themes(id) ON DELETE CASCADE,
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Goals (special artifact with status tracking)
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  artifact_id UUID REFERENCES artifacts(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  time_horizon TEXT,
  status TEXT CHECK (status IN ('not_started', 'in_progress', 'done', 'dropped')) DEFAULT 'not_started',
  target_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE artifacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE theme_occurrences ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

-- RLS Policies (user can only access own data)
CREATE POLICY "Users can view own profile" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users can view own sessions" ON sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own messages" ON messages FOR ALL
  USING (session_id IN (SELECT id FROM sessions WHERE user_id = auth.uid()));
CREATE POLICY "Users can view own artifacts" ON artifacts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own themes" ON themes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own theme_occurrences" ON theme_occurrences FOR ALL
  USING (theme_id IN (SELECT id FROM themes WHERE user_id = auth.uid()));
CREATE POLICY "Users can view own goals" ON goals FOR ALL USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_messages_session_id ON messages(session_id);
CREATE INDEX idx_artifacts_user_id ON artifacts(user_id);
CREATE INDEX idx_artifacts_type ON artifacts(type);
CREATE INDEX idx_themes_user_id ON themes(user_id);
CREATE INDEX idx_goals_user_id ON goals(user_id);
CREATE INDEX idx_goals_status ON goals(status);
```

---

## Key Files to Create

### Phase 1
- `package.json` - Dependencies
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind setup
- `tsconfig.json` - TypeScript configuration
- `.env.local.example` - Environment template
- `src/lib/supabase/client.ts` - Supabase client
- `src/lib/supabase/server.ts` - Server-side Supabase
- `supabase/migrations/001_initial_schema.sql` - Database schema

### Phase 2
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/signup/page.tsx`
- `src/app/(auth)/onboarding/page.tsx`
- `src/hooks/useAuth.ts`
- `src/hooks/useUser.ts`
- `src/components/auth/AuthForm.tsx`

### Phase 3
- `src/lib/openai/client.ts`
- `src/lib/openai/prompts.ts`
- `src/app/api/chat/route.ts`
- `src/components/chat/ChatInterface.tsx`
- `src/components/chat/MessageList.tsx`
- `src/components/chat/MessageInput.tsx`
- `src/app/(app)/chat/page.tsx`
- `src/app/(app)/chat/[sessionId]/page.tsx`

### Phase 4
- `src/lib/orchestration/phases.ts`
- `src/lib/orchestration/categories.ts`
- `src/lib/orchestration/prompts/` (per-category prompts)
- `src/lib/memory/retrieval.ts`
- `src/lib/memory/context.ts`

### Phase 5
- `src/components/artifacts/ArtifactCard.tsx`
- `src/components/artifacts/ArtifactList.tsx`
- `src/components/artifacts/ArtifactDetail.tsx`
- `src/app/(app)/artifacts/page.tsx`
- `src/app/(app)/artifacts/[id]/page.tsx`
- `src/lib/artifacts/types.ts`
- `src/lib/artifacts/generator.ts`

### Phase 6
- `src/lib/memory/themes.ts`
- `src/lib/memory/patterns.ts`
- `src/app/(app)/memory/page.tsx`
- `src/components/memory/ThemeList.tsx`
- `src/components/memory/MemoryView.tsx`

### Phase 7-8
- `src/app/(app)/settings/page.tsx`
- `src/components/settings/ProfileForm.tsx`
- `src/components/settings/PrivacyControls.tsx`
- `src/app/api/export/route.ts`
- `src/app/api/account/delete/route.ts`

---

## Verification Plan

### Per-Phase Testing
1. **Phase 1**: Run `npm run dev`, verify app loads, database tables exist
2. **Phase 2**: Test signup, login, logout, password reset flows
3. **Phase 3**: Send messages, verify persistence, test streaming
4. **Phase 4**: Verify clarification questions before advice, test category detection
5. **Phase 5**: Create and save artifacts, verify list/detail views
6. **Phase 6**: Check themes are extracted, verify memory view
7. **Phase 7**: Test error states, mobile responsiveness
8. **Phase 8**: Test data deletion, export functionality

### End-to-End Scenarios
1. New user signup → onboarding → first conversation → artifact saved
2. Return user → continue previous session → reference past themes
3. Brain dump mode → organized summary generated
4. Feedback decoding → action plan created → goal tracked
5. Delete memory → verify data removed

### Performance Checks
- Chat response latency < 8 seconds (P95)
- Memory retrieval < 300ms
- Page load times < 2 seconds

---

## Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "@supabase/supabase-js": "^2.0.0",
    "@supabase/ssr": "^0.1.0",
    "openai": "^4.0.0",
    "ai": "^3.0.0",
    "tailwindcss": "^3.4.0",
    "lucide-react": "^0.300.0",
    "date-fns": "^3.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```
