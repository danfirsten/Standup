import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, Brain, Target, Shield } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 max-w-3xl">
          Your Personal AI Career Coach for Software Engineering
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
          Navigate your career with an AI mentor that remembers your context, identifies patterns,
          and helps you grow. Open source and self-hosted with your own credentials.
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/50 px-4 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <MessageSquare className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Thoughtful Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  AI mentor asks clarifying questions before giving advice, ensuring personalized
                  guidance
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Brain className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Persistent Memory</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Remembers your role, experience level, past conversations, and recurring themes
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Actionable Artifacts</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Save summaries, action plans, question drafts, and track your career goals
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Privacy First</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Self-hosted with your own Supabase and OpenAI credentials. You own your data.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>
            Open source AI Mentor &middot;{' '}
            <a
              href="https://github.com"
              className="underline underline-offset-4 hover:text-foreground"
            >
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </main>
  )
}
