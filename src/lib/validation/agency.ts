import { z } from "zod";

export const agencySchema = z.object({
  agencyName: z
    .string()
    .min(2, "Agency name must be at least 2 characters")
    .max(100, "Agency name is too long"),
    
  country: z
    .string()
    .min(1, "Country is required"),
    
  plan: z
  .string()
    .min(5, "plan is required"),
    
  services: z
   .string()
    .min(5, "services is required"),

  website: z
    .string()
    .url("Invalid website URL")
    .or(z.literal("")),
});

export type AgencyInput = z.infer<typeof agencySchema>;