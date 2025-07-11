import { pgTable, text, serial, integer, boolean, timestamp, decimal, json } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  ecoPoints: integer("eco_points").default(0),
  level: integer("level").default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

export const wasteCategories = pgTable("waste_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  color: text("color").notNull(),
  icon: text("icon").notNull(),
  pickupFrequency: text("pickup_frequency").notNull(),
});

export const pickups = pgTable("pickups", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  categoryId: integer("category_id").references(() => wasteCategories.id).notNull(),
  scheduledDate: timestamp("scheduled_date").notNull(),
  status: text("status").notNull().default("scheduled"), // scheduled, in_progress, completed, cancelled
  weight: decimal("weight", { precision: 5, scale: 2 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  points: integer("points").notNull(),
  type: text("type").notNull(), // daily, weekly, monthly
  requirements: json("requirements"), // JSON object with challenge requirements
  isActive: boolean("is_active").default(true),
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
});

export const userChallenges = pgTable("user_challenges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  challengeId: integer("challenge_id").references(() => challenges.id).notNull(),
  progress: integer("progress").default(0),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const wasteScans = pgTable("waste_scans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  itemName: text("item_name").notNull(),
  category: text("category").notNull(),
  confidence: decimal("confidence", { precision: 3, scale: 2 }),
  disposalAdvice: text("disposal_advice").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const communityReports = pgTable("community_reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  type: text("type").notNull(), // illegal_dumping, overflowing_bin, sanitation_issue
  description: text("description").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url"),
  status: text("status").default("pending"), // pending, in_progress, resolved
  createdAt: timestamp("created_at").defaultNow(),
});

export const userStats = pgTable("user_stats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  month: integer("month").notNull(),
  year: integer("year").notNull(),
  wasteReduced: decimal("waste_reduced", { precision: 6, scale: 2 }).default("0"),
  carbonSaved: decimal("carbon_saved", { precision: 6, scale: 2 }).default("0"),
  pointsEarned: integer("points_earned").default(0),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  pickups: many(pickups),
  challenges: many(userChallenges),
  scans: many(wasteScans),
  reports: many(communityReports),
  stats: many(userStats),
}));

export const wasteCategoriesRelations = relations(wasteCategories, ({ many }) => ({
  pickups: many(pickups),
}));

export const pickupsRelations = relations(pickups, ({ one }) => ({
  user: one(users, {
    fields: [pickups.userId],
    references: [users.id],
  }),
  category: one(wasteCategories, {
    fields: [pickups.categoryId],
    references: [wasteCategories.id],
  }),
}));

export const challengesRelations = relations(challenges, ({ many }) => ({
  userChallenges: many(userChallenges),
}));

export const userChallengesRelations = relations(userChallenges, ({ one }) => ({
  user: one(users, {
    fields: [userChallenges.userId],
    references: [users.id],
  }),
  challenge: one(challenges, {
    fields: [userChallenges.challengeId],
    references: [challenges.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  ecoPoints: true,
  level: true,
  createdAt: true,
});

export const insertPickupSchema = createInsertSchema(pickups).omit({
  id: true,
  createdAt: true,
});

export const insertChallengeSchema = createInsertSchema(challenges).omit({
  id: true,
});

export const insertWasteScanSchema = createInsertSchema(wasteScans).omit({
  id: true,
  createdAt: true,
});

export const insertCommunityReportSchema = createInsertSchema(communityReports).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type WasteCategory = typeof wasteCategories.$inferSelect;
export type Pickup = typeof pickups.$inferSelect;
export type InsertPickup = z.infer<typeof insertPickupSchema>;
export type Challenge = typeof challenges.$inferSelect;
export type UserChallenge = typeof userChallenges.$inferSelect;
export type WasteScan = typeof wasteScans.$inferSelect;
export type InsertWasteScan = z.infer<typeof insertWasteScanSchema>;
export type CommunityReport = typeof communityReports.$inferSelect;
export type InsertCommunityReport = z.infer<typeof insertCommunityReportSchema>;
export type UserStats = typeof userStats.$inferSelect;
