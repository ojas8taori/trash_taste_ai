import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/use-mobile";
import Navigation from "@/components/navigation";
import BottomNav from "@/components/bottom-nav";
import WasteCategoryCard from "@/components/waste-category-card";
import ChallengeCard from "@/components/challenge-card";
import Leaderboard from "@/components/leaderboard";
import StatsCard from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Calendar, BarChart3, Users, Plus, Heart, Trash2, TrendingUp, Globe, Award, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const isMobile = useIsMobile();
  const [currentUserId] = useState(1); // Mock user ID

  const { data: wasteCategories = [] } = useQuery({
    queryKey: ["/api/waste-categories"],
  });

  const { data: challenges = [] } = useQuery({
    queryKey: ["/api/challenges"],
  });

  const { data: leaderboard = [] } = useQuery({
    queryKey: ["/api/leaderboard"],
  });

  const { data: currentUser } = useQuery({
    queryKey: ["/api/user", currentUserId],
  });

  const quickActions = [
    {
      title: "AI Scanner",
      description: "Instant disposal advice",
      icon: Camera,
      color: "bg-green-100 text-green-600",
      href: "/scanner"
    },
    {
      title: "Schedule",
      description: "Pickup reminders",
      icon: Calendar,
      color: "bg-blue-100 text-blue-600",
      href: "/schedule"
    },
    {
      title: "Analytics",
      description: "Waste insights",
      icon: BarChart3,
      color: "bg-amber-100 text-amber-600",
      href: "/analytics"
    },
    {
      title: "Community",
      description: "Report & connect",
      icon: Users,
      color: "bg-purple-100 text-purple-600",
      href: "/profile"
    }
  ];

  const monthlyStats = {
    wasteReduced: "45.2 kg",
    carbonSaved: "18.7 kg",
    pointsEarned: currentUser?.ecoPoints || 2450
  };

  const weeklyData = [
    { day: "Monday", weight: 7.5, percentage: 75 },
    { day: "Tuesday", weight: 6.0, percentage: 60 },
    { day: "Wednesday", weight: 8.5, percentage: 85 },
    { day: "Thursday", weight: 5.2, percentage: 52 },
    { day: "Friday", weight: 9.1, percentage: 91 },
    { day: "Saturday", weight: 4.8, percentage: 48 },
    { day: "Sunday", weight: 6.3, percentage: 63 }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation ecoPoints={currentUser?.ecoPoints || 2450} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-eco-green to-eco-emerald text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Smart Waste Management</h1>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Transform your waste habits with AI-powered guidance, smart scheduling, and community rewards
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/scanner">
                <Button className="bg-white text-eco-green px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors">
                  <Camera className="w-5 h-5 mr-2" />
                  Scan Item
                </Button>
              </Link>
              <Link href="/schedule">
                <Button variant="outline" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-eco-green transition-colors">
                  Schedule Pickup
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 -mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href}>
                <Card className="cursor-pointer hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">{action.title}</h3>
                    <p className="text-sm text-slate-600">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Waste Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Waste Categories</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Smart segregation guidance for all types of waste with pickup scheduling
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wasteCategories.length > 0 ? (
              wasteCategories.map((category) => (
                <WasteCategoryCard key={category.id} category={category} />
              ))
            ) : (
              // Default categories if none loaded
              [
                {
                  id: 1,
                  name: "Organic Waste",
                  description: "Kitchen waste, food scraps, biodegradable materials",
                  color: "green",
                  pickupFrequency: "Tomorrow"
                },
                {
                  id: 2,
                  name: "Plastic & Dry",
                  description: "Plastic bottles, containers, dry recyclables",
                  color: "blue",
                  pickupFrequency: "3 days"
                },
                {
                  id: 3,
                  name: "E-Waste",
                  description: "Electronics, batteries, digital devices",
                  color: "purple",
                  pickupFrequency: "On demand"
                },
                {
                  id: 4,
                  name: "Hazardous",
                  description: "Chemicals, medical waste, toxic materials",
                  color: "red",
                  pickupFrequency: "Special pickup"
                }
              ].map((category) => (
                <WasteCategoryCard key={category.id} category={category} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Dashboard Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Your Impact This Month</h2>
            <p className="text-slate-600">Track your environmental contribution and waste reduction progress</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatsCard
              icon={TrendingUp}
              value={monthlyStats.wasteReduced}
              label="Waste Properly Disposed"
              change="+12% from last month"
              color="text-eco-green"
            />
            <StatsCard
              icon={Globe}
              value={monthlyStats.carbonSaved}
              label="CO₂ Equivalent Saved"
              change="Environmental impact"
              color="text-blue-600"
            />
            <StatsCard
              icon={Award}
              value={monthlyStats.pointsEarned.toString()}
              label="Eco Points Earned"
              change="Ready to redeem"
              color="text-amber-600"
            />
          </div>

          {/* Progress Chart */}
          <div className="mt-12 bg-slate-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Weekly Waste Breakdown</h3>
            <div className="space-y-4">
              {weeklyData.map((day) => (
                <div key={day.day} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600 w-20">{day.day}</span>
                  <div className="flex-1 mx-4">
                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-eco-green to-eco-emerald rounded-full" 
                        style={{ width: `${day.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm text-slate-600 w-16">{day.weight} kg</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Eco Challenges & Rewards</h2>
            <p className="text-purple-100 max-w-2xl mx-auto">
              Complete weekly challenges, earn badges, and climb the community leaderboard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.length > 0 ? (
              challenges.slice(0, 3).map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))
            ) : (
              // Default challenges if none loaded
              [
                {
                  id: 1,
                  title: "Plastic-Free Tuesday",
                  description: "Avoid single-use plastics for one full day",
                  points: 50,
                  progress: 67,
                  icon: Sparkles
                },
                {
                  id: 2,
                  title: "Compost Champion",
                  description: "Start a home composting system",
                  points: 100,
                  progress: 0,
                  icon: Heart
                },
                {
                  id: 3,
                  title: "Community Clean-up",
                  description: "Join neighborhood cleanup drive",
                  points: 75,
                  progress: 0,
                  icon: Users
                }
              ].map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))
            )}
          </div>

          {/* Community Leaderboard */}
          <Leaderboard users={leaderboard} currentUserId={currentUserId} />
        </div>
      </section>

      {/* AI Scanner Feature */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">AI-Powered Waste Scanner</h2>
              <p className="text-slate-600 mb-6 text-lg">
                Take a photo of any item and get instant disposal guidance with our advanced AI recognition system.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-eco-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Instant Recognition</h3>
                    <p className="text-slate-600 text-sm">Identifies 1000+ common items and materials</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-eco-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Smart Categorization</h3>
                    <p className="text-slate-600 text-sm">Automatically sorts into correct waste categories</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-eco-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Local Guidelines</h3>
                    <p className="text-slate-600 text-sm">Follows your area's specific disposal regulations</p>
                  </div>
                </div>
              </div>

              <Link href="/scanner">
                <Button className="bg-eco-green text-white px-8 py-3 rounded-full font-semibold hover:bg-eco-dark transition-colors">
                  <Camera className="w-5 h-5 mr-2" />
                  Try AI Scanner
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="bg-slate-100 rounded-2xl p-8 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                  alt="Phone camera scanning interface" 
                  className="w-full h-80 object-cover rounded-xl mb-6"
                />
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-slate-800">Scan Result</h4>
                      <span className="text-sm bg-eco-green text-white px-3 py-1 rounded-full">Plastic Bottle</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                      This item should go in your <strong>Plastic & Dry</strong> waste bin. Remove the cap and label if possible.
                    </p>
                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-eco-green text-white hover:bg-eco-dark">
                        Add to Pickup
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <Link href="/scanner">
        <Button 
          className={`fixed ${isMobile ? 'bottom-20' : 'bottom-6'} right-6 w-14 h-14 bg-eco-green text-white rounded-full shadow-lg hover:bg-eco-dark transition-colors`}
          size="icon"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </Link>

      {isMobile && <BottomNav />}
    </div>
  );
}
