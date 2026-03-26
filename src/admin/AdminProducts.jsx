import { useState } from "react";
import { getProducts, saveProducts } from "../data";

const PRODUCT_CATEGORIES = ["Recovery", "Metabolic", "Immune", "Growth", "Hormonal"];

const EMPTY_FORM = {
  name: "", category: "Recovery", purity: "≥99%", price: "",
  image: "🧬", shortDesc: "", fullDesc: "", molecularWeight: "",
  sequence: "", cas: "", form: "Lyophilized Powder", storage: "-20°C",
  sizes: "5mg, 10mg",
};

const inputStyle = {
  width: "100%", padding: "10px 14px", borderRadius: 8, boxSizing: "border-box",
  border: "1px solid #d1d9e6", fontFamily: "'DM Sans', sans-serif",
  fontSize: 14, outline: "none", color: "#0a2540",
};

function ProductModal({ product, onSave, onClose }) {
  const [form, setForm] = useState(
    product
      ? { ...product, sizes: product.sizes.join(", "), price: String(product.price) }
      : EMPTY_FORM
  );

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const handleSave = () => {
    if (!form.name || !form.price) return;
    const saved = {
      ...form,
      id: product ? product.id : Date.now(),
      price: parseFloat(form.price) || 0,
      sizes: form.sizes.split(",").map(s => s.trim()).filter(Boolean),
    };
    onSave(saved);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 300,
      background: "rgba(10,37,64,0.5)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 20, width: "100%", maxWidth: 620,
        padding: 36, maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#0a2540" }}>
            {product ? "Edit Product" : "Add Product"}
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#718096" }}>✕</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 5 }}>Product Name *</label>
            <input style={inputStyle} value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. BPC-157" />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 5 }}>Category</label>
            <select style={inputStyle} value={form.category} onChange={e => set("category", e.target.value)}>
              {PRODUCT_CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 5 }}>Price ($) *</label>
            <input style={inputStyle} type="number" step="0.01" value={form.price} onChange={e => set("price", e.target.value)} placeholder="54.99" />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 5 }}>Purity</label>
            <input style={inputStyle} value={form.purity} onChange={e => set("purity", e.target.value)} placeholder="≥99%" />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 5 }}>Image (emoji)</label>
            <input style={inputStyle} value={form.image} onChange={e => set("image", e.target.value)} placeholder="🧬" />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 5 }}>CAS Number</label>
            <input style={inputStyle} value={form.cas} onChange={e => set("cas", e.target.value)} placeholder="137525-51-0" />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 5 }}>Molecular Weight</label>
            <input style={inputStyle} value={form.molecularWeight} onChange={e => set("molecularWeight", e.target.value)} placeholder="1419.53 g/mol" />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 5 }}>Form</label>
            <input style={inputStyle} value={form.form} onChange={e => set("form", e.target.value)} placeholder="Lyophilized Powder" />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 5 }}>Storage</label>
            <input style={inputStyle} value={form.storage} onChange={e => set("storage", e.target.value)} placeholder="-20°C" />
          </div>

          <div style={{ gridColumn: "1/-1" }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 5 }}>Sizes (comma-separated)</label>
            <input style={inputStyle} value={form.sizes} onChange={e => set("sizes", e.target.value)} placeholder="5mg, 10mg, 20mg" />
          </div>

          <div style={{ gridColumn: "1/-1" }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 5 }}>Sequence</label>
            <input style={inputStyle} value={form.sequence} onChange={e => set("sequence", e.target.value)} placeholder="Amino acid sequence" />
          </div>

          <div style={{ gridColumn: "1/-1" }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 5 }}>Short Description</label>
            <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 70 }}
              value={form.shortDesc} onChange={e => set("shortDesc", e.target.value)} />
          </div>

          <div style={{ gridColumn: "1/-1" }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 5 }}>Full Description</label>
            <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
              value={form.fullDesc} onChange={e => set("fullDesc", e.target.value)} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            padding: "11px 24px", borderRadius: 10, border: "2px solid #d1d9e6",
            background: "#fff", color: "#0a2540", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
          }}>Cancel</button>
          <button onClick={handleSave} style={{
            padding: "11px 28px", borderRadius: 10, border: "none",
            background: "#0a2540", color: "#fff", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
          }}>{product ? "Save Changes" : "Add Product"}</button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProducts() {
  const [products, setProducts] = useState(() => getProducts());
  const [modal, setModal] = useState(null); // null | "add" | product object
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleSave = (product) => {
    const updated = modal === "add"
      ? [...products, product]
      : products.map(p => p.id === product.id ? product : p);
    setProducts(updated);
    saveProducts(updated);
    setModal(null);
  };

  const handleDelete = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    saveProducts(updated);
    setDeleteConfirm(null);
  };

  return (
    <div style={{ padding: "40px 40px 60px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
        <div>
          <h1 style={{
            fontFamily: "'Instrument Serif', serif", fontSize: 36,
            color: "#0a2540", margin: "0 0 6px", fontWeight: 400,
          }}>Products</h1>
          <p style={{ fontSize: 14, color: "#718096", margin: 0 }}>
            {products.length} products in catalog
          </p>
        </div>
        <button onClick={() => setModal("add")} style={{
          background: "#0a2540", color: "#fff", border: "none",
          borderRadius: 10, padding: "12px 24px", cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
          display: "flex", alignItems: "center", gap: 8,
        }}>+ Add Product</button>
      </div>

      <div style={{
        background: "#fff", borderRadius: 16, border: "1px solid #e8ecf1",
        overflow: "hidden",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafd" }}>
              {["", "Name", "Category", "Purity", "Price", "Sizes", "Actions"].map(h => (
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
            {products.map(p => (
              <tr key={p.id} style={{ borderTop: "1px solid #f0f2f5" }}>
                <td style={{ padding: "14px 16px", fontSize: 26 }}>{p.image}</td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#0a2540" }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "#718096", marginTop: 2 }}>CAS: {p.cas}</div>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{
                    background: "#eef3fb", color: "#1a73e8",
                    borderRadius: 6, padding: "3px 10px",
                    fontSize: 11, fontWeight: 600, textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}>{p.category}</span>
                </td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: "#4a5568" }}>{p.purity}</td>
                <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 700, color: "#0a2540" }}>
                  ${p.price.toFixed(2)}
                </td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: "#4a5568" }}>
                  {p.sizes.join(", ")}
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setModal(p)} style={{
                      padding: "6px 16px", borderRadius: 8,
                      border: "1px solid #d1d9e6", background: "#fff",
                      cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12, fontWeight: 600, color: "#0a2540",
                    }}>Edit</button>
                    <button onClick={() => setDeleteConfirm(p.id)} style={{
                      padding: "6px 16px", borderRadius: 8,
                      border: "1px solid #fecaca", background: "#fef2f2",
                      cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12, fontWeight: 600, color: "#dc2626",
                    }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <ProductModal
          product={modal === "add" ? null : modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {deleteConfirm && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 300,
          background: "rgba(10,37,64,0.5)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            background: "#fff", borderRadius: 16, padding: 32, maxWidth: 400, width: "90%",
            boxShadow: "0 25px 60px rgba(0,0,0,0.15)", textAlign: "center",
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
            <h3 style={{ margin: "0 0 8px", color: "#0a2540", fontSize: 18 }}>Delete Product?</h3>
            <p style={{ color: "#718096", fontSize: 14, margin: "0 0 24px" }}>
              This action cannot be undone.
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
              }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
