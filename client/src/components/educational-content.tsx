import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const educationalContent = [
  {
    id: 1,
    title: "Recycling 101",
    description: "Learn the basics of proper recycling and how to maximize your environmental impact.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    content: {
      introduction: "Recycling is one of the most effective ways to reduce waste and protect our environment. By recycling materials, we can conserve natural resources, reduce energy consumption, and minimize pollution.",
      sections: [
        {
          title: "What Can Be Recycled?",
          content: [
            "Paper and cardboard: newspapers, magazines, office paper, cardboard boxes",
            "Plastic bottles and containers: check for recycling symbols #1-7",
            "Glass bottles and jars: clear, brown, and green glass",
            "Metal cans: aluminum beverage cans, steel food cans",
            "Electronics: computers, phones, batteries (special collection)"
          ]
        },
        {
          title: "Recycling Best Practices",
          content: [
            "Clean containers before recycling - remove food residue",
            "Remove caps and lids from bottles",
            "Don't bag recyclables unless specifically required",
            "Check local recycling guidelines - rules vary by location",
            "Never wish-cycle - only recycle items you know are accepted"
          ]
        },
        {
          title: "Environmental Impact",
          content: [
            "Recycling one ton of paper saves 17 trees",
            "Recycling aluminum cans uses 95% less energy than making new ones",
            "Recycling reduces greenhouse gas emissions",
            "Keeps valuable materials out of landfills",
            "Creates jobs in the recycling and manufacturing industries"
          ]
        }
      ]
    }
  },
  {
    id: 2,
    title: "Composting Guide",
    description: "Turn your organic waste into nutrient-rich compost for your garden.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    content: {
      introduction: "Composting is a natural process that turns organic waste into nutrient-rich soil amendment. It's an excellent way to reduce household waste while creating valuable fertilizer for your garden.",
      sections: [
        {
          title: "What to Compost (Greens)",
          content: [
            "Fruit and vegetable scraps",
            "Coffee grounds and tea bags",
            "Fresh grass clippings",
            "Fresh plant trimmings",
            "Eggshells (crushed)"
          ]
        },
        {
          title: "What to Compost (Browns)",
          content: [
            "Dried leaves and grass",
            "Shredded paper and cardboard",
            "Wood chips and sawdust",
            "Straw and hay",
            "Dryer lint (from natural fabrics)"
          ]
        },
        {
          title: "What NOT to Compost",
          content: [
            "Meat, fish, and dairy products",
            "Oily or greasy foods",
            "Pet waste",
            "Diseased plants",
            "Weeds with seeds"
          ]
        },
        {
          title: "Composting Process",
          content: [
            "Maintain a 3:1 ratio of browns to greens",
            "Keep compost moist but not soggy",
            "Turn pile every 2-3 weeks for aeration",
            "Compost is ready in 3-6 months",
            "Finished compost should be dark and crumbly"
          ]
        }
      ]
    }
  },
  {
    id: 3,
    title: "E-Waste Safety",
    description: "Proper disposal of electronics to protect the environment and recover valuable materials.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    content: {
      introduction: "Electronic waste (e-waste) contains valuable materials but also hazardous substances. Proper disposal is crucial for environmental protection and resource recovery.",
      sections: [
        {
          title: "Common E-Waste Items",
          content: [
            "Smartphones and tablets",
            "Computers and laptops",
            "Televisions and monitors",
            "Printers and scanners",
            "Batteries and chargers",
            "Small appliances"
          ]
        },
        {
          title: "Why E-Waste Matters",
          content: [
            "Contains toxic materials like lead, mercury, and cadmium",
            "Can contaminate soil and water if improperly disposed",
            "Contains valuable metals like gold, silver, and platinum",
            "Growing fastest waste stream globally",
            "Only 20% of e-waste is formally recycled"
          ]
        },
        {
          title: "Safe Disposal Methods",
          content: [
            "Use manufacturer take-back programs",
            "Visit certified e-waste recycling centers",
            "Participate in community collection events",
            "Donate working electronics to charities",
            "Trade in old devices when buying new ones"
          ]
        },
        {
          title: "Before Disposal",
          content: [
            "Back up and delete all personal data",
            "Remove batteries if possible",
            "Check for trade-in or buyback programs",
            "Remove any accessories or cables",
            "Keep original packaging if available"
          ]
        }
      ]
    }
  }
];

export default function EducationalContent() {
  const openContentInNewTab = (content: typeof educationalContent[0]) => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${content.title} - EcoBin Educational Content</title>
          <meta name="description" content="${content.description}">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              background: #f9fafb;
            }
            .header {
              background: white;
              border-radius: 12px;
              padding: 30px;
              margin-bottom: 30px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              text-align: center;
            }
            .header img {
              width: 100%;
              height: 300px;
              object-fit: cover;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            .header h1 {
              color: #059669;
              font-size: 2.5rem;
              margin: 0 0 15px 0;
              font-weight: 700;
            }
            .header p {
              color: #6b7280;
              font-size: 1.1rem;
              margin: 0;
            }
            .content {
              background: white;
              border-radius: 12px;
              padding: 30px;
              margin-bottom: 30px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .intro {
              font-size: 1.1rem;
              color: #4b5563;
              margin-bottom: 30px;
              padding: 20px;
              background: #ecfdf5;
              border-radius: 8px;
              border-left: 4px solid #059669;
            }
            .section {
              margin-bottom: 30px;
            }
            .section h2 {
              color: #059669;
              font-size: 1.5rem;
              margin-bottom: 15px;
              font-weight: 600;
            }
            .section ul {
              list-style: none;
              padding: 0;
            }
            .section li {
              padding: 8px 0;
              border-bottom: 1px solid #e5e7eb;
              position: relative;
              padding-left: 25px;
            }
            .section li:before {
              content: "✓";
              color: #059669;
              font-weight: bold;
              position: absolute;
              left: 0;
            }
            .section li:last-child {
              border-bottom: none;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #6b7280;
              background: white;
              border-radius: 12px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .footer a {
              color: #059669;
              text-decoration: none;
              font-weight: 600;
            }
            .footer a:hover {
              text-decoration: underline;
            }
            @media (max-width: 768px) {
              body {
                padding: 10px;
              }
              .header h1 {
                font-size: 2rem;
              }
              .header, .content, .footer {
                padding: 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="${content.image}" alt="${content.title}">
            <h1>${content.title}</h1>
            <p>${content.description}</p>
          </div>
          
          <div class="content">
            <div class="intro">
              ${content.content.introduction}
            </div>
            
            ${content.content.sections.map(section => `
              <div class="section">
                <h2>${section.title}</h2>
                <ul>
                  ${section.content.map(item => `<li>${item}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
          
          <div class="footer">
            <p>Part of the <a href="javascript:window.close()">EcoBin Smart Waste Management</a> educational series</p>
            <p><small>© 2024 EcoBin. Promoting sustainable waste management through education.</small></p>
          </div>
        </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Learn More</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {educationalContent.map((content) => (
          <Card key={content.id} className="shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={content.image} 
              alt={content.title}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{content.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{content.description}</p>
              <Button 
                variant="ghost" 
                className="text-green-600 hover:text-green-700 p-0"
                onClick={() => openContentInNewTab(content)}
              >
                Read More <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
