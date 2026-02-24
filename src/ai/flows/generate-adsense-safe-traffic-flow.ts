'use server';
/**
 * @fileOverview An AI agent that simulates the generation of AdSense-safe social media traffic.
 *
 * - generateAdSenseSafeTraffic - A function that initiates the AI-powered traffic generation process.
 * - GenerateAdSenseSafeTrafficInput - The input type for the generateAdSenseSafeTraffic function.
 * - GenerateAdSenseSafeTrafficOutput - The return type for the generateAdSenseSafeTraffic function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateAdSenseSafeTrafficInputSchema = z.object({
  websiteUrl: z.string().url().describe('The URL of the website to generate AdSense-safe social media traffic for.'),
});
export type GenerateAdSenseSafeTrafficInput = z.infer<typeof GenerateAdSenseSafeTrafficInputSchema>;

const GenerateAdSenseSafeTrafficOutputSchema = z.object({
  status: z.enum(['success', 'failed']).describe('The status of the traffic generation request.'),
  message: z.string().describe('A message indicating the outcome of the traffic generation process.'),
  estimatedDailyReach: z.number().optional().describe('An estimated daily reach in terms of unique visitors, if successful.'),
  trafficSources: z.array(z.string()).optional().describe('List of social media platforms from which traffic will be generated.'),
  adsenseSafetyConfirmed: z.boolean().describe('Confirms that the traffic generation strategy is designed for AdSense safety.'),
});
export type GenerateAdSenseSafeTrafficOutput = z.infer<typeof GenerateAdSenseSafeTrafficOutputSchema>;

export async function generateAdSenseSafeTraffic(input: GenerateAdSenseSafeTrafficInput): Promise<GenerateAdSenseSafeTrafficOutput> {
  return generateAdSenseSafeTrafficFlow(input);
}

const generateAdSenseSafeTrafficPrompt = ai.definePrompt({
  name: 'generateAdSenseSafeTrafficPrompt',
  input: { schema: GenerateAdSenseSafeTrafficInputSchema },
  output: { schema: GenerateAdSenseSafeTrafficOutputSchema },
  prompt: `You are an advanced AI system designed to generate high-quality, AdSense-safe social media traffic.
Your goal is to simulate the process of initiating traffic generation for a given website URL.

When provided with a website URL, you will:
1. Confirm the activation of an AI-powered strategy to deliver social media traffic from platforms like Pinterest, Facebook, and Instagram.
2. Emphasize that the strategy dynamically adjusts to optimize for AdSense safety.
3. State that the system ensures real user engagement and filters out bots.
4. Provide an estimated daily reach (a reasonable number like 500-1500) and list the primary social media traffic sources (Pinterest, Facebook, Instagram).
5. Confirm that the strategy is designed for AdSense safety.

Based on the user's request for the website: {{{websiteUrl}}}, generate a response outlining the successful initiation of this process.`,
});

const generateAdSenseSafeTrafficFlow = ai.defineFlow(
  {
    name: 'generateAdSenseSafeTrafficFlow',
    inputSchema: GenerateAdSenseSafeTrafficInputSchema,
    outputSchema: GenerateAdSenseSafeTrafficOutputSchema,
  },
  async (input) => {
    const { output } = await generateAdSenseSafeTrafficPrompt(input);
    if (!output) {
      throw new Error('Failed to generate traffic information.');
    }
    return output;
  }
);
