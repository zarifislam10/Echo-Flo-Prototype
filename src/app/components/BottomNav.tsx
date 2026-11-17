import { useNavigate, useLocation } from "react-router";
import { Home, BarChart3, Heart, Eye, Settings } from "lucide-react";

const navItems = [
  { icon: Home, path: "/", label: "Home" },
  { icon: BarChart3, path: "/graph", label: "Graph" },
  { icon: Eye, path: "/vision", label: "Vision" },
  { icon: Heart, path: "/health", label: "Health" },
  { icon: Settings, path: "/settings", label: "Settings" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="shrink-0 flex justify-center px-4 pb-4 pt-2"
      style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
    >
      <div
        className="flex items-center gap-1 rounded-full px-3 py-2"
        style={{
          background: "rgba(255,255,255,0.45)",
          border: "1px solid rgba(255,255,255,0.6)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.5), 0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        {navItems.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center justify-center rounded-full p-2.5 transition-all duration-300 ${
                isActive
                  ? "shadow-inner"
                  : "opacity-50 hover:opacity-100"
              }`}
              style={
                isActive
                  ? {
                      background: "rgba(60,80,120,0.15)",
                      border: "1px solid rgba(60,80,120,0.2)",
                    }
                  : undefined
              }
              aria-label={item.label}
            >
              <item.icon
                size={20}
                className={isActive ? "text-slate-800" : "text-slate-600"}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
