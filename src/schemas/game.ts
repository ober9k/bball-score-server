import { minLengthMessage } from "@/lib/messages";
import { validationHandler } from "@/middlewares/validation-handler";
import { GamePhase, type GamePhaseType } from "@/types/game/game-phase";
import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

const RoundLabel = "Round";
const RoundMinLength = 1;

const phaseEnum = Object.values(GamePhase) as [GamePhaseType, ...GamePhaseType[]];

export const zGame = z.object({
  date: z.date(),
  phase: z.enum(phaseEnum),
  round: z.number()
    .min(RoundMinLength, minLengthMessage(RoundLabel, RoundMinLength)),
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
