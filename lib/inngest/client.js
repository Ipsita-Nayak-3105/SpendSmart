import { Inngest } from "inngest";

// Configure Inngest client with environment-specific settings
export const inngest = new Inngest({
  id: "spendsmart", // Unique app ID
  name: "SpendSmart",
  eventKey: process.env.INNGEST_EVENT_KEY,
  // Set the base URL based on environment
  baseUrl: process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.VERCEL_ENV === 'production'
    ? 'https://your-production-url.vercel.app' // Replace with your production URL
    : "http://localhost:3000",
  retryFunction: async (attempt) => ({
    delay: Math.pow(2, attempt) * 1000, // Exponential backoff
    maxAttempts: 3, // Increased from 2 to 3 for better reliability
  }),
});
