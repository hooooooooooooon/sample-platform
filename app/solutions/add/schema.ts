import { z } from "zod";

export const solutionSchema = z.object({});

export type SolutionType = z.infer<typeof solutionSchema>;
