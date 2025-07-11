import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWasteScanSchema } from "@shared/schema";
import { analyzeWasteImage } from "./services/gemini";
import multer from "multer";
import path from "path";
import fs from "fs";

const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get current user (simplified - in production would use sessions/auth)
  app.get("/api/user", async (req, res) => {
    try {
      const user = await storage.getUser(1); // Default user
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Scan waste image
  app.post("/api/scan", upload.single('image'), async (req, res) => {
    try {
      console.log('Received scan request:', {
        file: req.file ? {
          filename: req.file.filename,
          mimetype: req.file.mimetype,
          size: req.file.size,
          path: req.file.path
        } : 'No file',
        body: req.body
      });
      
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      const imagePath = req.file.path;
      
      try {
        // Analyze image with Gemini AI
        const analysis = await analyzeWasteImage(imagePath);
        
        // Create scan record
        const scanData = {
          userId: 1, // Default user
          imageUrl: imagePath,
          category: analysis.category,
          subcategory: analysis.subcategory,
          disposalMethod: analysis.disposalMethod,
          pointsEarned: analysis.pointsEarned,
          confidence: analysis.confidence
        };

        const scan = await storage.createWasteScan(scanData);
        
        // Update user eco points
        await storage.updateUserEcoPoints(1, analysis.pointsEarned);
        
        // Clean up uploaded file
        fs.unlinkSync(imagePath);
        
        res.json({
          scan,
          analysis
        });
      } catch (analysisError) {
        // Clean up uploaded file on error
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
        throw analysisError;
      }
    } catch (error) {
      console.error('Scan error:', error);
      res.status(500).json({ message: "Failed to analyze image" });
    }
  });

  // Get user's recent scans
  app.get("/api/scans", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const scans = await storage.getUserScans(1, limit);
      res.json(scans);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch scans" });
    }
  });

  // Get user's achievements
  app.get("/api/achievements", async (req, res) => {
    try {
      const achievements = await storage.getUserAchievements(1);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  // Get user stats
  app.get("/api/stats", async (req, res) => {
    try {
      const user = await storage.getUser(1);
      const recentScans = await storage.getUserScans(1, 100);
      
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const scansToday = recentScans.filter(scan => {
        const scanDate = scan.createdAt;
        return scanDate && scanDate.toDateString() === today.toDateString();
      }).length;
      
      const scansThisWeek = recentScans.filter(scan => {
        const scanDate = scan.createdAt;
        return scanDate && scanDate >= weekAgo;
      }).length;
      
      const pointsThisWeek = recentScans
        .filter(scan => {
          const scanDate = scan.createdAt;
          return scanDate && scanDate >= weekAgo;
        })
        .reduce((sum, scan) => sum + (scan.pointsEarned || 0), 0);

      res.json({
        ecoPoints: user?.ecoPoints || 0,
        scansToday,
        scansThisWeek,
        pointsThisWeek,
        totalScans: recentScans.length
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
