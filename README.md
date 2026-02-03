# AI Mentor - Your Software Engineering Career Coach

An open source, self-hosted AI mentor application designed to help software engineers navigate their careers. Have meaningful conversations about feedback, performance reviews, career growth, and more with a persistent AI mentor that remembers your context.

## Features

- **Persistent Memory**: The AI remembers your role, experience level, past conversations, and recurring themes
- **Intelligent Conversation Flow**: Asks clarifying questions before giving advice
- **Artifacts System**: Save summaries, action plans, question drafts, and goals
- **Pattern Detection**: Identifies recurring themes across your conversations
- **Privacy-Focused**: Your data lives in your own Supabase instance
- **Self-Hosted**: Run locally with your own OpenAI API key

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **UI Components**: shadcn/ui
- **Database & Auth**: Supabase (PostgreSQL + Auth)
- **AI**: OpenAI API
- **Deployment**: Self-hosted (local or your preferred hosting)

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- A [Supabase](https://supabase.com) account (free tier works)
- An [OpenAI](https://platform.openai.com) API key

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Standup
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Project Settings** > **API** and copy:
   - Project URL
   - Anon/Public Key

3. Run the database migration:
   - Go to the **SQL Editor** in your Supabase dashboard
   - Copy the contents of `supabase/migrations/001_initial_schema.sql`
   - Paste and run it in the SQL Editor

### 3. Get Your OpenAI API Key

1. Sign up or log in at [platform.openai.com](https://platform.openai.com)
2. Go to **API Keys** and create a new key
3. Copy the key (you won't be able to see it again)

### 4. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages (login, signup)
│   ├── (app)/             # Main application pages
│   │   ├── chat/          # Chat interface
│   │   ├── artifacts/     # Saved artifacts
│   │   └── settings/      # User settings
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/                # Base UI components (shadcn/ui)
│   ├── chat/              # Chat-specific components
│   └── artifacts/         # Artifact display components
├── lib/                   # Utility libraries
│   ├── supabase/          # Supabase client & helpers
│   ├── openai/            # OpenAI integration
│   ├── orchestration/     # Conversation logic
│   └── memory/            # Memory retrieval & storage
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
└── supabase/             # Database migrations
    └── migrations/        # SQL migration files
```

## Database Schema

The application uses the following main tables:

- **profiles**: User profile data (role, level, company type)
- **sessions**: Conversation sessions
- **messages**: Individual messages in conversations
- **artifacts**: Saved outputs (summaries, action plans, etc.)
- **themes**: Detected recurring themes
- **goals**: User goals with status tracking

All tables include Row Level Security (RLS) policies to ensure users can only access their own data.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Code Style

This project uses:
- ESLint for linting
- Prettier for code formatting
- TypeScript strict mode

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)

## Privacy & Data

- All your data is stored in your own Supabase instance
- Your OpenAI API key is used only for your requests
- No data is sent to any third-party servers except OpenAI for AI responses
- You have full control over your data and can delete it at any time

## Support

If you encounter issues:
1. Check that your environment variables are correctly set
2. Ensure your Supabase migrations ran successfully
3. Verify your OpenAI API key has available credits
4. Open an issue on GitHub with details about your problem

## Roadmap

See the [implementation plan](docs/implementation-plan.md) for upcoming features and phases.
