import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouter } from "./";

const queryClient = new QueryClient();

export const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
};
