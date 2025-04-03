import { serve } from "inngest/next";
import { NextResponse } from "next/server";

import { inngest } from "@/lib/inngest/client";
import {
  checkBudgetAlerts,
  generateMonthlyReports,
  processRecurringTransaction,
  triggerRecurringTransactions,
} from "@/lib/inngest/function";

// Add deployment validation
const validateDeployment = () => {
  if (!process.env.INNGEST_EVENT_KEY) {
    console.error("Inngest event key is not configured");
    return false;
  }

  if (process.env.VERCEL_ENV === 'production' && !process.env.VERCEL_URL) {
    console.error("Missing VERCEL_URL in production environment");
    return false;
  }

  return true;
};

// Add error handling middleware
const handler = serve({
  client: inngest,
  functions: [
    processRecurringTransaction,
    triggerRecurringTransactions,
    generateMonthlyReports,
    checkBudgetAlerts,
  ],
});

// Wrap the handler with error handling and validation
export const GET = async (req) => {
  try {
    if (!validateDeployment()) {
      return NextResponse.json(
        { error: "Invalid deployment configuration" },
        { status: 500 }
      );
    }
    const response = await handler(req);
    console.log("Inngest GET handler success");
    return response;
  } catch (error) {
    console.error("Inngest GET handler error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  try {
    if (!validateDeployment()) {
      return NextResponse.json(
        { error: "Invalid deployment configuration" },
        { status: 500 }
      );
    }
    const response = await handler(req);
    console.log("Inngest POST handler success");
    return response;
  } catch (error) {
    console.error("Inngest POST handler error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const PUT = async (req) => {
  try {
    if (!validateDeployment()) {
      return NextResponse.json(
        { error: "Invalid deployment configuration" },
        { status: 500 }
      );
    }
    const response = await handler(req);
    console.log("Inngest PUT handler success");
    return response;
  } catch (error) {
    console.error("Inngest PUT handler error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
