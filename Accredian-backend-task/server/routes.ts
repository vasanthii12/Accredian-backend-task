import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertReferralSchema } from "@shared/schema";
import { sendReferralEmail } from "./email";

export async function registerRoutes(app: Express) {
  app.post("/api/referrals", async (req, res) => {
    try {
      const data = insertReferralSchema.parse(req.body);
      const referral = await storage.createReferral(data);

      // Try to send email, but don't fail if it doesn't work
      try {
        await sendReferralEmail(referral);
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Continue execution - don't let email failure stop the referral process
      }

      res.json(referral);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Invalid request" });
    }
  });

  return createServer(app);
}