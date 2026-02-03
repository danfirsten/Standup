# Project Description: Persistent AI Mentor for Software Engineers

## Project Overview

### Core Idea and Purpose
Build a persistent AI mentor that helps software engineers think clearly about feedback, impact, and career growth by remembering their context over time and turning messy emotions and ambiguous signals into concrete actions. The product is a long-term thinking partner for career meta-work, not a generic chatbot, not therapy, and not a simple journaling tool.

### Problem Being Solved
Engineers often struggle not because of skill or effort, but because expectations are implicit, feedback is underspecified, success criteria are political and contextual, and mental models for impact and perception are rarely taught. The product closes the gap between what a manager says, what they mean, and what the engineer should do differently.

### High-Level Vision and Desired Outcome
Create a compounding, context-aware mentorship system that users return to repeatedly to offload cognition, decode feedback, recognize patterns, and navigate career decisions with clarity. Over time, the system becomes a trusted mirror that helps engineers see recurring themes and evolve their behavior.

## Goals and Success Criteria

### Primary Objectives
- Provide accurate, context-specific decoding of feedback and performance signals.
- Create actionable, concrete outputs that translate ambiguity into decisions and next steps.
- Build persistent memory that enables pattern detection and continuity over time.
- Establish trust and safety so users feel comfortable sharing messy, sensitive thoughts.

### Secondary Objectives
- Support engineers across career levels (Junior to Staff) with level-appropriate guidance.
- Increase user confidence and agency without becoming emotionally dependent on the product.
- Differentiate clearly from generic AI chat, coaching, and journaling apps.

### Measurable Indicators of Success (Inferred)
- High repeat usage over multiple weeks and months.
- User-reported clarity after sessions (post-session rating or survey).
- Percentage of sessions resulting in actionable outputs (action plan, summary, questions draft).
- Increase in number of saved insights, pinned items, or revisits over time.
- Reduction in user-reported ambiguity around feedback after a defined period.

## Target Users and Stakeholders

### User Personas (Inferred)
- Early-career engineers (Junior to Mid) seeking clarity on expectations and growth.
- Mid-level to Senior engineers navigating ambiguous feedback and promotion paths.
- Senior to Staff-level engineers wanting a thinking partner for leadership and influence challenges.

### Needs, Pain Points, and Motivations
- Need help decoding vague or political feedback.
- Lack of clear mental models for impact, visibility, and leverage.
- Desire for a private, psychologically safe space to process career ambiguity.
- Motivation to advance to the next level with a concrete plan.

### Stakeholders
- End users (engineers).
- Internal product, engineering, and design teams.
- Potentially enterprise buyers (inferred future possibility, not required now).

## Functional Requirements

### Core Features
- Persistent memory of user context and prior conversations.
- Conversation flow that prioritizes reflection and clarification before advice.
- Pattern detection across time to surface recurring themes.
- Structured outputs: summaries, action plans, decoded feedback, and questions drafts.
- Insight logging to memory with user-controllable visibility.

### Key User Flows and Interactions

#### 1. Decode Feedback Flow
- User inputs: manager feedback, performance review text, or a summary of a conversation.
- System behavior:
  - Reflects back what it heard.
  - Asks 2 to 5 high-leverage clarifying questions.
  - Identifies the category of issue (impact, communication, leadership, ambiguity, etc.).
  - Applies frameworks silently.
  - Produces concrete output.
  - Logs insight to memory.
- Output artifacts:
  - Impact decode summary with plausible interpretations and validation signals.
  - Action plan with communication, stakeholder alignment, and project reframing.
  - Draft of clarifying questions for the manager.

#### 2. Performance Review Decoding
- User inputs: performance review excerpts or summary.
- System behavior:
  - Identify surprises, vagueness, and missing evidence.
  - Separate actionable signals from political or incomplete statements.
- Output artifacts:
  - Decoded review translation.
  - Clarifying questions draft.
  - Memory log of recurring feedback themes.

#### 3. Confidence and Comparison Check
- User inputs: feelings of being behind, peer comparison, self-doubt.
- System behavior:
  - Clarify dimensions of comparison and evidence.
  - Reframe toward role expectations and high-leverage focus.
- Output artifacts:
  - Reality check on what matters for the role.
  - Focus reframe with prioritized skill investments and deprioritizations.
  - Emotional normalization without therapy framing.

#### 4. Promotion Planning
- User inputs: target level and timeline.
- System behavior:
  - Clarify level expectations and decision makers.
  - Build backward plan from promotion criteria.
- Output artifacts:
  - 12-month promotion map with required behaviors and signals.
  - Quarterly focus areas across execution, technical, and influence.
  - Saved goal with level target and timeline.

#### 5. Brain Dump Organization
- User inputs: unstructured thoughts and concerns.
- System behavior:
  - Synthesizes themes.
  - Minimizes questions until after synthesis.
- Output artifacts:
  - Organized summary with root causes and through-lines.
  - Next actions: emotional, tactical, and strategic.

#### 6. Repeating Problems Diagnosis
- User inputs: repeated issues or stuck patterns.
- System behavior:
  - Identify recurrence, avoided decisions, and optimization bias.
- Output artifacts:
  - Pattern diagnosis and rationale.
  - Behavioral experiment for next occurrence.

### Inputs, Outputs, and System Behavior
- Inputs:
  - Free-form text, quotes, or summaries from users.
  - Optional metadata: level, team context, project list, past feedback summaries.
- Outputs:
  - Natural language summaries.
  - Actionable plans and question drafts.
  - Structured memory entries and insights.
- System behavior:
  - Must resist early advice.
  - Must capture context and update advice over time.
  - Must surface memory carefully and sparingly.

## Non-Functional Requirements

### Performance
- Response latency must feel conversational and not break flow.
- Memory retrieval and summarization must be fast enough to maintain continuity.

### Scalability (Inferred)
- Ability to handle persistent memory per user over months or years.
- Efficient retrieval of relevant context and patterns.

### Reliability
- Must avoid hallucinated memory references.
- Must not lose long-term context or saved insights.

### Security and Privacy
- Users may share sensitive work and personal information.
- Must provide explicit privacy posture, transparency about memory usage, and controls.
- Optional local memory is recommended to reduce trust barriers.

### Usability
- Calm, low-chrome chat interface.
- Encourage long, messy inputs.
- Explicit brain dump mode.

### Constraints and Assumptions
- The product should avoid positioning as therapy or clinical mental health support.
- The mentor must validate emotions but redirect toward agency.
- Memory surfacing should feel like continuity, not surveillance.

## Technical Architecture (Inferred)

### System Components
- Chat interface with support for long-form messages.
- Memory store for user context, insights, goals, and summaries.
- Pattern detection layer that scans memory for recurring themes.
- Output generator that produces structured artifacts (summaries, action plans, drafts).

### Data Flow
1. User submits input.
2. System reflects and asks clarifying questions.
3. System applies frameworks and produces outputs.
4. Insights and summaries are stored in memory.
5. Future sessions retrieve relevant context and patterns for continuity.

### APIs, Services, or Modules (Inferred)
- Conversation orchestration service.
- Memory retrieval and summarization service.
- Insight logging module.
- UI layer with artifact views (summaries, goals, action plans).

## Edge Cases and Failure Scenarios

### Over-Advising Too Early
- Risk: User perceives generic or presumptive advice.
- Handling: Enforce a mandatory clarification phase before advice.

### Generic Career Advice
- Risk: Outputs feel templated and not context-specific.
- Handling: Aggressively capture and reference user context before output.

### Creepy Memory Use
- Risk: Users feel surveilled if references are too frequent or confident.
- Handling: Limit memory surfacing and phrase it tentatively.

### Emotional Dependency
- Risk: Users rely solely on the mentor.
- Handling: Encourage real-world conversations and experiments.

### Ambiguous Feedback Without Data
- Risk: System cannot decode without evidence.
- Handling: Ask targeted questions, label assumptions explicitly, produce multiple plausible interpretations.

## Open Questions and Risks

### Open Questions
- How much memory should be stored by default versus user-controlled?
- What is the minimal context needed to avoid generic advice?
- How should the system handle conflicting feedback across time?
- What level of transparency about memory and pattern detection is optimal?

### Product and Technical Risks
- Failure to differentiate from generic AI advice tools.
- Privacy concerns reducing adoption.
- Memory retrieval errors leading to incorrect pattern claims.
- Over-empathizing and drifting into therapy tone.

## Future Considerations

### Possible Extensions
- Mentor modes such as Promotion Coach, Feedback Decoder, Confidence Calibrator, Staff Thinking Partner.
- Level-specific guidance systems (Junior to Mid, Mid to Senior, Senior to Staff).
- Enhanced visualizations of themes, goals, and progress over time.

### Out of Scope (Now, but Relevant Later)
- Real-time integration with HR systems or performance review platforms.
- Team or manager-facing dashboards.
- Full enterprise analytics and reporting.

## Interpretation Rules Applied

### Inferred Assumptions
- Success metrics include repeat usage, clarity ratings, and action output rates.
- Architecture includes a memory store and retrieval layer.
- Scalability and privacy requirements are critical due to sensitive data.

### Contradiction Resolution
No direct contradictions were found. Where ambiguities existed, the most reasonable interpretation was chosen: the product is primarily a persistent mentor for engineers focused on career clarity, not therapy or generic coaching.

### Terminology Normalization
- "Mentor" refers to the persistent AI system.
- "Memory" refers to stored context, insights, goals, and summaries.
- "Artifacts" refer to structured outputs like action plans, summaries, and questions drafts.

## Differentiation Summary
- Persistent, context-aware mentorship with pattern detection over time.
- Focused on decoding ambiguity in feedback and expectations.
- Provides actionable outputs grounded in personal context.
- Balances empathy and strategy without becoming therapy.