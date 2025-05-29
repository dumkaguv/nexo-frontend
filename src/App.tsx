import "@/assets/styles/styles.css";
import { Card, MainLayout, Providers, Sidebar } from "@/components/shared";

function App() {
  return (
    <Providers>
      <MainLayout>
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
      </MainLayout>
    </Providers>
  );
}

export default App;
