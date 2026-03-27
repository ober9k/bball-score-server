import { maxLengthMessage, minLengthMessage } from "@/lib/messages";
import { validationHandler } from "@/middlewares/validation-handler";
import { z } from "zod";

const NameLabel = "Name";
const NameMinLength = 1;
const NameMaxLength = 32;

const zDivision = z.object({
  name: z.string()
    .min(NameMinLength, minLengthMessage(NameLabel, NameMinLength))
    .max(NameMaxLength, maxLengthMessage(NameLabel, NameMaxLength)),
  seasonId: z.number(),
});

export function divisionValidationHandler() {
  return validationHandler(zDivision);
}
