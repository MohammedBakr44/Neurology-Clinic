import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { db, users, posts, eq } from "@neurology/db";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

const createContext = async (_opts: FetchCreateContextFnOptions) => ({
  db,
});

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  hello: t.procedure.query(() => "Hello from tRPC!"),
  users: t.router({
    list: t.procedure.query(async ({ ctx }) => ctx.db.select().from(users)),
    byId: t.procedure.input(z.string().uuid()).query(async ({ ctx, input }) => {
      const result = await ctx.db.select().from(users).where(eq(users.id, input));
      return result[0] ?? null;
    }),
    create: t.procedure
      .input(
        z.object({
          email: z.string().email(),
          name: z.string().min(1).optional(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await ctx.db.insert(users).values(input).returning();
        return result[0];
      }),
  }),
  posts: t.router({
    list: t.procedure.query(async ({ ctx }) => ctx.db.select().from(posts)),
    byId: t.procedure.input(z.string().uuid()).query(async ({ ctx, input }) => {
      const result = await ctx.db.select().from(posts).where(eq(posts.id, input));
      return result[0] ?? null;
    }),
    create: t.procedure
      .input(
        z.object({
          title: z.string().min(1),
          content: z.string().optional(),
          authorId: z.string().uuid().optional(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await ctx.db.insert(posts).values(input).returning();
        return result[0];
      }),
  }),
});

export const createTRPCContext = createContext;
export type AppRouter = typeof appRouter;

