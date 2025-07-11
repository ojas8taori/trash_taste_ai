import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertPickupSchema, insertWasteScanSchema, insertCommunityReportSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/user/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Waste categories routes
  app.get("/api/waste-categories", async (req, res) => {
    try {
      const categories = await storage.getWasteCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Pickup routes
  app.get("/api/pickups/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const pickups = await storage.getUserPickups(userId);
      res.json(pickups);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/pickups", async (req, res) => {
    try {
      const pickupData = insertPickupSchema.parse(req.body);
      const pickup = await storage.createPickup(pickupData);
      res.status(201).json(pickup);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid pickup data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/pickups/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status, weight } = req.body;
      await storage.updatePickupStatus(id, status, weight);
      res.json({ message: "Pickup updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Challenge routes
  app.get("/api/challenges", async (req, res) => {
    try {
      const challenges = await storage.getActiveChallenges();
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/user-challenges/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const userChallenges = await storage.getUserChallenges(userId);
      res.json(userChallenges);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Waste scan routes
  app.post("/api/waste-scans", async (req, res) => {
    try {
      const scanData = insertWasteScanSchema.parse(req.body);
      const scan = await storage.createWasteScan(scanData);
      res.status(201).json(scan);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid scan data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/waste-scans/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const scans = await storage.getUserScans(userId);
      res.json(scans);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Community report routes
  app.post("/api/community-reports", async (req, res) => {
    try {
      const reportData = insertCommunityReportSchema.parse(req.body);
      const report = await storage.createCommunityReport(reportData);
      res.status(201).json(report);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid report data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/community-reports", async (req, res) => {
    try {
      const reports = await storage.getCommunityReports();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Stats routes
  app.get("/api/user-stats/:userId/:month/:year", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const month = parseInt(req.params.month);
      const year = parseInt(req.params.year);
      const stats = await storage.getUserStats(userId, month, year);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Leaderboard route
  app.get("/api/leaderboard", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const leaderboard = await storage.getLeaderboard(limit);
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
