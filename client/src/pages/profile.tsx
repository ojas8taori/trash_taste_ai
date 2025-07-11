import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/use-mobile";
import Navigation from "@/components/navigation";
import BottomNav from "@/components/bottom-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Award, MapPin, Bell, Settings, Share, Heart, Users, Zap, Star } from "lucide-react";

export default function Profile() {
  const isMobile = useIsMobile();
  const [currentUserId] = useState(1);

  const { data: currentUser } = useQuery({
    queryKey: ["/api/user", currentUserId],
  });

  // Mock user data
  const user = currentUser || {
    id: 1,
    username: "EcoWarrior92",
    email: "ecowarrior@example.com",
    ecoPoints: 2450,
    level: 4,
    createdAt: "2023-06-15"
  };

  const badges = [
    { id: 1, name: "Green Starter", description: "First week completed", icon: "🌱", earned: true },
    { id: 2, name: "Recycling Pro", description: "100 items scanned", icon: "♻️", earned: true },
    { id: 3, name: "Community Helper", description: "5 reports submitted", icon: "🤝", earned: true },
    { id: 4, name: "Waste Reducer", description: "50kg waste reduced", icon: "📉", earned: true },
    { id: 5, name: "Carbon Saver", description: "25kg CO₂ saved", icon: "🌍", earned: false },
    { id: 6, name: "Eco Champion", description: "Top 10% this month", icon: "👑", earned: false }
  ];

  const recentActivity = [
    { id: 1, action: "Scanned plastic bottle", points: 10, time: "2 hours ago" },
    { id: 2, action: "Scheduled organic waste pickup", points: 25, time: "1 day ago" },
    { id: 3, action: "Completed weekly challenge", points: 50, time: "2 days ago" },
    { id: 4, action: "Reported overflowing bin", points: 15, time: "3 days ago" },
    { id: 5, action: "Joined community cleanup", points: 100, time: "1 week ago" }
  ];

  const levelInfo = {
    current: user.level,
    name: user.level >= 8 ? "Green Champion" : user.level >= 6 ? "Recycling Pro" : user.level >= 4 ? "Waste Reducer" : "Eco Beginner",
    progress: 75, // Mock progress to next level
    nextLevel: user.level + 1,
    pointsToNext: 550
  };

  const stats = {
    totalWasteReduced: "156.8 kg",
    carbonSaved: "62.3 kg",
    challengesCompleted: 12,
    daysActive: 45
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation ecoPoints={user.ecoPoints} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-eco-green rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-slate-800">{user.username}</h1>
                <p className="text-slate-600 mb-2">{user.email}</p>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="bg-eco-green text-white">
                    Level {levelInfo.current} • {levelInfo.name}
                  </Badge>
                  <span className="text-sm text-slate-600">
                    Member since {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-eco-green">{user.ecoPoints.toLocaleString()}</div>
                <div className="text-sm text-slate-600">Eco Points</div>
              </div>
            </div>
            
            {/* Level Progress */}
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Progress to Level {levelInfo.nextLevel}</span>
                <span className="text-sm text-slate-600">{levelInfo.pointsToNext} points to go</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div 
                  className="bg-eco-green h-3 rounded-full transition-all duration-300"
                  style={{ width: `${levelInfo.progress}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats and Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Your Impact</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-eco-green">{stats.totalWasteReduced}</div>
                    <div className="text-sm text-slate-600">Waste Reduced</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.carbonSaved}</div>
                    <div className="text-sm text-slate-600">CO₂ Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">{stats.challengesCompleted}</div>
                    <div className="text-sm text-slate-600">Challenges</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{stats.daysActive}</div>
                    <div className="text-sm text-slate-600">Days Active</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <div className="font-medium text-slate-800">{activity.action}</div>
                        <div className="text-sm text-slate-600">{activity.time}</div>
                      </div>
                      <div className="text-eco-green font-semibold">+{activity.points} pts</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Community Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <MapPin className="w-6 h-6" />
                    <span>Report Issue</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Users className="w-6 h-6" />
                    <span>Join Cleanup</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Share className="w-6 h-6" />
                    <span>Share Progress</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Heart className="w-6 h-6" />
                    <span>Donate Points</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Badges</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {badges.map((badge) => (
                    <div 
                      key={badge.id}
                      className={`p-3 rounded-lg text-center border-2 ${
                        badge.earned ? 'border-eco-green bg-green-50' : 'border-slate-200 bg-slate-50 opacity-50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <div className={`text-xs font-medium ${badge.earned ? 'text-eco-green' : 'text-slate-500'}`}>
                        {badge.name}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start">
                    <Bell className="w-4 h-4 mr-3" />
                    Notifications
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-3" />
                    Preferences
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <MapPin className="w-4 h-4 mr-3" />
                    Location
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Star className="w-4 h-4 mr-3" />
                    Rate App
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard Position */}
            <Card>
              <CardHeader>
                <CardTitle>Your Ranking</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-eco-green mb-2">#5</div>
                <div className="text-sm text-slate-600 mb-4">in your neighborhood</div>
                <Button size="sm" variant="outline" className="w-full">
                  View Full Leaderboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {isMobile && <BottomNav />}
    </div>
  );
}
