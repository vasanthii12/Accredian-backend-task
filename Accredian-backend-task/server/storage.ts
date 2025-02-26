import { referrals, type Referral, type InsertReferral } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  createReferral(referral: InsertReferral): Promise<Referral>;
}

export class DatabaseStorage implements IStorage {
  async createReferral(insertReferral: InsertReferral): Promise<Referral> {
    const [referral] = await db
      .insert(referrals)
      .values(insertReferral)
      .returning();
    return referral;
  }
}

export const storage = new DatabaseStorage();