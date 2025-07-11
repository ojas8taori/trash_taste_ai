import { 
  users, 
  wasteCategories, 
  pickups, 
  challenges, 
  userChallenges, 
  wasteScans, 
  communityReports, 
  userStats,
  type User, 
  type InsertUser,
  type WasteCategory,
  type Pickup,
  type InsertPickup,
  type Challenge,
  type UserChallenge,
  type WasteScan,
  type InsertWasteScan,
  type CommunityReport,
  type InsertCommunityReport,
  type UserStats
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, lte } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPoints(userId: number, points: number): Promise<void>;

  // Waste category methods
  getWasteCategories(): Promise<WasteCategory[]>;
  getWasteCategory(id: number): Promise<WasteCategory | undefined>;

  // Pickup methods
  getUserPickups(userId: number): Promise<Pickup[]>;
  createPickup(pickup: InsertPickup): Promise<Pickup>;
  updatePickupStatus(id: number, status: string, weight?: string): Promise<void>;

  // Challenge methods
  getActiveChallenges(): Promise<Challenge[]>;
  getUserChallenges(userId: number): Promise<UserChallenge[]>;
  updateChallengeProgress(userId: number, challengeId: number, progress: number): Promise<void>;

  // Waste scan methods
  createWasteScan(scan: InsertWasteScan): Promise<WasteScan>;
  getUserScans(userId: number): Promise<WasteScan[]>;

  // Community report methods
  createCommunityReport(report: InsertCommunityReport): Promise<CommunityReport>;
  getCommunityReports(): Promise<CommunityReport[]>;

  // Stats methods
  getUserStats(userId: number, month: number, year: number): Promise<UserStats | undefined>;
  updateUserStats(userId: number, month: number, year: number, stats: Partial<UserStats>): Promise<void>;
  getLeaderboard(limit: number): Promise<User[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUserPoints(userId: number, points: number): Promise<void> {
    await db
      .update(users)
      .set({ ecoPoints: points })
      .where(eq(users.id, userId));
  }

  async getWasteCategories(): Promise<WasteCategory[]> {
    return await db.select().from(wasteCategories);
  }

  async getWasteCategory(id: number): Promise<WasteCategory | undefined> {
    const [category] = await db.select().from(wasteCategories).where(eq(wasteCategories.id, id));
    return category || undefined;
  }

  async getUserPickups(userId: number): Promise<Pickup[]> {
    return await db
      .select()
      .from(pickups)
      .where(eq(pickups.userId, userId))
      .orderBy(desc(pickups.scheduledDate));
  }

  async createPickup(pickup: InsertPickup): Promise<Pickup> {
    const [newPickup] = await db
      .insert(pickups)
      .values(pickup)
      .returning();
    return newPickup;
  }

  async updatePickupStatus(id: number, status: string, weight?: string): Promise<void> {
    const updateData: any = { status };
    if (weight) {
      updateData.weight = weight;
    }
    await db
      .update(pickups)
      .set(updateData)
      .where(eq(pickups.id, id));
  }

  async getActiveChallenges(): Promise<Challenge[]> {
    return await db
      .select()
      .from(challenges)
      .where(eq(challenges.isActive, true));
  }

  async getUserChallenges(userId: number): Promise<UserChallenge[]> {
    return await db
      .select()
      .from(userChallenges)
      .where(eq(userChallenges.userId, userId));
  }

  async updateChallengeProgress(userId: number, challengeId: number, progress: number): Promise<void> {
    await db
      .update(userChallenges)
      .set({ 
        progress,
        completed: progress >= 100,
        completedAt: progress >= 100 ? new Date() : null
      })
      .where(
        and(
          eq(userChallenges.userId, userId),
          eq(userChallenges.challengeId, challengeId)
        )
      );
  }

  async createWasteScan(scan: InsertWasteScan): Promise<WasteScan> {
    const [newScan] = await db
      .insert(wasteScans)
      .values(scan)
      .returning();
    return newScan;
  }

  async getUserScans(userId: number): Promise<WasteScan[]> {
    return await db
      .select()
      .from(wasteScans)
      .where(eq(wasteScans.userId, userId))
      .orderBy(desc(wasteScans.createdAt));
  }

  async createCommunityReport(report: InsertCommunityReport): Promise<CommunityReport> {
    const [newReport] = await db
      .insert(communityReports)
      .values(report)
      .returning();
    return newReport;
  }

  async getCommunityReports(): Promise<CommunityReport[]> {
    return await db
      .select()
      .from(communityReports)
      .orderBy(desc(communityReports.createdAt));
  }

  async getUserStats(userId: number, month: number, year: number): Promise<UserStats | undefined> {
    const [stats] = await db
      .select()
      .from(userStats)
      .where(
        and(
          eq(userStats.userId, userId),
          eq(userStats.month, month),
          eq(userStats.year, year)
        )
      );
    return stats || undefined;
  }

  async updateUserStats(userId: number, month: number, year: number, stats: Partial<UserStats>): Promise<void> {
    const existing = await this.getUserStats(userId, month, year);
    
    if (existing) {
      await db
        .update(userStats)
        .set(stats)
        .where(eq(userStats.id, existing.id));
    } else {
      await db
        .insert(userStats)
        .values({
          userId,
          month,
          year,
          ...stats
        });
    }
  }

  async getLeaderboard(limit: number): Promise<User[]> {
    return await db
      .select()
      .from(users)
      .orderBy(desc(users.ecoPoints))
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();
