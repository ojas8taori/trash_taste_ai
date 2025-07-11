import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/use-mobile";
import Navigation from "@/components/navigation";
import BottomNav from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, Lightbulb, Recycle, AlertTriangle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Scanner() {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const scanMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      // Simulate AI scanning - in real implementation, this would upload to an AI service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result
      return {
        itemName: "Plastic Water Bottle",
        category: "Plastic & Dry",
        confidence: 0.95,
        disposalAdvice: "This item should go in your Plastic & Dry waste bin. Remove the cap and label if possible. Rinse the bottle before disposal.",
        ecoTips: [
          "Consider using a reusable water bottle to reduce plastic waste",
          "Check if your local area has bottle return programs",
          "This bottle can be recycled into new products"
        ]
      };
    },
    onSuccess: (result) => {
      setScanResult(result);
      setIsScanning(false);
      toast({
        title: "Scan Complete!",
        description: `Identified: ${result.itemName}`,
      });
    },
    onError: () => {
      setIsScanning(false);
      toast({
        title: "Scan Failed",
        description: "Please try again with a clearer image.",
        variant: "destructive",
      });
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsScanning(true);
      const formData = new FormData();
      formData.append('image', file);
      scanMutation.mutate(formData);
    }
  };

  const startCamera = () => {
    // In a real implementation, this would access the device camera
    toast({
      title: "Camera Access",
      description: "Camera functionality would be implemented here using getUserMedia API",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Organic Waste": return "text-green-600 bg-green-100";
      case "Plastic & Dry": return "text-blue-600 bg-blue-100";
      case "E-Waste": return "text-purple-600 bg-purple-100";
      case "Hazardous": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation ecoPoints={2450} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">AI Waste Scanner</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Take a photo or upload an image of any waste item to get instant disposal guidance
          </p>
        </div>

        {!scanResult && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center">Scan Your Waste Item</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={startCamera}
                  className="h-32 bg-eco-green hover:bg-eco-dark text-white flex flex-col items-center justify-center space-y-2"
                  disabled={isScanning}
                >
                  <Camera className="w-8 h-8" />
                  <span>Use Camera</span>
                </Button>
                
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="h-32 border-2 border-dashed border-slate-300 hover:border-eco-green flex flex-col items-center justify-center space-y-2"
                  disabled={isScanning}
                >
                  <Upload className="w-8 h-8" />
                  <span>Upload Image</span>
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              {isScanning && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-eco-green mb-4"></div>
                  <p className="text-slate-600">Analyzing your image...</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {scanResult && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Scan Result</CardTitle>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(scanResult.category)}`}>
                  {scanResult.category}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {scanResult.itemName}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-4">
                  <span>Confidence:</span>
                  <div className="flex-1 bg-slate-200 rounded-full h-2 max-w-32">
                    <div 
                      className="bg-eco-green h-2 rounded-full" 
                      style={{ width: `${scanResult.confidence * 100}%` }}
                    ></div>
                  </div>
                  <span>{Math.round(scanResult.confidence * 100)}%</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Recycle className="w-6 h-6 text-eco-green flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Disposal Instructions</h4>
                    <p className="text-slate-600">{scanResult.disposalAdvice}</p>
                  </div>
                </div>
              </div>

              {scanResult.ecoTips && (
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-6 h-6 text-eco-green flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Eco Tips</h4>
                      <ul className="space-y-1">
                        {scanResult.ecoTips.map((tip: string, index: number) => (
                          <li key={index} className="text-sm text-slate-600 flex items-start">
                            <span className="text-eco-green mr-2">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <Button className="flex-1 bg-eco-green text-white hover:bg-eco-dark">
                  Add to Schedule
                </Button>
                <Button variant="outline" className="flex-1">
                  Save Result
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setScanResult(null)}
                  className="flex-1"
                >
                  Scan Another
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Scanning Tips</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start">
                <span className="text-eco-green mr-2">•</span>
                Ensure good lighting for better recognition accuracy
              </li>
              <li className="flex items-start">
                <span className="text-eco-green mr-2">•</span>
                Center the item in the frame and avoid background clutter
              </li>
              <li className="flex items-start">
                <span className="text-eco-green mr-2">•</span>
                Take photos from different angles for complex items
              </li>
              <li className="flex items-start">
                <span className="text-eco-green mr-2">•</span>
                Clean items provide better scan results
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {isMobile && <BottomNav />}
    </div>
  );
}
