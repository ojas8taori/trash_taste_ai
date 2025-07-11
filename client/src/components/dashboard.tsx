import { useQuery } from "@tanstack/react-query";
import { History, TrendingUp, Trophy, Leaf, Recycle, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ['/api/stats'],
  });

  const { data: recentScans } = useQuery({
    queryKey: ['/api/scans'],
    queryFn: async () => {
      const response = await fetch('/api/scans?limit=5');
      return response.json();
    }
  });

  const { data: achievements } = useQuery({
    queryKey: ['/api/achievements'],
  });

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'organic': return <Leaf className="w-4 h-4" />;
      case 'plastic': return <Recycle className="w-4 h-4" />;
      case 'electronic': return <Zap className="w-4 h-4" />;
      default: return <Recycle className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'organic': return 'bg-green-100 text-green-600';
      case 'plastic': return 'bg-blue-100 text-blue-600';
      case 'electronic': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Impact Dashboard</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Scans</h3>
              <History className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-3">
              {recentScans?.length > 0 ? (
                recentScans.map((scan: any) => (
                  <div key={scan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getCategoryColor(scan.category)}`}>
                        {getCategoryIcon(scan.category)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{scan.category}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(scan.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-green-600 font-medium">+{scan.pointsEarned || 0} pts</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <p>No scans yet. Start scanning to see your history!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Weekly Progress</h3>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Scans Completed</span>
                <span className="font-semibold">{stats?.scansThisWeek || 0}/50</span>
              </div>
              <Progress value={((stats?.scansThisWeek || 0) / 50) * 100} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Points Earned</span>
                <span className="font-semibold">{stats?.pointsThisWeek || 0}/500</span>
              </div>
              <Progress value={((stats?.pointsThisWeek || 0) / 500) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
              <Trophy className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-3">
              {achievements?.length > 0 ? (
                achievements.slice(0, 3).map((achievement: any) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="text-yellow-600 text-lg">{achievement.icon}</div>
                    <div>
                      <div className="font-medium text-sm">{achievement.title}</div>
                      <div className="text-xs text-gray-500">{achievement.description}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <p>Keep scanning to unlock achievements!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
