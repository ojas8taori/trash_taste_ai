import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface ChallengeCardProps {
  challenge: {
    id: number;
    title: string;
    description: string;
    points: number;
    progress?: number;
    icon?: any;
  };
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const Icon = challenge.icon || Sparkles;
  const progress = challenge.progress || 0;
  const isCompleted = progress >= 100;

  const getPointsColor = () => {
    if (challenge.points >= 100) return "bg-eco-green";
    if (challenge.points >= 75) return "bg-eco-amber";
    return "bg-blue-500";
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className={`text-sm text-white px-3 py-1 rounded-full font-medium ${getPointsColor()}`}>
            +{challenge.points} points
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-white">{challenge.title}</h3>
        <p className="text-purple-100 text-sm mb-4">{challenge.description}</p>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            {progress > 0 ? (
              <>
                <div className="text-purple-200">Progress</div>
                <div className="font-medium text-white">{Math.round(progress)}% completed</div>
              </>
            ) : (
              <>
                <div className="text-purple-200">Status</div>
                <div className="font-medium text-white">Ready to start</div>
              </>
            )}
          </div>
          {progress > 0 ? (
            <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-eco-amber rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          ) : (
            <Button 
              className="bg-eco-green text-white hover:bg-eco-dark transition-colors" 
              size="sm"
            >
              Start
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
