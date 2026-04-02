import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { routeTree } from "./routeTree.gen";
import { queryClient } from "~/utils/trpc";
import { DefaultCatchBoundary } from "./components/DefaultCatchBoundary";
import { NotFound } from "./components/NotFound";

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    context: { queryClient },
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    Wrap: function Wrap({ children }) {
      return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    },
  });

  setupRouterSsrQueryIntegration({ router, queryClient });
  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

