import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { isAdminAuth, setAdminAuth } from "../data";
import AdminDashboard from "./AdminDashboard";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import AdminUsers from "./AdminUsers";
import AdminAnalytics from "./AdminAnalytics";

const NAV_ITEMS = [
  { path: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { path: "/admin/products", label: "Products", icon: "🧬" },
  { path: "/admin/orders", label: "Orders", icon: "📦" },
  { path: "/admin/users", label: "Users", icon: "👥" },
  { path: "/admin/analytics", label: "Analytics", icon: "📈" },
];

function AdminSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    setAdminAuth(false);
    navigate("/admin/login", { replace: true });
  };

  return (
    <aside style={{
      width: 240, minHeight: "100vh", background: "#0a2540",
      display: "flex", flexDirection: "column",
      position: "fixed", top: 0, left: 0, bottom: 0,
      zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{
        padding: "28px 24px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "rgba(255,255,255,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 18, fontWeight: 700,
          }}>P</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: "'DM Sans', sans-serif" }}>
              PeptidePro
            </div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 500 }}>
              Admin Panel
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {NAV_ITEMS.map(item => {
          const active = pathname === item.path || pathname.startsWith(item.path + "/");
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12,
                padding: "11px 14px", borderRadius: 10, border: "none",
                cursor: "pointer", marginBottom: 4,
                background: active ? "rgba(26,115,232,0.18)" : "transparent",
                color: active ? "#fff" : "rgba(255,255,255,0.6)",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                fontWeight: active ? 600 : 400,
                textAlign: "left",
                borderLeft: active ? "3px solid #1a73e8" : "3px solid transparent",
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{
        padding: "16px 12px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}>
        <button
          onClick={() => window.open("/", "_blank")}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: 12,
            padding: "10px 14px", borderRadius: 10, border: "none",
            cursor: "pointer", marginBottom: 6,
            background: "transparent",
            color: "rgba(255,255,255,0.5)",
            fontFamily: "'DM Sans', sans-serif", fontSize: 13,
            textAlign: "left",
          }}
        >
          <span>🌐</span> View Website
        </button>
        <button
          onClick={handleLogout}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: 12,
            padding: "10px 14px", borderRadius: 10, border: "none",
            cursor: "pointer",
            background: "rgba(239,68,68,0.1)",
            color: "#fca5a5",
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
            textAlign: "left",
          }}
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  );
}

export default function AdminApp() {
  if (!isAdminAuth()) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", background: "#f8fafd" }}>
      <AdminSidebar />
      <main style={{ marginLeft: 240, flex: 1, minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}
