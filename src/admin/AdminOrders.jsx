import { useState } from "react";
import { getOrders, saveOrders } from "../data";

const STATUS_OPTIONS = ["Processing", "Shipped", "Delivered", "Cancelled"];

const STATUS_COLORS = {
  Delivered: { bg: "#dcfce7", color: "#16a34a" },
  Shipped: { bg: "#dbeafe", color: "#1d4ed8" },
  Processing: { bg: "#fef9c3", color: "#a16207" },
  Cancelled: { bg: "#fee2e2", color: "#dc2626" },
};

export default function AdminOrders() {
  const [orders, setOrders] = useState(() => getOrders());
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = orders.filter(o => {
    const matchFilter = filter === "All" || o.status === filter;
    const matchSearch = !search || o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleStatusChange = (orderId, newStatus) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
    saveOrders(updated);
  };

  const totalRevenue = filtered.reduce((sum, o) => sum + o.amount, 0);

  return (
    <div style={{ padding: "40px 40px 60px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontFamily: "'Instrument Serif', serif", fontSize: 36,
          color: "#0a2540", margin: "0 0 6px", fontWeight: 400,
        }}>Orders</h1>
        <p style={{ fontSize: 14, color: "#718096", margin: 0 }}>
          {orders.length} total orders · ${orders.reduce((s, o) => s + o.amount, 0).toFixed(2)} revenue
        </p>
      </div>

      {/* Filter bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["All", ...STATUS_OPTIONS].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding: "8px 18px", borderRadius: 100, border: "none", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
              background: filter === s ? "#0a2540" : "#f0f2f5",
              color: filter === s ? "#fff" : "#4a5568",
            }}>{s}</button>
          ))}
        </div>
        <input
          type="text" placeholder="Search orders..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{
            padding: "10px 16px", borderRadius: 10, border: "1px solid #d1d9e6",
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none", width: 240,
          }}
        />
      </div>

      <div style={{
        background: "#fff", borderRadius: 16, border: "1px solid #e8ecf1",
        overflow: "hidden",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafd" }}>
              {["Order ID", "Date", "Customer", "Product", "Size", "Amount", "Status"].map(h => (
                <th key={h} style={{
                  padding: "12px 16px", textAlign: "left",
                  fontSize: 11, fontWeight: 600, color: "#718096",
                  letterSpacing: "0.05em", textTransform: "uppercase",
                  borderBottom: "1px solid #e8ecf1",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "#718096", fontSize: 14 }}>
                  No orders found.
                </td>
              </tr>
            ) : filtered.map(order => {
              const sc = STATUS_COLORS[order.status] || STATUS_COLORS.Processing;
              return (
                <tr key={order.id} style={{ borderTop: "1px solid #f0f2f5" }}>
                  <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600, color: "#0a2540" }}>
                    {order.id}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, color: "#718096" }}>
                    {order.date}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0a2540" }}>{order.customer}</div>
                    <div style={{ fontSize: 11, color: "#718096" }}>{order.email}</div>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, color: "#4a5568" }}>
                    {order.product}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, color: "#4a5568" }}>
                    {order.size}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 700, color: "#0a2540" }}>
                    ${order.amount.toFixed(2)}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <select
                      value={order.status}
                      onChange={e => handleStatusChange(order.id, e.target.value)}
                      style={{
                        background: sc.bg, color: sc.color,
                        border: "none", borderRadius: 100,
                        padding: "4px 10px", fontSize: 11, fontWeight: 600,
                        cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                        outline: "none",
                      }}
                    >
                      {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length > 0 && (
          <div style={{
            padding: "14px 16px", borderTop: "1px solid #f0f2f5",
            background: "#f8fafd", display: "flex", justifyContent: "flex-end",
            gap: 4, fontSize: 13, color: "#718096",
          }}>
            Showing {filtered.length} order{filtered.length !== 1 ? "s" : ""} ·
            <span style={{ fontWeight: 700, color: "#0a2540", marginLeft: 4 }}>
              ${totalRevenue.toFixed(2)} total
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
