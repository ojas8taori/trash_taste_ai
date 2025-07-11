import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WasteCategoryCardProps {
  category: {
    id: number;
    name: string;
    description: string;
    color: string;
    pickupFrequency: string;
  };
}

const categoryImages = {
  "Organic Waste": "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
  "Plastic & Dry": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
  "E-Waste": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
  "Hazardous": "https://images.unsplash.com/photo-1583947581924-860bda6a026d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
};

const colorMap = {
  green: "bg-green-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  red: "bg-red-500"
};

export default function WasteCategoryCard({ category }: WasteCategoryCardProps) {
  const imageUrl = categoryImages[category.name as keyof typeof categoryImages] || categoryImages["Organic Waste"];
  const colorClass = colorMap[category.color as keyof typeof colorMap] || "bg-green-500";

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow">
      <img 
        src={imageUrl} 
        alt={category.name} 
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">{category.name}</h3>
          <div className={`w-3 h-3 ${colorClass} rounded-full`}></div>
        </div>
        <p className="text-sm text-slate-600 mb-4">{category.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Next pickup: {category.pickupFrequency}</span>
          <Button variant="ghost" className="text-eco-green font-medium text-sm hover:text-eco-dark">
            Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
