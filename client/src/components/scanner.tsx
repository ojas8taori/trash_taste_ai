import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Camera, Upload, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface ScanResult {
  category: string;
  subcategory?: string;
  disposalMethod: string;
  pointsEarned: number;
  confidence: number;
}

export default function Scanner() {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const scanMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      
      // Use fetch directly for file uploads instead of apiRequest
      const response = await fetch('/api/scan', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setScanResult(data.analysis);
      queryClient.invalidateQueries({ queryKey: ['/api/user'] });
      queryClient.invalidateQueries({ queryKey: ['/api/scans'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      toast({
        title: "Scan Complete!",
        description: `Earned ${data.analysis.pointsEarned} eco-points`,
      });
    },
    onError: (error) => {
      console.error('Upload error:', error);
      toast({
        title: "Scan Failed",
        description: error.message || "Please try again with a clearer image",
        variant: "destructive",
      });
    }
  });

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      scanMutation.mutate(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Identify Your Waste with AI</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Take a photo of any waste item and get instant disposal guidance powered by AI
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div 
              className={`scanner-area rounded-xl p-8 text-center mb-6 ${isDragging ? 'active' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {scanMutation.isPending ? (
                <div>
                  <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin text-green-600" />
                  <p className="text-gray-600">Analyzing your waste...</p>
                </div>
              ) : scanResult ? (
                <div>
                  <div className="bg-green-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-green-800 mb-2">Scan Result</h4>
                    <p className="text-gray-700 font-medium">{scanResult.category}</p>
                    {scanResult.subcategory && (
                      <p className="text-sm text-gray-600">{scanResult.subcategory}</p>
                    )}
                    <p className="text-sm text-green-700 mt-2">{scanResult.disposalMethod}</p>
                    <p className="text-sm text-green-600 mt-1">+{scanResult.pointsEarned} eco-points</p>
                  </div>
                  <Button onClick={resetScanner} variant="outline" className="text-green-600 hover:text-green-700">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Scan Another Item
                  </Button>
                </div>
              ) : (
                <div>
                  <Camera className="w-16 h-16 mx-auto mb-4 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Scan Your Waste</h3>
                  <p className="text-gray-600 mb-6">Click to take a photo or drag and drop an image</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                    className="hidden"
                  />
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="scan-button text-white font-medium"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Image
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Disposal Guide</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-xs">♻</span>
                </div>
                <div>
                  <h4 className="font-medium text-green-800">Recyclable</h4>
                  <p className="text-sm text-green-700">Clean and place in recycling bin</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
                <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-xs">⚠</span>
                </div>
                <div>
                  <h4 className="font-medium text-yellow-800">Hazardous</h4>
                  <p className="text-sm text-yellow-700">Take to special collection point</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-xs">🌱</span>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">Organic</h4>
                  <p className="text-sm text-blue-700">Perfect for composting</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-xs">🗑</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">General Waste</h4>
                  <p className="text-sm text-gray-700">Regular trash collection</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
