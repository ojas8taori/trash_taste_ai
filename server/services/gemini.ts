import * as fs from "fs";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "" 
});

export interface WasteAnalysis {
  category: string;
  subcategory?: string;
  disposalMethod: string;
  pointsEarned: number;
  confidence: number;
  description?: string;
}

export async function analyzeWasteImage(imagePath: string): Promise<WasteAnalysis> {
  try {
    if (!fs.existsSync(imagePath)) {
      throw new Error("Image file not found");
    }

    const imageBytes = fs.readFileSync(imagePath);
    
    const systemPrompt = `You are an expert waste management and recycling specialist. 
Analyze the uploaded image and identify the waste item(s) shown. 
Provide detailed categorization and disposal guidance.

Categories to use:
- Organic: Food waste, garden waste, biodegradable materials
- Plastic: Bottles, containers, packaging, plastic bags
- Electronic: Phones, batteries, cables, computers, appliances
- Hazardous: Chemicals, paint, batteries, medical waste, toxic materials
- Paper: Newspapers, cardboard, books, office paper
- Glass: Bottles, jars, broken glass
- Metal: Cans, foil, metal objects
- Textile: Clothing, fabric, shoes
- General: Items that don't fit other categories

Disposal methods to suggest:
- "Recycle in designated bins"
- "Compost at home or municipal facility"
- "Take to hazardous waste collection point"
- "Donate or sell if in good condition"
- "Regular trash collection"
- "Take to electronic waste recycling center"
- "Return to manufacturer or retailer"

Points system:
- Organic waste: 5-10 points
- Recyclable materials: 10-15 points
- Electronic waste: 20-30 points
- Hazardous waste proper disposal: 25-40 points
- Textile donation/recycling: 15-25 points

Confidence should be 70-95 for clear images, lower for unclear ones.

Respond with JSON only.`;

    const contents = [
      {
        inlineData: {
          data: imageBytes.toString("base64"),
          mimeType: "image/jpeg",
        },
      },
      `Analyze this waste item and provide categorization and disposal guidance.`
    ];

    console.log('Sending request to Gemini API with image size:', imageBytes.length, 'bytes');

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            category: { type: "string" },
            subcategory: { type: "string" },
            disposalMethod: { type: "string" },
            pointsEarned: { type: "number" },
            confidence: { type: "number" },
            description: { type: "string" }
          },
          required: ["category", "disposalMethod", "pointsEarned", "confidence"]
        }
      },
      contents: contents,
    });

    const rawJson = response.text;
    console.log(`Gemini API Response: ${rawJson}`);

    if (rawJson) {
      const analysis: WasteAnalysis = JSON.parse(rawJson);
      
      // Validate and sanitize the response
      if (!analysis.category || !analysis.disposalMethod) {
        throw new Error("Invalid response from AI - missing required fields");
      }

      // Ensure points are within reasonable range
      analysis.pointsEarned = Math.max(1, Math.min(50, analysis.pointsEarned));
      
      // Ensure confidence is within 0-100 range
      analysis.confidence = Math.max(0, Math.min(100, analysis.confidence));

      return analysis;
    } else {
      throw new Error("Empty response from Gemini API");
    }
  } catch (error) {
    console.error("Error analyzing waste image:", error);
    
    // Provide fallback response for any errors
    return {
      category: "General",
      subcategory: "Unidentified item",
      disposalMethod: "Please consult local waste management guidelines or try scanning again with a clearer image",
      pointsEarned: 5,
      confidence: 30,
      description: "Unable to clearly identify the waste item. Please ensure the image is clear and well-lit."
    };
  }
}

// Additional utility function for batch processing if needed
export async function analyzeMultipleWasteImages(imagePaths: string[]): Promise<WasteAnalysis[]> {
  const results: WasteAnalysis[] = [];
  
  for (const imagePath of imagePaths) {
    try {
      const analysis = await analyzeWasteImage(imagePath);
      results.push(analysis);
    } catch (error) {
      console.error(`Error analyzing image ${imagePath}:`, error);
      // Continue processing other images even if one fails
    }
  }
  
  return results;
}

// Function to get disposal tips for a specific category
export function getDisposalTips(category: string): string[] {
  const tips: { [key: string]: string[] } = {
    organic: [
      "Rinse food containers before composting",
      "Avoid composting meat, dairy, and oily foods",
      "Keep compost moist but not soggy",
      "Turn compost regularly for faster decomposition"
    ],
    plastic: [
      "Remove caps and lids before recycling",
      "Rinse containers to remove food residue",
      "Check recycling numbers - not all plastics are recyclable",
      "Avoid putting plastic bags in regular recycling bins"
    ],
    electronic: [
      "Remove batteries before disposal",
      "Wipe personal data from devices",
      "Check for manufacturer take-back programs",
      "Never put electronics in regular trash"
    ],
    hazardous: [
      "Never pour chemicals down drains",
      "Keep items in original containers",
      "Take to designated collection events",
      "Store safely until disposal"
    ],
    paper: [
      "Remove staples and paper clips",
      "Keep paper dry and clean",
      "Separate different types of paper",
      "Avoid recycling waxed or plastic-coated paper"
    ],
    glass: [
      "Remove caps and lids",
      "Rinse containers clean",
      "Handle broken glass carefully",
      "Separate by color if required locally"
    ]
  };

  return tips[category.toLowerCase()] || [
    "Follow local waste management guidelines",
    "When in doubt, contact your local waste authority",
    "Consider donation or reuse options first"
  ];
}
