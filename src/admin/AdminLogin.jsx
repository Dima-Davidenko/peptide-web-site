import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAdminAuth } from "../data";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.username === "admin" && form.password === "admin") {
      setAdminAuth(true);
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError("Invalid credentials. Use admin / admin.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(165deg, #f8fafd 0%, #eef3fb 40%, #e3ecf8 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, width: 420, padding: 48,
        boxShadow: "0 25px 60px rgba(0,0,0,0.1)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, margin: "0 auto 16px",
            background: "linear-gradient(135deg, #0a2540, #1a73e8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 26, fontWeight: 700,
          }}>P</div>
          <h1 style={{
            fontFamily: "'Instrument Serif', serif", fontSize: 28,
            color: "#0a2540", margin: "0 0 6px", fontWeight: 400,
          }}>Admin Panel</h1>
          <p style={{ fontSize: 14, color: "#718096", margin: 0 }}>
            PeptidePro administration
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 6 }}>
              Username
            </label>
            <input
              type="text"
              value={form.username}
              onChange={e => { setForm({ ...form, username: e.target.value }); setError(""); }}
              placeholder="admin"
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 10, boxSizing: "border-box",
                border: error ? "1px solid #ef4444" : "1px solid #d1d9e6",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={e => { setForm({ ...form, password: e.target.value }); setError(""); }}
              placeholder="••••••••"
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 10, boxSizing: "border-box",
                border: error ? "1px solid #ef4444" : "1px solid #d1d9e6",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none",
              }}
            />
          </div>

          {error && (
            <div style={{
              background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8,
              padding: "10px 14px", fontSize: 13, color: "#dc2626",
            }}>{error}</div>
          )}

          <button type="submit" style={{
            background: "#0a2540", color: "#fff", border: "none",
            borderRadius: 10, padding: "14px", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: 16,
            fontWeight: 600, marginTop: 4,
          }}>
            Sign In to Admin
          </button>
        </form>

        <div style={{ marginTop: 20, textAlign: "center" }}>
          <a
            href="/"
            style={{ fontSize: 13, color: "#1a73e8", textDecoration: "none" }}
            onClick={e => { e.preventDefault(); window.location.href = "/"; }}
          >
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  );
}
