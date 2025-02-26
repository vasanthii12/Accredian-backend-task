import { pgTable, text, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const referrals = pgTable("referrals", {
  id: serial("id").primaryKey(),
  referrerName: varchar("referrer_name", { length: 100 }).notNull(),
  referrerEmail: varchar("referrer_email", { length: 100 }).notNull(),
  refereeName: varchar("referee_name", { length: 100 }).notNull(),
  refereeEmail: varchar("referee_email", { length: 100 }).notNull(),
  courseName: varchar("course_name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertReferralSchema = createInsertSchema(referrals).omit({
  id: true,
  createdAt: true,
}).extend({
  referrerEmail: z.string().email("Please enter a valid email"),
  refereeEmail: z.string().email("Please enter a valid email"),
});

export type InsertReferral = z.infer<typeof insertReferralSchema>;
export type Referral = typeof referrals.$inferSelect;
