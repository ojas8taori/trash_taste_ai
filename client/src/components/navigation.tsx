import { Heart } from "lucide-react";

interface NavigationProps {
  ecoPoints: number;
}

export default function Navigation({ ecoPoints }: NavigationProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-eco-green rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">EcoBin</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-eco-green/10 px-3 py-2 rounded-full">
              <svg className="w-5 h-5 text-eco-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
              <span className="text-eco-dark font-semibold">{ecoPoints.toLocaleString()} points</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
