import { users, wasteScans, achievements, type User, type InsertUser, type WasteScan, type InsertWasteScan, type Achievement, type InsertAchievement } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserEcoPoints(id: number, points: number): Promise<User | undefined>;
  
  // Waste scan operations
  createWasteScan(scan: InsertWasteScan): Promise<WasteScan>;
  getUserScans(userId: number, limit?: number): Promise<WasteScan[]>;
  getUserScansByCategory(userId: number, category: string): Promise<WasteScan[]>;
  
  // Achievement operations
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  getUserAchievements(userId: number): Promise<Achievement[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private wasteScans: Map<number, WasteScan>;
  private achievements: Map<number, Achievement>;
  private currentUserId: number;
  private currentScanId: number;
  private currentAchievementId: number;

  constructor() {
    this.users = new Map();
    this.wasteScans = new Map();
    this.achievements = new Map();
    this.currentUserId = 1;
    this.currentScanId = 1;
    this.currentAchievementId = 1;
    
    // Create a default user
    this.createUser({
      username: "eco_user",
      email: "user@ecobin.com",
      ecoPoints: 1247
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      ...insertUser,
      id,
      ecoPoints: insertUser.ecoPoints || 0,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserEcoPoints(id: number, points: number): Promise<User | undefined> {
    const user = this.users.get(id);
    if (user) {
      user.ecoPoints = (user.ecoPoints || 0) + points;
      this.users.set(id, user);
      return user;
    }
    return undefined;
  }

  async createWasteScan(insertScan: InsertWasteScan): Promise<WasteScan> {
    const id = this.currentScanId++;
    const scan: WasteScan = {
      ...insertScan,
      id,
      userId: insertScan.userId || null,
      imageUrl: insertScan.imageUrl || null,
      subcategory: insertScan.subcategory || null,
      pointsEarned: insertScan.pointsEarned || null,
      confidence: insertScan.confidence || null,
      createdAt: new Date()
    };
    this.wasteScans.set(id, scan);
    return scan;
  }

  async getUserScans(userId: number, limit = 10): Promise<WasteScan[]> {
    const userScans = Array.from(this.wasteScans.values())
      .filter(scan => scan.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
      .slice(0, limit);
    return userScans;
  }

  async getUserScansByCategory(userId: number, category: string): Promise<WasteScan[]> {
    return Array.from(this.wasteScans.values())
      .filter(scan => scan.userId === userId && scan.category === category);
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = this.currentAchievementId++;
    const achievement: Achievement = {
      ...insertAchievement,
      id,
      userId: insertAchievement.userId || null,
      earnedAt: new Date()
    };
    this.achievements.set(id, achievement);
    return achievement;
  }

  async getUserAchievements(userId: number): Promise<Achievement[]> {
    return Array.from(this.achievements.values())
      .filter(achievement => achievement.userId === userId)
      .sort((a, b) => (b.earnedAt?.getTime() || 0) - (a.earnedAt?.getTime() || 0));
  }
}

export const storage = new MemStorage();
