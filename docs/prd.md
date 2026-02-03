# Product Requirements Document (PRD)

This document describes the first version of a persistent AI mentor for software engineers. It is intended to be specific enough that design and engineering can implement the MVP without having to ask basic product-definition questions, while still leaving room for iteration on UX and implementation details.

## 1. Product Summary

### 1.1 One-Liner
A persistent AI mentor that helps software engineers think clearly about feedback, impact, and growth—by remembering their context and turning messy emotions into concrete action.

### 1.2 Problem Statement
Engineers regularly receive vague, political, or underspecified feedback. Expectations are implicit, success criteria are contextual, and mental models of impact, visibility, and leverage are rarely taught. The result is confusion about what matters, anxiety about performance, and wasted effort on low-leverage work. Existing options (generic AI chat, ad‑hoc mentors, or expensive coaches) lack persistent context and actionable continuity.

More concretely:
- **Signals are noisy**: Performance review text, 1:1 notes, Slack DMs, and offhand comments are hard to interpret consistently.
- **Context is fragmented**: Feedback is split across time, projects, and managers; engineers struggle to see patterns or progress.
- **Guidance is generic**: Generic AI chat tools or “career advice content” do not know the user’s history, environment, or personality.
- **Cognitive load is high**: Engineers hold a lot of unstructured worry (“am I behind?”, “what does my manager really want?”) in their heads.

### 1.3 Vision
Deliver a compounding, context-aware mentorship system that engineers return to repeatedly to offload cognition, interpret signals, and evolve their behavior over time. The system becomes a trusted mirror that surfaces patterns and guides decisions without becoming therapy.

The long-term vision:
- Feels like an ever-present, thoughtful staff+ engineer or manager who “remembers everything” and helps you see around corners.
- Helps you build your own internal models of impact, leverage, and communication instead of just telling you what to do.
- Produces a living artifact of your growth: what you were worried about, what you tried, what worked, and how you changed.

### 1.4 Differentiation
- Persistent memory and pattern detection over months/years, not just single-session chat history.
- Context-specific guidance rather than generic advice; responses reference the user’s past sessions, goals, and environment.
- Balanced empathy and strategy without therapy framing; explicitly not positioned as a mental health or clinical tool.
- Concrete outputs (summaries, action plans, question drafts) every session so the user always “leaves with something.”
- Optimized for ambiguity-to-clarity in career feedback and workplace dynamics, not for coding help or general Q&A.
- Explicit controls around memory and privacy to build trust (what is stored, how to edit/delete, when it is used).

### 1.6 Terminology
- **Mentor**: the persistent AI system itself.
- **Memory**: stored user context, insights, goals, summaries, and recurring themes.
- **Artifacts**: structured outputs like summaries, action plans, decoded feedback, and questions drafts.

### 1.5 Non-Goals (for MVP)
- Not a general-purpose coding assistant or pair programmer.
- Not a replacement for managers, HR, or performance review processes.
- Not a clinical mental health tool or therapy substitute.
- Not an analytics dashboard for managers or HR (no team-level views in MVP).

## 2. Goals and Success Criteria

### 2.1 Primary Goals
- Decode feedback into **specific, actionable guidance** with minimal ambiguity.
- Build **long-term trust** through reliable memory, continuity, and non-judgmental tone.
- Generate **concrete outputs in every meaningful session** (summary, action plan, questions, or new goal).
- Make users feel **safe to be messy and honest**, including sharing drafts, worries, and partially formed thoughts.

### 2.1.1 Initial Beachhead
- Anchor the initial product narrative and marketing around **decoding feedback and performance reviews**, which are:
  - High pain and high frequency for the target audience.
  - Naturally produce rich artifacts (decoded summaries, question drafts, and action plans).
  - Strongly differentiated from generic AI chat or journaling tools.

### 2.2 Secondary Goals
- Support multiple career stages (junior → staff) with level-appropriate guidance.
- Encourage **user agency and real-world conversations** (with managers, peers, mentors) instead of creating dependence.
- Clearly differentiate from generic AI chat tools via memory, tone, and UX.
- Create **compounding value** via artifacts and revisits, so the product gets more useful the more it is used.

### 2.3 Success Metrics (MVP Targets)
High-level (directional, to be refined post-launch):
- **Activation**
  - ≥ 70% of new users who start a first session generate at least one saved artifact (summary, goal, or plan) in that session.
- **Engagement & Retention**
  - Weekly retention (W1→W2) ≥ 35%; monthly retention (M1→M2) ≥ 25%.
  - Median session length ≥ 8 minutes; ≥ 2 user messages per session on median.
- **Depth of Use**
  - ≥ 60% of active users have at least 3 artifacts after 30 days.
  - ≥ 40% of sessions include a reference to past memory (themes, goals, or prior sessions).
- **Outcome / Sentiment**
  - Post-session quick rating: ≥ 4.3/5 average on “I feel clearer about what to do next.”
  - ≥ 60% of surveyed users report reduced anxiety or confusion about feedback after 4 weeks of use.

Data instrumentation requirements are described implicitly in sections 6 and 9.

## 3. Target Users and Personas

### 3.1 Primary Users
- **Persona A – “Junior → Mid” (IC1–IC3)**
  - Early-career engineer trying to understand “what good looks like” and how to avoid stalling.
- **Persona B – “New Mid-Level” (IC3–IC4)**
  - Recently promoted or about to be, unsure what “success at the next level” looks like.
  - Gets feedback like “be more proactive,” “have more impact,” but not clear examples.
- **Persona C – “Seasoned IC Navigating Politics” (IC4–IC5)**
  - Experienced with their craft but struggles with org politics, stakeholder management, and narrative-building.
  - Needs help decoding conflicting feedback across projects and managers.
- **Persona D – “Emerging Leader / Staff-Track” (IC5+)**
  - Handles complex cross-team work, wants an external thinking partner for leadership decisions and tradeoffs.
  - Wants help spotting long-term patterns in how they show up as a leader.

### 3.2 Needs and Pain Points
- Decode vague or political feedback into concrete expectations and behaviors.
- Understand impact, visibility, and leverage expectations for their level and environment.
- Build promotion or growth plans without clear, trusted rubrics.
- Process messy or emotional thoughts safely, then translate them into decisions and action.
- Track progress over time: what they said they’d do, what actually happened, and what changed.
- Have a “mirror” that remembers their story across jobs/teams, independent of any single manager or company.

### 3.3 Stakeholders
- **End users**: individual software engineers (primary).
- **Internal teams**: product, engineering, design (for implementation and iteration).
- **Future stakeholders (non-MVP)**: managers, HR/People teams, and enterprise buyers who may want team or org-level offerings.

## 4. Scope

### 4.1 In Scope (MVP)
- **Core Experience**
  - Persistent user memory and retrieval (profile, themes, goals, summaries).
  - Conversation flow that emphasizes reflection, clarification, and then guidance.
  - Structured outputs: summaries, action plans, question drafts, and saved insights.
  - Pattern detection and surfacing of recurring themes (even if simple heuristic in MVP).
  - Artifact views: list and detail views of summaries, goals, action plans, and pinned insights.
  - Brain dump mode: a low-friction mode encouraging long-form, unstructured input.
- **Platform / Stack**
  - Web app built with Next.js (desktop-first, mobile-responsive).
  - Node.js API layer for orchestration and integrations.
  - Supabase for auth and data persistence.
  - OpenAI-powered chat AI integration (text-only in MVP).

### 4.2 Out of Scope (MVP)
- HR system integrations (e.g., Workday, Lattice, performance review ingestion).
- Manager or team dashboards; any feature that exposes user content to others.
- Enterprise analytics and usage reporting.
- Clinical mental health support, crisis handling, or diagnosis.
- Automated performance review ingestion/parsing from third-party systems.
- Voice input/output, mobile native apps, or browser extensions.

### 4.3 Assumptions and Constraints
- MVP assumes English-only interactions.
- MVP targets individual users; account sharing is discouraged but not technically prevented.
- Users may use multiple devices; memory must be account-based, not device-based.
- No requirement for offline support in MVP.

## 5. User Experience Requirements

### 5.1 Core Interaction Principles
- Resist advice until clarification is complete; the system should ask at least a few high-leverage questions before giving recommendations.
- Validate emotions (naming feelings, normalizing experiences) and then redirect to user agency and concrete options.
- Memory surfacing must feel helpful, not creepy:
  - Avoid dumping large amounts of historical detail.
  - Reference past themes or goals in a light-touch, opt-in way.
- The mentor should feel like a thoughtful senior engineer or manager:
  - Speaks plainly, avoids jargon and therapy language.
  - Is honest about uncertainty, offers tradeoffs instead of absolute prescriptions.

### 5.2 UI/UX Requirements
- **Chat Interface**
  - Calm, low-chrome chat interface with focus on text.
  - Encourages long-form inputs via copy cues (“take your time; you can paste a lot here”).
  - Clear affordances for sending, editing, or deleting the last message (MVP: delete/undo is acceptable).
- **Brain Dump Mode**
  - Explicit toggle or entry point (“Start a brain dump”).
  - Reduced prompts and minimal interruptions; the system asks fewer questions until the user signals they’re ready to organize.
- **Artifacts Access**
  - Dedicated section or panel for “Saved items” (summaries, goals, plans, pinned insights).
  - Ability to pin/unpin key insights or summaries from any session.
  - Clear session boundaries and timestamps: each conversation is time-stamped and can be reopened.

### 5.3 Artifacts and Views
- **Conversation summaries**
  - 3–7 bullet points max.
  - Highlight: (a) what the user said, (b) what the mentor inferred, (c) what was decided.
- **Recurring themes and pattern timeline**
  - High-level tags (e.g., “visibility,” “scope,” “manager trust,” “self-comparison”).
  - Simple timeline view: when themes appeared and how often.
- **Goals**
  - Each goal has: description, time horizon, status (not started / in progress / done / dropped), and optional metrics/signals.
  - Goals can be linked back to originating sessions.
- **Action plans**
  - Concrete next 1–3 steps with suggested timelines (e.g., “this week,” “this month”).
  - Optional check-ins: the system can suggest revisiting after X days.

## 6. Functional Requirements

### 6.1 Conversation Flow (Logical, not strictly UI)
At a high level, each conversation should follow this pattern:
- **Step 1: Reflect back what was heard**
  - Restate the user’s situation in their own words with some structure.
- **Step 2: Ask 2–5 high-leverage clarifying questions**
  - Probe missing context (e.g., level, relationship with manager, timeline, stakes).
- **Step 3: Identify category of issue**
  - Internally classify (e.g., feedback decoding, promotion planning, comparison anxiety, conflict, etc.).
- **Step 4: Apply internal frameworks silently**
  - Use internal playbooks for feedback interpretation, promotion, stakeholder mapping, etc., without over-explaining them.
- **Step 5: Produce concrete outputs**
  - Summaries, action plans, question drafts, reframes, or experiments.
- **Step 6: Log insights to memory**
  - Update themes, goals, and user profile as appropriate, respecting memory rules.

Implementation detail: It is acceptable for the UI to present this as a single continuous chat; the “steps” are logical phases primarily enforced by system prompts and orchestration.

### 6.2 Core Features (User-Facing)
- **Persistent memory store**
  - Stores user profile (role, level, company), goals, summaries, and recurring themes.
  - Each memory entry has: type, content, created timestamp, and source session.
- **Pattern detection**
  - MVP may use simple keyword or tag-based heuristics plus LLM-based classification.
  - Detects recurring themes over time and marks them for surfacing.
- **Artifact generation and storage**
  - Ability to generate and then save a summary, plan, or question set from any session.
  - User can choose which artifacts to save; auto-save is allowed but must be visible and reversible.
- **User-controlled memory**
  - User can view a list of memory entries (at least at the artifact/theme level).
  - Deletion of an artifact should also remove its contribution to patterns where feasible.
- **Multi-session continuity**
  - System can reference relevant past sessions when asked about a topic again.
  - Example: “Last time you were worried about X; you decided to try Y. Did that happen? How did it go?”

### 6.3 Key User Flows

#### 6.3.1 Decode Feedback
- **Trigger**
  - User pastes text from a manager, peer review, or performance document.
- **Input**
  - Feedback text (required).
  - Optional: role, level, company context.
- **System behavior**
  - Clarify: ask questions about context, relationship, history of feedback.
  - Interpret: categorize signals (e.g., “scope,” “communication,” “ownership”).
  - Generate: 
    - 1 summary of what the feedback is really saying.
    - 1–3 concrete next steps tailored to the user’s situation.
    - A draft of questions the user can ask their manager or reviewer.
- **Outputs / Artifacts**
  - “Impact decode summary” artifact linked to the original text.
  - Optional new/updated goals or action items.
  - Memory log entry with themes and any new profile info.

#### 6.3.2 Performance Review Decoding
- **Input**
  - Excerpts from performance reviews, rating labels, or promotion decisions.
- **System behavior**
  - Normalize the experience (many users struggle with reviews).
  - Extract signals about strengths, risks, and expectations.
  - Suggest questions to clarify ratings, calibration, or growth paths.
- **Outputs**
  - Plain-language translation of the review.
  - List of 3–5 questions for the next 1:1 or calibration discussion.
  - Linked goal(s) if promotion/growth plan is implied.

#### 6.3.3 Confidence / Comparison Check
- **Input**
  - Free-form text expressing anxiety, self-comparison, or “falling behind.”
- **System behavior**
  - Validate emotions; avoid minimizing or toxic positivity.
  - Ask clarifying questions about actual signals (feedback, outcomes, timelines).
  - Reframe focus towards controllable levers and local realities.
- **Outputs**
  - Reframed narrative: what is actually known, what is unknown, what matters.
  - 1–3 concrete experiments or next steps to gather more signal or build momentum.

#### 6.3.4 Promotion Planning
- **Input**
  - Target level and rough timeline (e.g., “Senior by next cycle”).
- **System behavior**
  - Ask about current level, company expectations (if known), and recent feedback.
  - Identify 2–4 growth pillars (e.g., “scope,” “influence,” “execution,” “communication”).
  - Co-create a 6–12 month plan broken into phases (quarterly or milestone-based).
- **Outputs**
  - Structured promotion plan artifact with:
    - Time horizon.
    - Focus areas.
    - Example projects/behaviors.
  - Linked goals per focus area.

#### 6.3.5 Brain Dump Organization
- **Input**
  - Unstructured, long-form thoughts; user may explicitly start “brain dump mode.”
- **System behavior**
  - Minimize interruptions; only occasional gentle prompts.
  - After user indicates they’re ready, cluster text into themes, concerns, and decisions.
- **Outputs**
  - Organized summary by theme.
  - Recommended priorities (what matters now vs later).
  - Optional goals or action items per theme.

#### 6.3.6 Repeating Problems Diagnosis
- **Input**
  - Description of a recurring pattern (e.g., “I always end up doing X”).
- **System behavior**
  - Check memory for prior mentions of similar situations.
  - Name the pattern in plain language.
  - Suggest small behavioral experiments or conversations to test different approaches.
- **Outputs**
  - Pattern description and example instances.
  - 1–2 experiments with clear, observable outcomes.

### 6.4 Input/Output Requirements
- **Inputs**
  - Free-form text (long-form encouraged).
  - Optional structured metadata at account level: role, level, company type, time zone.
  - Optional session-level metadata: “topic” tags (feedback, promotion, conflict, etc.).
- **Outputs**
  - Summaries, action plans, question drafts, saved insights, goals, and themes.
  - All outputs must be grounded in user-provided context or clearly labeled as speculation.
- **Quality Requirements**
  - Responses should be specific, referencing concrete details from the user’s text.
  - Avoid templated-feeling, boilerplate advice; repetition across sessions should be minimal.

## 7. Data and Memory Requirements

### 7.1 Memory Types
- User profile context (role, level, team/company type, manager relationship).
- Goals and targets (with status and timestamps).
- Conversation summaries (per session).
- Recurring themes (tags with counts and last-seen timestamps).
- Action plans and outcomes (what was tried, what happened).
- Pinned insights (user-selected).

### 7.2 Memory Rules
- Store only explicit or high-confidence inferred info; avoid speculative or sensitive inference.
- Provide transparency on what is stored:
  - Simple “What do you remember about me?” view.
  - List of artifacts and themes the system believes are important.
- Allow user edits or deletions of:
  - Individual artifacts (summaries, goals, plans).
  - Individual themes or profile attributes where feasible.
- Surface memory sparingly and tentatively:
  - Use hedged language (“This reminds me of when…”, “You previously mentioned…”).
  - Never assert absolute patterns (“you always…”, “you never…”).
- Support export of user data (JSON export in later iteration; optional for MVP but desirable).

### 7.3 Data Retention and Residency (MVP)
- Default: retain data indefinitely while account is active, unless user deletes content.
- If technically feasible, allow users to request full account deletion (hard delete).
- No specific data residency guarantees in MVP; to be clarified for future enterprise use.

## 8. Non-Functional Requirements

### 8.1 Performance
- Conversational response latency:
  - P95 end-to-end response time ≤ 8 seconds for typical prompts.
  - P99 ≤ 15 seconds for long or complex prompts.
- Fast context retrieval for continuity:
  - P95 memory fetch ≤ 300ms (excluding network latency).

### 8.2 Reliability
- Avoid hallucinated memory references:
  - System must not confidently reference events or facts that were never provided or inferred with high confidence.
  - Introduce a “memory confidence” mechanism and degrade gracefully (e.g., “I don’t have much on that yet…”).
- Prevent loss of long-term data:
  - Daily backups at a minimum.
  - Clear error handling if Supabase or OpenAI is unavailable (graceful degradation, user messaging).

### 8.3 Security and Privacy
- Explicit privacy posture and user control:
  - Simple, human-readable explanation of what is stored and how it is used.
  - Clear settings to delete content and (eventually) account.
- Option for “reduced memory” or local-only memory mode (if technically feasible in later iterations).
- Supabase-managed authentication and access controls:
  - Email/password or magic link auth for MVP.
  - Basic session management (expiration, revocation on logout).

### 8.4 Usability
- Designed as a **safe space** for messy inputs:
  - Tone guidelines for the AI (non-judgmental, curious, non-shaming).
  - Avoid pushing the user to “optimize” everything; focus on clarity and next steps.
- Clear artifact navigation:
  - Users can quickly find “that one summary from last month about my promotion plan.”
  - Simple search or filter by topic and date (basic in MVP).

## 9. Technical Requirements

### 9.0 Platform and Stack (Specified)
- Frontend: Next.js (React), TypeScript preferred.
- Backend: Node.js (TypeScript), running behind HTTPS.
- Database and Auth: Supabase (Postgres + Auth).
- AI Provider: OpenAI (for chat AI and reasoning).

### 9.1 System Components
- Chat UI (Next.js).
- Conversation orchestration service (Node.js):
  - Handles prompt construction, memory retrieval, and routing to OpenAI.
- Memory store and retrieval (Supabase):
  - Tables for users, sessions, messages, artifacts, themes, and goals.
- Pattern detection engine:
  - MVP can be a scheduled job or on-write worker that tags content.
- Artifact generator:
  - Logic and prompts for generating structured summaries, plans, and questions.
- OpenAI integration layer:
  - Centralized wrapper for API calls, logging, and error handling.

### 9.2 Data Flow
1. User inputs text via chat UI.
2. Backend receives input, enriches with context (profile, themes, recent sessions).
3. Orchestration applies conversation phase logic (clarify vs advise).
4. OpenAI API is called with composed prompt and context.
5. Response is parsed into chat reply and any derived artifacts (summary, plan, themes).
6. Supabase is updated with new messages, artifacts, and memory entries.
7. Future sessions pull from this stored context as needed.

### 9.3 Integrations
- OpenAI API for chat and reasoning (text completion / chat models).
- Supabase for:
  - User identity and sessions.
  - Data persistence (messages, artifacts, themes, profile).

### 9.4 Observability and Logging (MVP)
- Basic request logging for:
  - Chat requests and responses (with redacted or hashed user identifiers where possible).
  - Errors from OpenAI and Supabase.
- Minimal metrics:
  - Requests per user, per day.
  - Error rates and latency distributions.

## 10. Risks and Mitigations

### 10.1 Product Risks
- **Over-advising too early**
  - Mitigation: enforce clarification phase in system prompts and orchestration rules.
- **Perception as generic AI advice**
  - Mitigation: aggressive context capture, consistent referencing of user history, and differentiated UX.
- **Emotional dependency**
  - Mitigation: tone and content guidelines that encourage real-world conversations, reinforce agency, and normalize seeking human support.
- **Misinterpretation of workplace dynamics**
  - Mitigation: emphasize uncertainty; encourage users to validate interpretations with managers/peers.

### 10.2 Technical Risks
- **Incorrect memory retrieval or leakage between users**
  - Mitigation: strict tenanting by user ID; careful query design; thorough testing.
  - Additional safeguards for prompts to avoid including other users’ data.
- **Privacy concerns**
  - Mitigation: clear controls, optional deletion/export flows, transparent privacy copy.
- **Vendor dependency (OpenAI, Supabase)**
  - Mitigation: isolate integrations behind internal abstractions to enable future provider changes.

### 10.3 Ethical and Compliance Risks
- **Implicit handling of sensitive topics (burnout, mental health, discrimination)**
  - Mitigation: guidelines for escalation language (e.g., “this might be better to discuss with HR or a trusted person in your life”), avoid clinical framing.
- **Data usage ambiguity**
  - Mitigation: clearly state whether data is used to train models or only for product functionality; allow opt-out where possible.

## 11. Open Questions

- What should be the **default memory depth** vs. granular user-controlled memory (per-session vs global toggles)?
- What is the **minimum viable context** needed to consistently avoid generic advice?
- What is the **best UX pattern** for surfacing recurring themes without overwhelming or biasing the user?
- How should we handle **contradictory feedback** across time (e.g., “take more ownership” vs “stop going rogue”)?
- Should we support **import of external artifacts** (1:1 notes, review PDFs) directly, or keep inputs manual in MVP?
- What is the right balance between **brain dump mode** and more structured “coach mode” in the same interface?

## 12. Future Considerations

- Mentor modes (Promotion Coach, Feedback Decoder, Conflict Navigator, etc.).
- Level-specific guidance tracks, including company-type specific patterns (Big Tech vs startup vs agency).
- Visualizations of progress and themes over months/years (trend charts, storylines).
- Team or manager-facing features with explicit consent and clear boundaries.
- Mobile-native applications, browser extension for capturing feedback from tools like Gmail/Slack/Notion.