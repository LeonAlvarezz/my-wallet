import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient();

const TanstackQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanstackQueryProvider;
