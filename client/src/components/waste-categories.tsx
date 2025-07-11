import { Leaf, Recycle, Zap, Skull } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: "organic",
    name: "Organic",
    description: "Food scraps, garden waste",
    icon: Leaf,
    color: "green",
    bgColor: "bg-green-100",
    textColor: "text-green-600"
  },
  {
    id: "plastic",
    name: "Plastic",
    description: "Bottles, containers, packaging",
    icon: Recycle,
    color: "blue",
    bgColor: "bg-blue-100",
    textColor: "text-blue-600"
  },
  {
    id: "electronic",
    name: "Electronic",
    description: "Phones, batteries, cables",
    icon: Zap,
    color: "purple",
    bgColor: "bg-purple-100",
    textColor: "text-purple-600"
  },
  {
    id: "hazardous",
    name: "Hazardous",
    description: "Chemicals, paint, cleaners",
    icon: Skull,
    color: "red",
    bgColor: "bg-red-100",
    textColor: "text-red-600"
  }
];

export default function WasteCategories() {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Waste Categories</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card 
              key={category.id} 
              className="waste-category-card shadow-md cursor-pointer hover:shadow-lg"
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${category.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-8 h-8 ${category.textColor}`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
