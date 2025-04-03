import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "spendsmart", // Unique app ID
  name: "SpendSmart",
  eventKey: process.env.INNGEST_EVENT_KEY,
  retryFunction: async (attempt) => ({
    delay: Math.pow(2, attempt) * 1000, // Exponential backoff
    maxAttempts: 2,
  }),
});
