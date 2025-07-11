import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Leaf className="text-green-500 text-xl mr-2" />
              <span className="text-xl font-bold">EcoBin</span>
            </div>
            <p className="text-gray-400 text-sm">
              Making waste management smarter and more sustainable with AI-powered solutions.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-green-400">AI Scanner</a></li>
              <li><a href="#" className="hover:text-green-400">Waste Categories</a></li>
              <li><a href="#" className="hover:text-green-400">Eco Points</a></li>
              <li><a href="#" className="hover:text-green-400">Analytics</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-green-400">Recycling Guide</a></li>
              <li><a href="#" className="hover:text-green-400">Composting Tips</a></li>
              <li><a href="#" className="hover:text-green-400">E-Waste Safety</a></li>
              <li><a href="#" className="hover:text-green-400">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-green-400">Twitter</a>
              <a href="#" className="hover:text-green-400">Facebook</a>
              <a href="#" className="hover:text-green-400">Instagram</a>
              <a href="#" className="hover:text-green-400">LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 EcoBin. All rights reserved. Powered by AI for a sustainable future.</p>
        </div>
      </div>
    </footer>
  );
}
