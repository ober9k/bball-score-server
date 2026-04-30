import { z } from "zod";

export const withActivatable = {
  activated: z.boolean(),
};

export const withArchivable = {
  archived: z.boolean(),
};
