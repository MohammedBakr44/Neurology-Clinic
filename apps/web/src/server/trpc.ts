import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { db, referrals, eq } from "@neurology/db";
import { referralSchema } from "@neurology/types";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

const createContext = async (_opts: FetchCreateContextFnOptions) => ({
  db,
});

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  hello: t.procedure.query(() => "Hello from tRPC!"),
  referrals: t.router({
    list: t.procedure.query(async ({ ctx }) => ctx.db.select().from(referrals)),
    create: t.procedure.input(referralSchema).mutation(async ({ ctx, input }) => {
      const result = await ctx.db.insert(referrals).values(input).returning();
      return result[0] ?? null;
    }),
  }),
  
 });

export const createTRPCContext = createContext;
export type AppRouter = typeof appRouter;
