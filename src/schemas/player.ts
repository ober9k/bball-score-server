import { maxLengthMessage, minLengthMessage } from "@/lib/messages";
import { validationHandler } from "@/middlewares/validation-handler";
import { Position, PositionType } from "@/types/player/position";
import { z } from "zod";

function heightFormatMessage(label: string): string {
  return `${label} must be of the correct feet and inches format (e.g. 5'8").`;
}

const NameLabel = "Name";
const NameMinLength = 1;
const NameMaxLength = 32;

const NumberLabel = "Number";
const NumberMinLength = 1;
const NumberMaxLength = 3;

const HeightLabel = "Height";
const HeightMinLength = 1;
const HeightRegex = /^[4-7]'([0-9]|1[0-1])"$/;

const positionEnum = Object.values(Position) as [PositionType, ...PositionType[]];

const zPlayer = z.object({
  name: z.string()
    .min(NameMinLength, minLengthMessage(NameLabel, NameMinLength))
    .max(NameMaxLength, maxLengthMessage(NameLabel, NameMaxLength)),
  position: z.enum(positionEnum),
  number: z.string()
    .min(NumberMinLength, minLengthMessage(NumberLabel, NumberMinLength))
    .max(NumberMaxLength, maxLengthMessage(NumberLabel, NumberMaxLength)),
  height: z.string()
    .min(HeightMinLength, minLengthMessage(HeightLabel, HeightMinLength))
    .regex(HeightRegex, heightFormatMessage(HeightLabel)),
});

export function playerValidationHandler() {
  return validationHandler(zPlayer);
}
