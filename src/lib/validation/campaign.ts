import { z } from "zod";

export const campaignSchema = z.object({
    campaignName: z.string().min(3, "Name is too short").max(50),
    pageViews: z.number().int().nonnegative(),
    webUrl: z.string().url("Invalid URL format"),
    trafficSource: z.string(),
    device: z.string(),
    creditUsed: z.number().positive("Credits must be greater than 0"),
    country: z.string().optional(),
});