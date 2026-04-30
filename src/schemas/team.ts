import { maxLengthMessage, minLengthMessage } from "@/lib/messages";
import { validationHandler } from "@/middlewares/validation-handler";
import { withActivatable, withArchived } from "@/schemas/schemas";
import { z } from "zod";

const NameLabel = "Name";
const NameMinLength = 1;
const NameMaxLength = 32;

const ShortNameLabel = "Short Name";
const ShortNameMinLength = 3;
const ShortNameMaxLength = 3;

const zTeam = z.object({
  name: z.string()
    .min(NameMinLength, minLengthMessage(NameLabel, NameMinLength))
    .max(NameMaxLength, maxLengthMessage(NameLabel, NameMaxLength)),
  shortName: z.string()
    .min(ShortNameMinLength, minLengthMessage(ShortNameLabel, ShortNameMinLength))
    .max(ShortNameMaxLength, maxLengthMessage(ShortNameLabel, ShortNameMaxLength)),
  divisionId: z.number(),
  ...withActivatable,
  ...withArchived,
});

export function teamValidationHandler() {
  return validationHandler(zTeam);
}
