import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";
import { createServerEntry } from "@tanstack/react-start/server-entry";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter, createTRPCContext } from "./server/trpc";

const startHandler = createStartHandler(defaultStreamHandler);

export default createServerEntry({
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/trpc")) {
      return fetchRequestHandler({
        endpoint: "/api/trpc",
        req: request,
        router: appRouter,
        createContext: createTRPCContext,
        onError({ error, path, type }) {
          console.error("tRPC error", { error, path, type });
        },
      });
    }

    return startHandler(request);
  },
});

