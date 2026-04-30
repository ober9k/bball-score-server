import { maxLengthMessage, minLengthMessage } from "@/lib/messages";
import { validationHandler } from "@/middlewares/validation-handler";
import { withActivatable, withArchivable } from "@/schemas/schemas";
import { z } from "zod";

const NameLabel = "Name";
const NameMinLength = 1;
const NameMaxLength = 32;

const zSeason = z.object({
  name: z.string()
    .min(NameMinLength, minLengthMessage(NameLabel, NameMinLength))
    .max(NameMaxLength, maxLengthMessage(NameLabel, NameMaxLength)),
  ...withActivatable,
  ...withArchivable,
});

export function seasonValidationHandler() {
  return validationHandler(zSeason);
}
