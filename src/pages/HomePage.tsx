import { Card, Sidebar } from "@/components/shared";

export const HomePage = () => {
  return (
    <div className="flex gap-5">
      <Sidebar />

      <main className="w-full flex-1">
        <Card>
          <h1>App</h1>
        </Card>
      </main>
    </div>
  );
};
