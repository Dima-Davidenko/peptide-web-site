import { useState } from "react";
import { getUsers, saveUsers } from "../data";

const STATUS_OPTIONS = ["Pending", "Verified", "Suspended"];

const STATUS_COLORS = {
  Verified: { bg: "#dcfce7", color: "#16a34a" },
  Pending: { bg: "#fef9c3", color: "#a16207" },
  Suspended: { bg: "#fee2e2", color: "#dc2626" },
};

export default function AdminUsers() {
  const [users, setUsers] = useState(() => getUsers());
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = users.filter(u => {
    const matchFilter = filter === "All" || u.status === filter;
    const matchSearch = !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.specialty.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleStatusChange = (userId, newStatus) => {
    const updated = users.map(u => u.id === userId ? { ...u, status: newStatus } : u);
    setUsers(updated);
    saveUsers(updated);
  };

  const handleDelete = (userId) => {
    const updated = users.filter(u => u.id !== userId);
    setUsers(updated);
    saveUsers(updated);
    setDeleteConfirm(null);
  };

  return (
    <div style={{ padding: "40px 40px 60px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontFamily: "'Instrument Serif', serif", fontSize: 36,
          color: "#0a2540", margin: "0 0 6px", fontWeight: 400,
        }}>Users</h1>
        <p style={{ fontSize: 14, color: "#718096", margin: 0 }}>
          {users.length} registered physicians ·{" "}
          {users.filter(u => u.status === "Pending").length} awaiting verification
        </p>
      </div>

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
          type="text" placeholder="Search users..."
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
              {["User", "Email", "NPI", "Specialty", "Joined", "Status", "Actions"].map(h => (
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
                  No users found.
                </td>
              </tr>
            ) : filtered.map(user => {
              const sc = STATUS_COLORS[user.status] || STATUS_COLORS.Pending;
              return (
                <tr key={user.id} style={{ borderTop: "1px solid #f0f2f5" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: "50%",
                        background: "linear-gradient(135deg, #1a73e8, #0a2540)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0,
                      }}>{user.name.charAt(0)}</div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#0a2540" }}>
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, color: "#4a5568" }}>{user.email}</td>
                  <td style={{ padding: "14px 16px", fontSize: 12, fontFamily: "monospace", color: "#4a5568" }}>{user.npi}</td>
                  <td style={{ padding: "14px 16px", fontSize: 13, color: "#4a5568" }}>{user.specialty}</td>
                  <td style={{ padding: "14px 16px", fontSize: 13, color: "#718096" }}>{user.joined}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <select
                      value={user.status}
                      onChange={e => handleStatusChange(user.id, e.target.value)}
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
                  <td style={{ padding: "14px 16px" }}>
                    <button onClick={() => setDeleteConfirm(user.id)} style={{
                      padding: "6px 16px", borderRadius: 8,
                      border: "1px solid #fecaca", background: "#fef2f2",
                      cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12, fontWeight: 600, color: "#dc2626",
                    }}>Remove</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {deleteConfirm && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 300,
          background: "rgba(10,37,64,0.5)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            background: "#fff", borderRadius: 16, padding: 32, maxWidth: 380, width: "90%",
            boxShadow: "0 25px 60px rgba(0,0,0,0.15)", textAlign: "center",
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
            <h3 style={{ margin: "0 0 8px", color: "#0a2540", fontSize: 18 }}>Remove User?</h3>
            <p style={{ color: "#718096", fontSize: 14, margin: "0 0 24px" }}>
              This user will be permanently removed.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={() => setDeleteConfirm(null)} style={{
                padding: "10px 24px", borderRadius: 10, border: "2px solid #d1d9e6",
                background: "#fff", color: "#0a2540", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
              }}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{
                padding: "10px 24px", borderRadius: 10, border: "none",
                background: "#dc2626", color: "#fff", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
              }}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
