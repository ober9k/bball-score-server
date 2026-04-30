import { z } from "zod";

export const withActivatable = {
  activated: z.boolean(),
};

export const withArchived = {
  archived: z.boolean(),
};
