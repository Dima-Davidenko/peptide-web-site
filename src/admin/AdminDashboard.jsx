import { useState } from "react";
import { getProducts, getOrders, getUsers } from "../data";

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 16, padding: "28px 24px",
      border: "1px solid #e8ecf1",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 13, color: "#718096", fontWeight: 500, marginBottom: 8 }}>
            {label}
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#0a2540", lineHeight: 1 }}>
            {value}
          </div>
          {sub && (
            <div style={{ fontSize: 12, color: "#22c55e", fontWeight: 500, marginTop: 6 }}>
              {sub}
            </div>
          )}
        </div>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: color || "#eef3fb",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22,
        }}>{icon}</div>
      </div>
    </div>
  );
}

const STATUS_COLORS = {
  Delivered: { bg: "#dcfce7", color: "#16a34a" },
  Shipped: { bg: "#dbeafe", color: "#1d4ed8" },
  Processing: { bg: "#fef9c3", color: "#a16207" },
  Cancelled: { bg: "#fee2e2", color: "#dc2626" },
};

export default function AdminDashboard() {
  const [products] = useState(() => getProducts());
  const [orders] = useState(() => getOrders());
  const [users] = useState(() => getUsers());

  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
  const recentOrders = [...orders].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  const recentUsers = [...users].sort((a, b) => b.joined.localeCompare(a.joined)).slice(0, 4);

  return (
    <div style={{ padding: "40px 40px 60px" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontFamily: "'Instrument Serif', serif", fontSize: 36,
          color: "#0a2540", margin: "0 0 6px", fontWeight: 400,
        }}>Dashboard</h1>
        <p style={{ fontSize: 14, color: "#718096", margin: 0 }}>
          Welcome back, Admin. Here's what's happening.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 40 }}>
        <StatCard icon="🧬" label="Total Products" value={products.length} sub="Active listings" color="#eef3fb" />
        <StatCard icon="📦" label="Total Orders" value={orders.length} sub={`${orders.filter(o => o.status === "Processing").length} pending`} color="#f0fdf4" />
        <StatCard icon="👥" label="Registered Users" value={users.length} sub={`${users.filter(u => u.status === "Pending").length} awaiting verification`} color="#fef3c7" />
        <StatCard icon="💰" label="Total Revenue" value={`$${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} sub="All time" color="#fce7f3" />
      </div>

      {/* Recent orders + users */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 24 }}>
        {/* Recent Orders */}
        <div style={{
          background: "#fff", borderRadius: 16, border: "1px solid #e8ecf1",
          overflow: "hidden",
        }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f2f5" }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#0a2540" }}>Recent Orders</h2>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafd" }}>
                {["Order", "Customer", "Product", "Amount", "Status"].map(h => (
                  <th key={h} style={{
                    padding: "10px 16px", textAlign: "left",
                    fontSize: 11, fontWeight: 600, color: "#718096",
                    letterSpacing: "0.05em", textTransform: "uppercase",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => {
                const sc = STATUS_COLORS[order.status] || STATUS_COLORS.Processing;
                return (
                  <tr key={order.id} style={{ borderTop: "1px solid #f0f2f5" }}>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#0a2540", fontWeight: 600 }}>
                      {order.id}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#4a5568" }}>
                      {order.customer}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#4a5568" }}>
                      {order.product}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#0a2540" }}>
                      ${order.amount.toFixed(2)}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        background: sc.bg, color: sc.color,
                        borderRadius: 100, padding: "3px 10px",
                        fontSize: 11, fontWeight: 600,
                      }}>{order.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Recent Users */}
        <div style={{
          background: "#fff", borderRadius: 16, border: "1px solid #e8ecf1",
          overflow: "hidden",
        }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f2f5" }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#0a2540" }}>Recent Registrations</h2>
          </div>
          <div>
            {recentUsers.map(user => {
              const pending = user.status === "Pending";
              return (
                <div key={user.id} style={{
                  padding: "16px 24px", borderTop: "1px solid #f0f2f5",
                  display: "flex", alignItems: "center", gap: 14,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "linear-gradient(135deg, #1a73e8, #0a2540)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 15, fontWeight: 700, flexShrink: 0,
                  }}>{user.name.charAt(0)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#0a2540", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {user.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#718096" }}>{user.specialty}</div>
                  </div>
                  <span style={{
                    background: pending ? "#fef9c3" : "#dcfce7",
                    color: pending ? "#a16207" : "#16a34a",
                    borderRadius: 100, padding: "3px 10px",
                    fontSize: 11, fontWeight: 600, flexShrink: 0,
                  }}>{user.status}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
