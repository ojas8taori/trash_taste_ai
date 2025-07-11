import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/use-mobile";
import Navigation from "@/components/navigation";
import BottomNav from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Truck, Plus, Check, X } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Schedule() {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentUserId] = useState(1);

  const { data: pickups = [] } = useQuery({
    queryKey: ["/api/pickups", currentUserId],
  });

  const { data: wasteCategories = [] } = useQuery({
    queryKey: ["/api/waste-categories"],
  });

  const updatePickupMutation = useMutation({
    mutationFn: async ({ id, status, weight }: { id: number; status: string; weight?: string }) => {
      return apiRequest("PATCH", `/api/pickups/${id}`, { status, weight });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pickups", currentUserId] });
      toast({
        title: "Pickup Updated",
        description: "Pickup status has been updated successfully.",
      });
    },
  });

  const schedulePickupMutation = useMutation({
    mutationFn: async (pickupData: any) => {
      return apiRequest("POST", "/api/pickups", pickupData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pickups", currentUserId] });
      toast({
        title: "Pickup Scheduled",
        description: "Your waste pickup has been scheduled successfully.",
      });
    },
  });

  // Mock data for demonstration
  const mockPickups = [
    {
      id: 1,
      category: { name: "Organic Waste", color: "green" },
      scheduledDate: new Date("2024-01-15T10:00:00"),
      status: "scheduled",
      weight: null
    },
    {
      id: 2,
      category: { name: "Plastic & Dry", color: "blue" },
      scheduledDate: new Date("2024-01-16T14:00:00"),
      status: "in_progress",
      weight: null
    },
    {
      id: 3,
      category: { name: "E-Waste", color: "purple" },
      scheduledDate: new Date("2024-01-12T09:00:00"),
      status: "completed",
      weight: "5.2"
    }
  ];

  const displayPickups = pickups.length > 0 ? pickups : mockPickups;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "text-blue-600 bg-blue-100";
      case "in_progress": return "text-amber-600 bg-amber-100";
      case "completed": return "text-green-600 bg-green-100";
      case "cancelled": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled": return Clock;
      case "in_progress": return Truck;
      case "completed": return Check;
      case "cancelled": return X;
      default: return Clock;
    }
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation ecoPoints={2450} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Pickup Schedule</h1>
            <p className="text-slate-600">Manage your waste collection appointments</p>
          </div>
          <Button className="bg-eco-green hover:bg-eco-dark text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Pickup
          </Button>
        </div>

        {/* Upcoming Pickups */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upcoming Pickups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {displayPickups
                .filter(pickup => pickup.status === "scheduled" || pickup.status === "in_progress")
                .map((pickup) => {
                  const StatusIcon = getStatusIcon(pickup.status);
                  return (
                    <div key={pickup.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${pickup.category.color === 'green' ? 'bg-green-100' : pickup.category.color === 'blue' ? 'bg-blue-100' : pickup.category.color === 'purple' ? 'bg-purple-100' : 'bg-red-100'}`}>
                          <StatusIcon className={`w-6 h-6 ${pickup.category.color === 'green' ? 'text-green-600' : pickup.category.color === 'blue' ? 'text-blue-600' : pickup.category.color === 'purple' ? 'text-purple-600' : 'text-red-600'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">{pickup.category.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-slate-600">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(pickup.scheduledDate)}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {formatTime(pickup.scheduledDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(pickup.status)}`}>
                          {pickup.status.replace("_", " ")}
                        </span>
                        {pickup.status === "scheduled" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updatePickupMutation.mutate({ id: pickup.id, status: "cancelled" })}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Pickups */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Pickups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {displayPickups
                .filter(pickup => pickup.status === "completed" || pickup.status === "cancelled")
                .map((pickup) => {
                  const StatusIcon = getStatusIcon(pickup.status);
                  return (
                    <div key={pickup.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${pickup.status === 'completed' ? 'bg-green-100' : 'bg-red-100'}`}>
                          <StatusIcon className={`w-6 h-6 ${pickup.status === 'completed' ? 'text-green-600' : 'text-red-600'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">{pickup.category.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-slate-600">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(pickup.scheduledDate)}
                            </span>
                            {pickup.weight && (
                              <span className="font-medium text-eco-green">
                                {pickup.weight} kg collected
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(pickup.status)}`}>
                        {pickup.status}
                      </span>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Organic Waste", color: "green", frequency: "Tomorrow" },
            { name: "Plastic & Dry", color: "blue", frequency: "3 days" },
            { name: "E-Waste", color: "purple", frequency: "On demand" },
            { name: "Hazardous", color: "red", frequency: "Special pickup" }
          ].map((category) => (
            <Card key={category.name} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${category.color === 'green' ? 'bg-green-100' : category.color === 'blue' ? 'bg-blue-100' : category.color === 'purple' ? 'bg-purple-100' : 'bg-red-100'}`}>
                  <Plus className={`w-6 h-6 ${category.color === 'green' ? 'text-green-600' : category.color === 'blue' ? 'text-blue-600' : category.color === 'purple' ? 'text-purple-600' : 'text-red-600'}`} />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">{category.name}</h3>
                <p className="text-sm text-slate-600 mb-3">Next: {category.frequency}</p>
                <Button 
                  size="sm" 
                  className="w-full bg-eco-green hover:bg-eco-dark text-white"
                  onClick={() => {
                    // Mock scheduling
                    toast({
                      title: "Pickup Scheduled",
                      description: `${category.name} pickup scheduled successfully.`,
                    });
                  }}
                >
                  Schedule
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {isMobile && <BottomNav />}
    </div>
  );
}
