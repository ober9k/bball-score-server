import { minLengthMessage } from "@/lib/messages";
import { validationHandler } from "@/middlewares/validation-handler";
import { Phase, type PhaseType } from "@/types/game";
import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

const RoundLabel = "Round";
const RoundMinLength = 1;

const phaseEnum = Object.values(Phase) as [PhaseType, ...PhaseType[]];

export const zGame = z.object({
  date: z.date(),
  phase: z.enum(phaseEnum),
  round: z.number()
    .min(RoundMinLength, minLengthMessage(RoundLabel, RoundMinLength)),
  seasonId: z.number(),
  divisionId: z.number(),
  active: z.boolean(),
  archived: z.boolean(),
});


export function gameValidationHandler() {
  return validationHandler(zGame);
}

/**
 * TODO: temporary hack until I figure something out for this handling with the zod validator
 */
export function fixDate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  req.body.date = new Date(req.body.date);
  next();
}
