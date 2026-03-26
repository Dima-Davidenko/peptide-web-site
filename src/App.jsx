import { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation, useParams } from "react-router-dom";
import AdminLogin from "./admin/AdminLogin";
import AdminApp from "./admin/AdminApp";
import { getProducts, getUsers, saveUsers, CATEGORIES, CHAT_RESPONSES } from "./data";

const inputStyle = {
  padding: "12px 16px", borderRadius: 10,
  border: "1px solid #d1d9e6", fontFamily: "'DM Sans', sans-serif",
  fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box",
};

// ─── Header ───
function Header({ isLoggedIn, onAuthClick, userName }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    if (path === "/catalog") return pathname === "/catalog" || pathname.startsWith("/product");
    return pathname === path;
  };

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid #e8e8e8",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 72,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
             onClick={() => navigate("/")}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: "linear-gradient(135deg, #0a2540, #1a73e8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 18, fontWeight: 700,
          }}>P</div>
          <span style={{
            fontFamily: "'Instrument Serif', serif", fontSize: 24,
            color: "#0a2540", letterSpacing: "-0.02em",
          }}>PeptidePro</span>
          <span style={{
            fontSize: 10, color: "#1a73e8", fontWeight: 600,
            border: "1px solid #1a73e8", borderRadius: 4,
            padding: "2px 6px", marginLeft: 2, letterSpacing: "0.05em",
          }}>USA</span>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {[
            { path: "/", label: "Home" },
            { path: "/catalog", label: "Catalog" },
            { path: "/about", label: "About" },
            { path: "/coa", label: "COA Library" },
          ].map(item => (
            <button key={item.path} onClick={() => navigate(item.path)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: 14,
              fontWeight: isActive(item.path) ? 600 : 400,
              color: isActive(item.path) ? "#1a73e8" : "#0a2540",
              position: "relative", padding: "4px 0",
            }}>
              {item.label}
              {isActive(item.path) && <div style={{
                position: "absolute", bottom: -2, left: 0, right: 0,
                height: 2, background: "#1a73e8", borderRadius: 1,
              }} />}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {isLoggedIn ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "linear-gradient(135deg, #1a73e8, #0a2540)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: 14, fontWeight: 600,
              }}>{userName?.charAt(0) || "D"}</div>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#0a2540" }}>
                {userName || "Dr. Smith"}
              </span>
            </div>
          ) : (
            <>
              <button onClick={() => onAuthClick("login")} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                fontWeight: 500, color: "#0a2540",
              }}>Sign In</button>
              <button onClick={() => onAuthClick("register")} style={{
                background: "#0a2540", color: "#fff", border: "none",
                borderRadius: 8, padding: "10px 20px", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                fontWeight: 600, letterSpacing: "0.01em",
              }}>Create Account</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

// ─── HeroSection ───
function HeroSection({ onAuthClick }) {
  const navigate = useNavigate();
  return (
    <section style={{
      minHeight: "92vh", display: "flex", alignItems: "center",
      background: "linear-gradient(165deg, #f8fafd 0%, #eef3fb 40%, #e3ecf8 100%)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: -120, right: -120,
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(26,115,232,0.08) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", bottom: -80, left: "20%",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(10,37,64,0.05) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", top: "15%", right: "8%",
        fontSize: 200, opacity: 0.04, fontFamily: "'Instrument Serif', serif",
        color: "#0a2540", lineHeight: 1, userSelect: "none",
      }}>Pep</div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "120px 32px 80px", width: "100%", position: "relative" }}>
        <div style={{ maxWidth: 680 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#fff", borderRadius: 100, padding: "6px 16px",
            marginBottom: 28, boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
            <span style={{ fontSize: 13, color: "#555", fontWeight: 500 }}>
              GMP-Certified • USA Manufactured • Third-Party Tested
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Instrument Serif', serif", fontSize: 64,
            color: "#0a2540", lineHeight: 1.08, margin: "0 0 24px",
            letterSpacing: "-0.03em", fontWeight: 400,
          }}>
            Pharmaceutical-Grade{" "}
            <span style={{ fontStyle: "italic", color: "#1a73e8" }}>Peptides</span>
            <br />for Clinical Practice
          </h1>

          <p style={{
            fontSize: 18, color: "#4a5568", lineHeight: 1.65,
            margin: "0 0 40px", maxWidth: 520,
          }}>
            Trusted by 2,000+ physicians across the United States. Every batch
            independently verified with ≥98% purity. Certificate of Analysis
            included with every order.
          </p>

          <div style={{ display: "flex", gap: 14, marginBottom: 56 }}>
            <button onClick={() => navigate("/catalog")} style={{
              background: "#0a2540", color: "#fff", border: "none",
              borderRadius: 10, padding: "16px 32px", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: 16,
              fontWeight: 600, display: "flex", alignItems: "center", gap: 8,
            }}>
              Browse Catalog
              <span style={{ fontSize: 18 }}>→</span>
            </button>
            <button onClick={() => onAuthClick("register")} style={{
              background: "#fff", color: "#0a2540",
              border: "2px solid #d1d9e6", borderRadius: 10,
              padding: "14px 28px", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: 16,
              fontWeight: 600,
            }}>
              Physician Registration
            </button>
          </div>

          <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
            {[
              { num: "99%+", label: "HPLC Purity" },
              { num: "2,000+", label: "Physicians" },
              { num: "48h", label: "Shipping" },
              { num: "ISO", label: "Certified" },
            ].map((b, i) => (
              <div key={i}>
                <div style={{
                  fontSize: 26, fontWeight: 700, color: "#0a2540",
                  fontFamily: "'DM Sans', sans-serif",
                }}>{b.num}</div>
                <div style={{ fontSize: 12, color: "#718096", fontWeight: 500, letterSpacing: "0.05em" }}>
                  {b.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ProductCard ───
function ProductCard({ product, onClick }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const handleClick = onClick || (() => navigate(`/product/${product.id}`));
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      style={{
        background: "#fff", borderRadius: 16,
        border: hovered ? "1px solid #1a73e8" : "1px solid #e8ecf1",
        padding: 28, cursor: "pointer",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 40px rgba(26,115,232,0.12)"
          : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <span style={{
          fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
          color: "#1a73e8", background: "#eef3fb", borderRadius: 6,
          padding: "4px 10px", textTransform: "uppercase",
        }}>{product.category}</span>
        <span style={{ fontSize: 36 }}>{product.image}</span>
      </div>

      <h3 style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 22,
        fontWeight: 700, color: "#0a2540", margin: "0 0 8px",
      }}>{product.name}</h3>

      <div style={{
        fontSize: 12, color: "#718096", fontWeight: 500, marginBottom: 12,
        display: "flex", gap: 12,
      }}>
        <span>Purity: {product.purity}</span>
        <span>•</span>
        <span>{product.form}</span>
      </div>

      <p style={{
        fontSize: 14, color: "#4a5568", lineHeight: 1.6,
        margin: "0 0 20px",
      }}>{product.shortDesc}</p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          fontSize: 22, fontWeight: 700, color: "#0a2540",
        }}>From ${product.price}</span>
        <span style={{
          fontSize: 13, fontWeight: 600, color: "#1a73e8",
          display: "flex", alignItems: "center", gap: 4,
        }}>
          View Details →
        </span>
      </div>
    </div>
  );
}

// ─── ProductDetailPage ───
function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(0);

  const products = getProducts();
  const product = products.find(p => String(p.id) === String(id));

  if (!product) return <Navigate to="/catalog" replace />;

  return (
    <section style={{ padding: "120px 32px 80px", maxWidth: 1280, margin: "0 auto" }}>
      <button onClick={() => navigate("/catalog")} style={{
        background: "none", border: "none", cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif", fontSize: 14,
        color: "#1a73e8", fontWeight: 500, marginBottom: 32,
        display: "flex", alignItems: "center", gap: 6,
      }}>← Back to Catalog</button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
        <div style={{
          background: "linear-gradient(135deg, #f8fafd, #eef3fb)",
          borderRadius: 20, padding: 60, display: "flex",
          alignItems: "center", justifyContent: "center",
          minHeight: 400,
        }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 100 }}>{product.image}</span>
            <div style={{
              marginTop: 24, background: "#fff", borderRadius: 12,
              padding: "16px 24px", display: "inline-block",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}>
              <div style={{ fontSize: 12, color: "#718096", fontWeight: 500, marginBottom: 4 }}>
                CAS Number
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#0a2540", fontFamily: "monospace" }}>
                {product.cas}
              </div>
            </div>
          </div>
        </div>

        <div>
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
            color: "#1a73e8", background: "#eef3fb", borderRadius: 6,
            padding: "4px 10px", textTransform: "uppercase",
          }}>{product.category}</span>

          <h1 style={{
            fontFamily: "'Instrument Serif', serif", fontSize: 44,
            color: "#0a2540", margin: "16px 0 12px", fontWeight: 400,
          }}>{product.name}</h1>

          <div style={{ display: "flex", gap: 16, marginBottom: 24, fontSize: 13, color: "#718096" }}>
            <span>Purity: <strong style={{ color: "#0a2540" }}>{product.purity}</strong></span>
            <span>•</span>
            <span>MW: <strong style={{ color: "#0a2540" }}>{product.molecularWeight}</strong></span>
            <span>•</span>
            <span>Storage: <strong style={{ color: "#0a2540" }}>{product.storage}</strong></span>
          </div>

          <p style={{ fontSize: 16, color: "#4a5568", lineHeight: 1.7, margin: "0 0 28px" }}>
            {product.fullDesc}
          </p>

          <div style={{
            background: "#f8fafd", borderRadius: 12, padding: 20, marginBottom: 28,
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#718096", marginBottom: 8, letterSpacing: "0.05em" }}>
              SEQUENCE
            </div>
            <div style={{
              fontFamily: "monospace", fontSize: 13, color: "#0a2540",
              wordBreak: "break-all", lineHeight: 1.6,
            }}>{product.sequence}</div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0a2540", marginBottom: 10 }}>
              Select Size
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {product.sizes.map((size, i) => (
                <button key={size} onClick={() => setSelectedSize(i)} style={{
                  padding: "10px 22px", borderRadius: 8, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
                  background: selectedSize === i ? "#0a2540" : "#fff",
                  color: selectedSize === i ? "#fff" : "#0a2540",
                  border: selectedSize === i ? "2px solid #0a2540" : "2px solid #d1d9e6",
                }}>{size}</button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: "#0a2540" }}>
              ${(product.price * (1 + selectedSize * 0.6)).toFixed(2)}
            </span>
            <span style={{ fontSize: 13, color: "#22c55e", fontWeight: 600 }}>● In Stock</span>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button style={{
              flex: 1, background: "#0a2540", color: "#fff", border: "none",
              borderRadius: 10, padding: "16px 24px", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600,
            }}>Add to Cart</button>
            <button style={{
              background: "#fff", color: "#0a2540",
              border: "2px solid #d1d9e6", borderRadius: 10,
              padding: "16px 20px", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
            }}>📄 View COA</button>
          </div>

          <div style={{
            marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
          }}>
            {[
              { icon: "🔬", text: "Third-Party Tested" },
              { icon: "🇺🇸", text: "Made in USA" },
              { icon: "📦", text: "Ships in 24-48h" },
            ].map((b, i) => (
              <div key={i} style={{
                background: "#f8fafd", borderRadius: 10, padding: "12px 14px",
                display: "flex", alignItems: "center", gap: 8,
                fontSize: 12, fontWeight: 500, color: "#4a5568",
              }}>
                <span style={{ fontSize: 16 }}>{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CatalogPage ───
function CatalogPage() {
  const navigate = useNavigate();
  const [products] = useState(() => getProducts());
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = products.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section style={{ padding: "120px 32px 80px", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ marginBottom: 48 }}>
        <h2 style={{
          fontFamily: "'Instrument Serif', serif", fontSize: 44,
          color: "#0a2540", margin: "0 0 12px", fontWeight: 400,
        }}>Product Catalog</h2>
        <p style={{ fontSize: 16, color: "#718096", margin: 0 }}>
          Browse our full range of pharmaceutical-grade peptides with COA documentation.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: "8px 18px", borderRadius: 100, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
              background: activeCategory === cat ? "#0a2540" : "#f0f2f5",
              color: activeCategory === cat ? "#fff" : "#4a5568",
              border: "none",
            }}>{cat}</button>
          ))}
        </div>
        <input
          type="text" placeholder="Search peptides..."
          value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
          style={{
            width: 260, padding: "10px 16px", borderRadius: 10,
            border: "1px solid #d1d9e6", fontFamily: "'DM Sans', sans-serif",
            fontSize: 14, outline: "none",
          }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} onClick={() => navigate(`/product/${p.id}`)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#718096" }}>
          No peptides match your search criteria.
        </div>
      )}
    </section>
  );
}

// ─── FeaturesSection ───
function FeaturesSection() {
  return (
    <section style={{ padding: "80px 32px", background: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif", fontSize: 40,
            color: "#0a2540", margin: "0 0 12px", fontWeight: 400,
          }}>Why Physicians Choose Us</h2>
          <p style={{ fontSize: 16, color: "#718096" }}>
            Built for healthcare professionals who demand excellence.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {[
            { icon: "🔬", title: "99%+ Purity", desc: "Every batch verified via HPLC and Mass Spectrometry by independent, CLIA-certified laboratories." },
            { icon: "📋", title: "Full COA Access", desc: "Certificate of Analysis with complete analytical data available for every product before purchase." },
            { icon: "🏭", title: "GMP Manufacturing", desc: "Produced in FDA-registered, cGMP-compliant facilities in the United States." },
            { icon: "🚚", title: "Cold Chain Shipping", desc: "Temperature-controlled packaging ensures peptide integrity from warehouse to your practice." },
          ].map((f, i) => (
            <div key={i} style={{
              padding: 28, borderRadius: 16,
              background: "linear-gradient(135deg, #f8fafd, #fff)",
              border: "1px solid #e8ecf1",
            }}>
              <span style={{ fontSize: 36, display: "block", marginBottom: 16 }}>{f.icon}</span>
              <h3 style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 18,
                fontWeight: 700, color: "#0a2540", margin: "0 0 8px",
              }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "#4a5568", lineHeight: 1.6, margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AuthModal ───
function AuthModal({ mode, onClose, onLogin }) {
  const [tab, setTab] = useState(mode);
  const [form, setForm] = useState({ name: "", email: "", password: "", npi: "", specialty: "" });

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleSubmit = () => {
    if (tab === "login" && form.email && form.password) {
      onLogin(form.email.split("@")[0]);
    } else if (tab === "register" && form.name && form.email && form.password) {
      const users = getUsers();
      const newUser = {
        id: Date.now(),
        name: form.name,
        email: form.email,
        npi: form.npi || "N/A",
        specialty: form.specialty || "N/A",
        joined: new Date().toISOString().split("T")[0],
        status: "Pending",
      };
      saveUsers([...users, newUser]);
      onLogin(form.name);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(10,37,64,0.5)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 20, width: 460,
        padding: 40, position: "relative",
        boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16,
          background: "none", border: "none", cursor: "pointer",
          fontSize: 20, color: "#718096",
        }}>✕</button>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            width: 50, height: 50, borderRadius: 14, margin: "0 auto 16px",
            background: "linear-gradient(135deg, #0a2540, #1a73e8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 24, fontWeight: 700,
          }}>P</div>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif", fontSize: 28,
            color: "#0a2540", margin: "0 0 4px", fontWeight: 400,
          }}>{tab === "login" ? "Welcome Back" : "Physician Registration"}</h2>
          <p style={{ fontSize: 14, color: "#718096", margin: 0 }}>
            {tab === "login" ? "Sign in to your account" : "Create your verified physician account"}
          </p>
        </div>

        <div style={{
          display: "flex", background: "#f0f2f5", borderRadius: 10,
          padding: 4, marginBottom: 24,
        }}>
          {["login", "register"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "10px", borderRadius: 8, border: "none",
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              fontSize: 14, fontWeight: 600,
              background: tab === t ? "#fff" : "transparent",
              color: tab === t ? "#0a2540" : "#718096",
              boxShadow: tab === t ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}>{t === "login" ? "Sign In" : "Register"}</button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {tab === "register" && (
            <input placeholder="Full Name (e.g., Dr. Jane Smith)" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              style={inputStyle} />
          )}
          <input placeholder="Email Address" type="email" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            style={inputStyle} />
          <input placeholder="Password" type="password" value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            style={inputStyle} />
          {tab === "register" && (
            <>
              <input placeholder="NPI Number (National Provider Identifier)" value={form.npi}
                onChange={e => setForm({ ...form, npi: e.target.value })}
                style={inputStyle} />
              <select value={form.specialty}
                onChange={e => setForm({ ...form, specialty: e.target.value })}
                style={{ ...inputStyle, color: form.specialty ? "#0a2540" : "#a0aec0" }}>
                <option value="">Select Medical Specialty</option>
                <option>Internal Medicine</option>
                <option>Endocrinology</option>
                <option>Dermatology</option>
                <option>Sports Medicine</option>
                <option>Anti-Aging / Regenerative</option>
                <option>Functional Medicine</option>
                <option>Pain Management</option>
                <option>Other</option>
              </select>
            </>
          )}

          <button onClick={handleSubmit} style={{
            background: "#0a2540", color: "#fff", border: "none",
            borderRadius: 10, padding: "14px", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: 16,
            fontWeight: 600, marginTop: 4,
          }}>
            {tab === "login" ? "Sign In" : "Create Account"}
          </button>

          {tab === "register" && (
            <p style={{ fontSize: 12, color: "#a0aec0", textAlign: "center", margin: 0, lineHeight: 1.5 }}>
              By registering, you confirm that you are a licensed healthcare
              professional. NPI verification may be required.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ChatBot ───
function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: CHAT_RESPONSES.greeting },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getResponse = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes("bpc")) return CHAT_RESPONSES.bpc;
    if (lower.includes("semaglutide") || lower.includes("glp")) return CHAT_RESPONSES.semaglutide;
    if (lower.includes("stor") || lower.includes("keep") || lower.includes("temperature")) return CHAT_RESPONSES.storage;
    if (lower.includes("quality") || lower.includes("pure") || lower.includes("test") || lower.includes("coa")) return CHAT_RESPONSES.quality;
    return CHAT_RESPONSES.default;
  };

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { from: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { from: "bot", text: getResponse(userMsg) }]);
    }, 800);
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 150,
        width: 64, height: 64, borderRadius: "50%",
        background: "linear-gradient(135deg, #0a2540, #1a73e8)",
        border: "none", cursor: "pointer", color: "#fff",
        fontSize: 26, display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 8px 30px rgba(10,37,64,0.3)",
      }}>💬</button>
    );
  }

  return (
    <div style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 150,
      width: 400, height: 540, background: "#fff",
      borderRadius: 20, display: "flex", flexDirection: "column",
      boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
      overflow: "hidden",
    }}>
      <div style={{
        background: "linear-gradient(135deg, #0a2540, #1a3a5c)",
        padding: "18px 20px", display: "flex", alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18,
          }}>🧬</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>PeptideAI Assistant</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
              Clinical Research Support
            </div>
          </div>
        </div>
        <button onClick={() => setOpen(false)} style={{
          background: "none", border: "none", color: "#fff",
          cursor: "pointer", fontSize: 18, opacity: 0.7,
        }}>✕</button>
      </div>

      <div style={{
        flex: 1, overflowY: "auto", padding: 16,
        display: "flex", flexDirection: "column", gap: 12,
        background: "#f8fafd",
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
            maxWidth: "82%",
          }}>
            <div style={{
              padding: "12px 16px", borderRadius: 14,
              background: msg.from === "user" ? "#0a2540" : "#fff",
              color: msg.from === "user" ? "#fff" : "#0a2540",
              fontSize: 14, lineHeight: 1.55,
              boxShadow: msg.from === "bot" ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
              borderBottomRightRadius: msg.from === "user" ? 4 : 14,
              borderBottomLeftRadius: msg.from === "bot" ? 4 : 14,
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{
        padding: "8px 12px", display: "flex", gap: 6, flexWrap: "wrap",
        borderTop: "1px solid #e8ecf1", background: "#fff",
      }}>
        {["BPC-157 info", "Storage guide", "Quality testing"].map(q => (
          <button key={q} onClick={() => setInput(q)} style={{
            padding: "6px 12px", borderRadius: 100,
            border: "1px solid #d1d9e6", background: "#fff",
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, color: "#4a5568", fontWeight: 500,
          }}>{q}</button>
        ))}
      </div>

      <div style={{
        padding: "12px 16px", borderTop: "1px solid #e8ecf1",
        display: "flex", gap: 8, background: "#fff",
      }}>
        <input
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask about peptides..."
          style={{
            flex: 1, padding: "10px 14px", borderRadius: 10,
            border: "1px solid #d1d9e6", fontFamily: "'DM Sans', sans-serif",
            fontSize: 14, outline: "none",
          }}
        />
        <button onClick={send} style={{
          background: "#0a2540", color: "#fff", border: "none",
          borderRadius: 10, padding: "10px 16px", cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
        }}>Send</button>
      </div>
    </div>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <footer style={{
      background: "#0a2540", color: "#fff", padding: "60px 32px 32px",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, fontWeight: 700,
              }}>P</div>
              <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22 }}>
                PeptidePro
              </span>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 300 }}>
              Pharmaceutical-grade peptides for licensed healthcare professionals.
              GMP-certified, third-party tested, USA manufactured.
            </p>
          </div>

          {[
            { title: "Products", links: ["Catalog", "New Arrivals", "COA Library", "Custom Synthesis"] },
            { title: "For Physicians", links: ["Registration", "Bulk Pricing", "Clinical Resources", "CME Programs"] },
            { title: "Company", links: ["About Us", "Quality Standards", "Contact", "Careers"] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{
                fontSize: 12, fontWeight: 600, letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.4)", marginBottom: 16,
              }}>{col.title.toUpperCase()}</div>
              {col.links.map(link => (
                <div key={link} style={{
                  fontSize: 14, color: "rgba(255,255,255,0.7)",
                  marginBottom: 10, cursor: "pointer",
                }}>{link}</div>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: 24, display: "flex", justifyContent: "space-between",
          fontSize: 13, color: "rgba(255,255,255,0.35)",
        }}>
          <span>© 2026 PeptidePro Inc. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24 }}>
            <span style={{ cursor: "pointer" }}>Privacy Policy</span>
            <span style={{ cursor: "pointer" }}>Terms of Service</span>
            <span style={{ cursor: "pointer" }}>HIPAA Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── AboutPage ───
function AboutPage() {
  return (
    <section style={{ padding: "120px 32px 80px", maxWidth: 800, margin: "0 auto" }}>
      <h2 style={{
        fontFamily: "'Instrument Serif', serif", fontSize: 44,
        color: "#0a2540", margin: "0 0 24px", fontWeight: 400,
      }}>About PeptidePro</h2>
      <p style={{ fontSize: 17, color: "#4a5568", lineHeight: 1.75, marginBottom: 20 }}>
        PeptidePro was founded with a singular mission: to provide physicians with the
        highest-quality, independently verified peptides available in the United States.
      </p>
      <p style={{ fontSize: 17, color: "#4a5568", lineHeight: 1.75, marginBottom: 20 }}>
        Every product in our catalog is manufactured in FDA-registered, cGMP-compliant
        facilities and undergoes rigorous third-party testing including HPLC purity analysis,
        mass spectrometry, endotoxin screening, and sterility verification.
      </p>
      <p style={{ fontSize: 17, color: "#4a5568", lineHeight: 1.75 }}>
        We believe that healthcare professionals deserve complete transparency. That's why
        we provide batch-specific Certificates of Analysis for every product and maintain
        full traceability from synthesis to delivery.
      </p>
    </section>
  );
}

// ─── COAPage ───
function COAPage() {
  const [products] = useState(() => getProducts());
  return (
    <section style={{ padding: "120px 32px 80px", maxWidth: 1000, margin: "0 auto" }}>
      <h2 style={{
        fontFamily: "'Instrument Serif', serif", fontSize: 44,
        color: "#0a2540", margin: "0 0 12px", fontWeight: 400,
      }}>COA Library</h2>
      <p style={{ fontSize: 16, color: "#718096", marginBottom: 40 }}>
        Access Certificate of Analysis documents for all products and batches.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {products.map(p => (
          <div key={p.id} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "20px 24px", background: "#fff", borderRadius: 12,
            border: "1px solid #e8ecf1",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 24 }}>{p.image}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{p.name}</div>
                <div style={{ fontSize: 13, color: "#718096" }}>
                  CAS: {p.cas} • Purity: {p.purity}
                </div>
              </div>
            </div>
            <button style={{
              background: "#f0f2f5", border: "none", borderRadius: 8,
              padding: "8px 18px", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: 13,
              fontWeight: 600, color: "#0a2540",
            }}>📄 Download COA</button>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── HomePage ───
function HomePage({ onAuthClick }) {
  const navigate = useNavigate();
  const [products] = useState(() => getProducts());

  return (
    <>
      <HeroSection onAuthClick={onAuthClick} />
      <FeaturesSection />

      <section style={{ padding: "80px 32px", background: "#f8fafd" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", marginBottom: 36,
          }}>
            <div>
              <h2 style={{
                fontFamily: "'Instrument Serif', serif", fontSize: 40,
                color: "#0a2540", margin: "0 0 8px", fontWeight: 400,
              }}>Featured Peptides</h2>
              <p style={{ fontSize: 16, color: "#718096", margin: 0 }}>
                Our most popular products among healthcare professionals.
              </p>
            </div>
            <button onClick={() => navigate("/catalog")} style={{
              background: "none", border: "2px solid #d1d9e6",
              borderRadius: 10, padding: "10px 24px", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: 14,
              fontWeight: 600, color: "#0a2540",
            }}>View All →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {products.slice(0, 3).map(p => (
              <ProductCard key={p.id} product={p} onClick={() => navigate(`/product/${p.id}`)} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 32px", background: "#fff" }}>
        <div style={{
          maxWidth: 900, margin: "0 auto", textAlign: "center",
          background: "linear-gradient(135deg, #0a2540, #1a3a5c)",
          borderRadius: 24, padding: "64px 48px",
        }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif", fontSize: 36,
            color: "#fff", margin: "0 0 16px", fontWeight: 400,
          }}>Ready to Get Started?</h2>
          <p style={{
            fontSize: 16, color: "rgba(255,255,255,0.65)",
            margin: "0 0 32px", maxWidth: 500, marginLeft: "auto", marginRight: "auto",
          }}>
            Join thousands of physicians who trust PeptidePro for their
            pharmaceutical-grade peptide needs.
          </p>
          <button onClick={() => onAuthClick("register")} style={{
            background: "#fff", color: "#0a2540", border: "none",
            borderRadius: 10, padding: "16px 36px", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600,
          }}>Create Physician Account</button>
        </div>
      </section>

      <Footer />
    </>
  );
}

// ─── MainSite ───
function MainSite() {
  const [authModal, setAuthModal] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
    setAuthModal(null);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#0a2540", minHeight: "100vh" }}>
      <Header isLoggedIn={isLoggedIn} onAuthClick={setAuthModal} userName={userName} />
      <Routes>
        <Route index element={<HomePage onAuthClick={setAuthModal} />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="coa" element={<COAPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ChatBot />
      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

// ─── Root App ───
export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="/*" element={<MainSite />} />
    </Routes>
  );
}
