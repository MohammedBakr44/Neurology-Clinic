import { QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import type { AppRouter } from "~/server/trpc";

export const queryClient = new QueryClient();

const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url:
        typeof window === "undefined"
          ? "http://localhost:3000/api/trpc"
          : `${window.location.origin}/api/trpc`,
    }),
  ],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient,
});

