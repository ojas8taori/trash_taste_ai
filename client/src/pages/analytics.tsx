import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/use-mobile";
import Navigation from "@/components/navigation";
import BottomNav from "@/components/bottom-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Globe, Award, Recycle, BarChart3, Calendar } from "lucide-react";
import StatsCard from "@/components/stats-card";

export default function Analytics() {
  const isMobile = useIsMobile();
  const [currentUserId] = useState(1);
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const { data: userStats } = useQuery({
    queryKey: ["/api/user-stats", currentUserId, currentMonth, currentYear],
  });

  // Mock data for comprehensive analytics
  const monthlyStats = {
    wasteReduced: userStats?.wasteReduced || "45.2",
    carbonSaved: userStats?.carbonSaved || "18.7",
    pointsEarned: userStats?.pointsEarned || 2450
  };

  const weeklyData = [
    { day: "Mon", organic: 3.2, plastic: 2.1, ewaste: 0.5, hazardous: 0.1 },
    { day: "Tue", organic: 2.8, plastic: 1.8, ewaste: 0.0, hazardous: 0.0 },
    { day: "Wed", organic: 4.1, plastic: 2.5, ewaste: 0.0, hazardous: 0.0 },
    { day: "Thu", organic: 2.5, plastic: 1.9, ewaste: 0.8, hazardous: 0.0 },
    { day: "Fri", organic: 3.8, plastic: 2.7, ewaste: 0.0, hazardous: 0.2 },
    { day: "Sat", organic: 2.1, plastic: 1.5, ewaste: 0.0, hazardous: 0.0 },
    { day: "Sun", organic: 2.9, plastic: 2.0, ewaste: 0.0, hazardous: 0.0 }
  ];

  const categoryBreakdown = [
    { name: "Organic Waste", percentage: 65, color: "bg-green-500", weight: "29.4 kg" },
    { name: "Plastic & Dry", percentage: 25, color: "bg-blue-500", weight: "11.3 kg" },
    { name: "E-Waste", percentage: 8, color: "bg-purple-500", weight: "3.6 kg" },
    { name: "Hazardous", percentage: 2, color: "bg-red-500", weight: "0.9 kg" }
  ];

  const monthlyTrends = [
    { month: "Jul", waste: 38.2, carbon: 15.1, points: 1890 },
    { month: "Aug", waste: 41.5, carbon: 16.4, points: 2150 },
    { month: "Sep", waste: 39.8, carbon: 15.8, points: 2020 },
    { month: "Oct", waste: 43.1, carbon: 17.2, points: 2280 },
    { month: "Nov", waste: 45.2, carbon: 18.7, points: 2450 }
  ];

  const achievements = [
    { title: "Green Warrior", description: "Reduced waste by 40% this month", icon: "🏆", earned: true },
    { title: "Recycling Pro", description: "Properly sorted 100+ items", icon: "♻️", earned: true },
    { title: "Carbon Saver", description: "Saved 15kg CO₂ equivalent", icon: "🌱", earned: true },
    { title: "Community Leader", description: "Top 10 in neighborhood", icon: "👑", earned: false }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation ecoPoints={2450} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Waste Analytics</h1>
          <p className="text-slate-600">Track your environmental impact and waste management progress</p>
        </div>

        {/* Monthly Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            icon={TrendingUp}
            value={`${monthlyStats.wasteReduced} kg`}
            label="Waste Properly Disposed"
            change="+12% from last month"
            color="text-eco-green"
          />
          <StatsCard
            icon={Globe}
            value={`${monthlyStats.carbonSaved} kg`}
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

        {/* Weekly Breakdown Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Weekly Waste Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.map((day) => {
                const total = day.organic + day.plastic + day.ewaste + day.hazardous;
                return (
                  <div key={day.day} className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-slate-600 w-12">{day.day}</span>
                    <div className="flex-1 relative">
                      <div className="h-8 bg-slate-200 rounded-lg overflow-hidden flex">
                        <div 
                          className="bg-green-500" 
                          style={{ width: `${(day.organic / total) * 100}%` }}
                          title={`Organic: ${day.organic}kg`}
                        ></div>
                        <div 
                          className="bg-blue-500" 
                          style={{ width: `${(day.plastic / total) * 100}%` }}
                          title={`Plastic: ${day.plastic}kg`}
                        ></div>
                        <div 
                          className="bg-purple-500" 
                          style={{ width: `${(day.ewaste / total) * 100}%` }}
                          title={`E-Waste: ${day.ewaste}kg`}
                        ></div>
                        <div 
                          className="bg-red-500" 
                          style={{ width: `${(day.hazardous / total) * 100}%` }}
                          title={`Hazardous: ${day.hazardous}kg`}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm text-slate-600 w-16">{total.toFixed(1)} kg</span>
                  </div>
                );
              })}
            </div>
            
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Organic</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Plastic & Dry</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span>E-Waste</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Hazardous</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Recycle className="w-5 h-5" />
                <span>Waste Category Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryBreakdown.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-800">{category.name}</span>
                      <span className="text-sm text-slate-600">{category.weight}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-full ${category.color} rounded-full`}
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-slate-600 w-12">{category.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>5-Month Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyTrends.map((month, index) => (
                  <div key={month.month} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="font-medium text-slate-800">{month.month}</span>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-slate-600">{month.waste}kg</span>
                      <span className="text-blue-600">{month.carbon}kg CO₂</span>
                      <span className="text-eco-green font-medium">{month.points} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Environmental Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.title}
                  className={`p-4 rounded-lg border-2 ${achievement.earned ? 'border-eco-green bg-green-50' : 'border-slate-200 bg-slate-50'}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${achievement.earned ? 'text-eco-green' : 'text-slate-600'}`}>
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-slate-600">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <div className="w-6 h-6 bg-eco-green rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {isMobile && <BottomNav />}
    </div>
  );
}
