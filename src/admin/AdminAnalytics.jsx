import { useState } from "react";
import { getOrders, getProducts, getUsers } from "../data";

function BarChart({ data, maxValue, color }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {data.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 12, color: "#718096", width: 80, textAlign: "right", flexShrink: 0 }}>
            {item.label}
          </div>
          <div style={{ flex: 1, background: "#f0f2f5", borderRadius: 100, height: 10, overflow: "hidden" }}>
            <div style={{
              width: `${Math.round((item.value / maxValue) * 100)}%`,
              height: "100%",
              background: color || "linear-gradient(90deg, #0a2540, #1a73e8)",
              borderRadius: 100,
              transition: "width 0.6s ease",
            }} />
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0a2540", width: 60, flexShrink: 0 }}>
            {item.displayValue}
          </div>
        </div>
      ))}
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 16, padding: "24px",
      border: "1px solid #e8ecf1",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, color: "#718096", fontWeight: 500, marginBottom: 6 }}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#0a2540" }}>{value}</div>
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: color || "#eef3fb",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20,
        }}>{icon}</div>
      </div>
    </div>
  );
}

export default function AdminAnalytics() {
  const [orders] = useState(() => getOrders());
  const [products] = useState(() => getProducts());
  const [users] = useState(() => getUsers());

  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);

  // Revenue by month (from order dates)
  const revenueByMonth = {};
  orders.forEach(o => {
    const month = o.date.slice(0, 7); // "2026-03"
    revenueByMonth[month] = (revenueByMonth[month] || 0) + o.amount;
  });
  const monthLabels = { "2026-01": "Jan", "2026-02": "Feb", "2026-03": "Mar" };
  const monthlyData = Object.entries(revenueByMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, val]) => ({
      label: monthLabels[key] || key,
      value: val,
      displayValue: `$${val.toFixed(0)}`,
    }));
  const maxMonthlyRevenue = Math.max(...monthlyData.map(d => d.value), 1);

  // Orders by status
  const statusCounts = {};
  orders.forEach(o => { statusCounts[o.status] = (statusCounts[o.status] || 0) + 1; });
  const statusData = Object.entries(statusCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([label, value]) => ({ label, value, displayValue: `${value}` }));
  const maxStatusCount = Math.max(...statusData.map(d => d.value), 1);

  // Products by category
  const categoryCounts = {};
  products.forEach(p => { categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1; });
  const categoryData = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([label, value]) => ({ label, value, displayValue: `${value}` }));
  const maxCategoryCount = Math.max(...categoryData.map(d => d.value), 1);

  // Top products by order count
  const productOrderCounts = {};
  orders.forEach(o => { productOrderCounts[o.product] = (productOrderCounts[o.product] || 0) + 1; });
  const topProducts = Object.entries(productOrderCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([label, value]) => ({ label, value, displayValue: `${value} orders` }));
  const maxProductOrders = Math.max(...topProducts.map(d => d.value), 1);

  return (
    <div style={{ padding: "40px 40px 60px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontFamily: "'Instrument Serif', serif", fontSize: 36,
          color: "#0a2540", margin: "0 0 6px", fontWeight: 400,
        }}>Analytics</h1>
        <p style={{ fontSize: 14, color: "#718096", margin: 0 }}>
          Overview of store performance and activity.
        </p>
      </div>

      {/* Summary stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 36 }}>
        <StatCard icon="💰" label="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} color="#fce7f3" />
        <StatCard icon="📦" label="Total Orders" value={orders.length} color="#f0fdf4" />
        <StatCard icon="🧬" label="Products" value={products.length} color="#eef3fb" />
        <StatCard icon="👥" label="Physicians" value={users.length} color="#fef3c7" />
      </div>

      {/* Charts grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Monthly Revenue */}
        <div style={{
          background: "#fff", borderRadius: 16, border: "1px solid #e8ecf1", padding: 28,
        }}>
          <h3 style={{ margin: "0 0 24px", fontSize: 16, fontWeight: 700, color: "#0a2540" }}>
            Revenue by Month
          </h3>
          {monthlyData.length > 0 ? (
            <BarChart data={monthlyData} maxValue={maxMonthlyRevenue} color="linear-gradient(90deg, #0a2540, #1a73e8)" />
          ) : (
            <p style={{ color: "#718096", fontSize: 14 }}>No data available.</p>
          )}
        </div>

        {/* Orders by Status */}
        <div style={{
          background: "#fff", borderRadius: 16, border: "1px solid #e8ecf1", padding: 28,
        }}>
          <h3 style={{ margin: "0 0 24px", fontSize: 16, fontWeight: 700, color: "#0a2540" }}>
            Orders by Status
          </h3>
          <BarChart data={statusData} maxValue={maxStatusCount} color="linear-gradient(90deg, #1a73e8, #22c55e)" />
        </div>

        {/* Top Products */}
        <div style={{
          background: "#fff", borderRadius: 16, border: "1px solid #e8ecf1", padding: 28,
        }}>
          <h3 style={{ margin: "0 0 24px", fontSize: 16, fontWeight: 700, color: "#0a2540" }}>
            Top Products by Orders
          </h3>
          <BarChart data={topProducts} maxValue={maxProductOrders} color="linear-gradient(90deg, #7c3aed, #1a73e8)" />
        </div>

        {/* Products by Category */}
        <div style={{
          background: "#fff", borderRadius: 16, border: "1px solid #e8ecf1", padding: 28,
        }}>
          <h3 style={{ margin: "0 0 24px", fontSize: 16, fontWeight: 700, color: "#0a2540" }}>
            Products by Category
          </h3>
          <BarChart data={categoryData} maxValue={maxCategoryCount} color="linear-gradient(90deg, #0a2540, #0ea5e9)" />
        </div>
      </div>

      {/* Order history list */}
      <div style={{
        marginTop: 24, background: "#fff", borderRadius: 16,
        border: "1px solid #e8ecf1", overflow: "hidden",
      }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f2f5" }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0a2540" }}>
            All Orders Summary
          </h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafd" }}>
                {["Order ID", "Date", "Customer", "Product", "Amount", "Status"].map(h => (
                  <th key={h} style={{
                    padding: "10px 16px", textAlign: "left",
                    fontSize: 11, fontWeight: 600, color: "#718096",
                    letterSpacing: "0.05em", textTransform: "uppercase",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...orders].sort((a, b) => b.date.localeCompare(a.date)).map(order => {
                const statusColors = {
                  Delivered: { bg: "#dcfce7", color: "#16a34a" },
                  Shipped: { bg: "#dbeafe", color: "#1d4ed8" },
                  Processing: { bg: "#fef9c3", color: "#a16207" },
                  Cancelled: { bg: "#fee2e2", color: "#dc2626" },
                };
                const sc = statusColors[order.status] || statusColors.Processing;
                return (
                  <tr key={order.id} style={{ borderTop: "1px solid #f0f2f5" }}>
                    <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#0a2540" }}>{order.id}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#718096" }}>{order.date}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#4a5568" }}>{order.customer}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#4a5568" }}>{order.product}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#0a2540" }}>${order.amount.toFixed(2)}</td>
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
      </div>
    </div>
  );
}
