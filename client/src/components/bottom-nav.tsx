import { Home, Camera, Calendar, BarChart3, User } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Camera, label: "Scanner", href: "/scanner" },
    { icon: Calendar, label: "Schedule", href: "/schedule" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: User, label: "Profile", href: "/profile" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <button className={`flex flex-col items-center py-2 px-3 ${isActive ? 'text-eco-green' : 'text-slate-400'}`}>
                <item.icon className="w-6 h-6 mb-1" />
                <span className="text-xs">{item.label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
