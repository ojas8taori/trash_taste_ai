import { Card, CardContent } from "@/components/ui/card";

interface LeaderboardProps {
  users: Array<{
    id: number;
    username: string;
    ecoPoints: number;
    level?: number;
  }>;
  currentUserId?: number;
}

export default function Leaderboard({ users, currentUserId }: LeaderboardProps) {
  // Default leaderboard data if no users provided
  const defaultUsers = [
    { id: 1, username: "EcoWarrior92", ecoPoints: 8750, level: 8 },
    { id: 2, username: "GreenGuru", ecoPoints: 7340, level: 7 },
    { id: 3, username: "RecyclingPro", ecoPoints: 6420, level: 6 },
    { id: 4, username: "WasteReducer", ecoPoints: 5890, level: 5 },
    { id: 5, username: "You", ecoPoints: 2450, level: 4 }
  ];

  const displayUsers = users.length > 0 ? users : defaultUsers;

  const getRankColor = (index: number) => {
    if (index === 0) return "bg-yellow-500"; // Gold
    if (index === 1) return "bg-gray-400"; // Silver
    if (index === 2) return "bg-amber-600"; // Bronze
    return "bg-slate-500";
  };

  const getLevelTitle = (level: number) => {
    if (level >= 8) return "Green Champion";
    if (level >= 6) return "Recycling Pro";
    if (level >= 4) return "Waste Reducer";
    return "Eco Beginner";
  };

  return (
    <Card className="mt-12 bg-white/10 backdrop-blur-sm border border-white/20">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-6 text-center text-white">Community Leaderboard</h3>
        <div className="space-y-4">
          {displayUsers.slice(0, 5).map((user, index) => {
            const isCurrentUser = user.id === currentUserId || user.username === "You";
            return (
              <div 
                key={user.id} 
                className={`flex items-center justify-between p-4 rounded-lg ${
                  isCurrentUser ? 'bg-eco-green/20 border border-eco-green/30' : 'bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 ${getRankColor(index)} rounded-full flex items-center justify-center font-bold text-sm`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className={`font-semibold ${isCurrentUser ? 'text-eco-green' : 'text-white'}`}>
                      {user.username}
                    </div>
                    <div className={`text-sm ${isCurrentUser ? 'text-green-200' : 'text-purple-200'}`}>
                      Level {user.level || 4} • {getLevelTitle(user.level || 4)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${isCurrentUser ? 'text-eco-green' : 'text-white'}`}>
                    {user.ecoPoints.toLocaleString()} pts
                  </div>
                  <div className={`text-sm ${isCurrentUser ? 'text-green-200' : 'text-purple-200'}`}>
                    This month
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
