import { Card, Sidebar } from "@/components/shared";

export default function HomePage() {
  return (
    <div className="flex gap-5">
      <aside className="w-[260px] max-w-[260px]">
        <Sidebar />
      </aside>

      <main className="w-full flex-1">
        <Card>
          <h1>App</h1>
        </Card>
      </main>
    </div>
  );
}
