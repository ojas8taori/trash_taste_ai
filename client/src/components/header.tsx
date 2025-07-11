import { useQuery } from "@tanstack/react-query";
import { User, Coins, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  username: string;
  email: string;
  ecoPoints: number;
}

export default function Header() {
  const { data: user } = useQuery<User>({
    queryKey: ['/api/user'],
  });

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Leaf className="text-green-600 text-2xl mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">EcoBin AI Scanner</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="eco-points-badge text-white px-4 py-2 rounded-full text-sm font-medium">
              <Coins className="inline w-4 h-4 mr-1" />
              <span>{user?.ecoPoints || 0}</span> Points
            </div>
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
