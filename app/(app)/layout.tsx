export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-xl font-bold">AI Mentor</h1>
        </div>
      </div>
      <main className="flex-1">{children}</main>
    </div>
  )
}
