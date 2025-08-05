import { Sidebar } from "@/components/shared";
import { FormCreatePost } from "@/features/posts/components";

export const HomePage = () => {
  return (
    <div className="flex gap-5">
      <Sidebar />

      <main className="w-full flex-1">
        <FormCreatePost />
      </main>
    </div>
  );
};
