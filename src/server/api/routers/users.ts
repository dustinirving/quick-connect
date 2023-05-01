import { z } from 'zod';
import * as bcrypt from 'bcrypt';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc';
import { TRPCError } from '@trpc/server';

export const roundsOfHashing = 10;

export const usersRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.user.findUnique({ where: { id: input.id } });
  }),

  create: publicProcedure
    .input(z.object({
      name: z.string(),
      email: z.string(),
      password: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      const emailExists = await ctx.prisma.user.findUnique({ where: { email: input.email } });

      if (emailExists) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'A user with this email already exists.',
        });
      }

      const hashedPassword = await bcrypt.hash(
        input.password,
        roundsOfHashing,
      );

      return ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
        }
      })
    }),
});
