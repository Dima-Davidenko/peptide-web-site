export const INITIAL_PEPTIDES = [
  {
    id: 1,
    name: "BPC-157",
    category: "Recovery",
    purity: "≥99%",
    price: 54.99,
    image: "🧬",
    shortDesc: "Body Protection Compound — a pentadecapeptide (15 amino acids) studied for tissue repair and wound healing.",
    fullDesc: "BPC-157 is a synthetic peptide consisting of 15 amino acids, derived from a protective protein found in gastric juice. Research has demonstrated its potential in accelerating wound healing, promoting angiogenesis, and protecting organs from damage. Preclinical studies suggest efficacy in tendon, ligament, and muscle repair.",
    molecularWeight: "1419.53 g/mol",
    sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
    cas: "137525-51-0",
    form: "Lyophilized Powder",
    storage: "-20°C",
    sizes: ["5mg", "10mg", "20mg"],
  },
  {
    id: 2,
    name: "Semaglutide",
    category: "Metabolic",
    purity: "≥98%",
    price: 189.99,
    image: "💊",
    shortDesc: "GLP-1 receptor agonist studied for glycemic control and weight management in metabolic research.",
    fullDesc: "Semaglutide is a glucagon-like peptide-1 (GLP-1) receptor agonist with 94% structural homology to native GLP-1. It features an amino acid substitution at position 8 and a C-18 fatty di-acid chain, providing extended half-life. FDA-approved for type 2 diabetes and chronic weight management.",
    molecularWeight: "4113.58 g/mol",
    sequence: "Modified GLP-1 (7-37) analog",
    cas: "910463-68-2",
    form: "Lyophilized Powder",
    storage: "2–8°C",
    sizes: ["3mg", "5mg", "10mg"],
  },
  {
    id: 3,
    name: "Thymosin Alpha-1",
    category: "Immune",
    purity: "≥99%",
    price: 72.99,
    image: "🛡️",
    shortDesc: "28-amino acid peptide researched for immune system modulation and T-cell differentiation.",
    fullDesc: "Thymosin Alpha-1 (Tα1) is a naturally occurring 28-amino acid peptide isolated from thymic tissue. It plays a key role in T-cell maturation and immune regulation. Studies indicate potential applications in immunodeficiency disorders, chronic hepatitis B/C, and as an adjunct in cancer immunotherapy protocols.",
    molecularWeight: "3108.27 g/mol",
    sequence: "Ac-Ser-Asp-Ala-Ala-Val-Asp-Thr-Ser-Ser-Glu-...",
    cas: "62304-98-7",
    form: "Lyophilized Powder",
    storage: "-20°C",
    sizes: ["5mg", "10mg"],
  },
  {
    id: 4,
    name: "CJC-1295 (DAC)",
    category: "Growth",
    purity: "≥98%",
    price: 64.99,
    image: "📈",
    shortDesc: "Modified GHRH analog with Drug Affinity Complex, studied for sustained growth hormone release.",
    fullDesc: "CJC-1295 with DAC is a synthetic analog of growth hormone-releasing hormone (GHRH). The Drug Affinity Complex (DAC) modification extends the peptide's half-life by binding to serum albumin, enabling sustained GH pulsatility. Research focuses on its effects on body composition, lean mass, and metabolic parameters.",
    molecularWeight: "3647.28 g/mol",
    sequence: "Modified GHRH (1-29) with DAC",
    cas: "863288-34-0",
    form: "Lyophilized Powder",
    storage: "-20°C",
    sizes: ["2mg", "5mg"],
  },
  {
    id: 5,
    name: "PT-141 (Bremelanotide)",
    category: "Hormonal",
    purity: "≥99%",
    price: 42.99,
    image: "⚡",
    shortDesc: "Melanocortin receptor agonist studied for its effects on sexual function via CNS pathways.",
    fullDesc: "PT-141, also known as Bremelanotide, is a cyclic heptapeptide melanocortin receptor agonist. Unlike PDE5 inhibitors, it acts on the central nervous system via MC3R and MC4R receptors. FDA-approved as Vyleesi® for hypoactive sexual desire disorder in premenopausal women.",
    molecularWeight: "1025.18 g/mol",
    sequence: "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH",
    cas: "189691-06-3",
    form: "Lyophilized Powder",
    storage: "-20°C",
    sizes: ["10mg", "20mg"],
  },
  {
    id: 6,
    name: "Ipamorelin",
    category: "Growth",
    purity: "≥99%",
    price: 39.99,
    image: "🔬",
    shortDesc: "Selective GH secretagogue peptide with minimal effect on cortisol, prolactin, and appetite.",
    fullDesc: "Ipamorelin is a pentapeptide growth hormone secretagogue that selectively stimulates GH release from the anterior pituitary. Unlike other GHRPs, it does not significantly elevate cortisol, aldosterone, or prolactin levels, making it one of the most selective GH secretagogues available for research.",
    molecularWeight: "711.85 g/mol",
    sequence: "Aib-His-D-2Nal-D-Phe-Lys-NH₂",
    cas: "170851-70-4",
    form: "Lyophilized Powder",
    storage: "-20°C",
    sizes: ["2mg", "5mg", "10mg"],
  },
];

export const CATEGORIES = ["All", "Recovery", "Metabolic", "Immune", "Growth", "Hormonal"];

export const CHAT_RESPONSES = {
  greeting: "Hello! I'm PeptideAI, your clinical research assistant. I can help you with information about peptides, their mechanisms of action, clinical applications, and proper handling. What would you like to know?",
  bpc: "BPC-157 is a synthetic pentadecapeptide showing promising results in tissue repair research. Key findings include accelerated tendon healing, gastroprotective effects, and neuroprotective potential. It works through multiple pathways including VEGF upregulation and NO system modulation. Would you like to know about dosing protocols or storage guidelines?",
  semaglutide: "Semaglutide is a GLP-1 receptor agonist with 94% homology to native GLP-1. Its C-18 fatty di-acid chain enables albumin binding, extending half-life to ~1 week. FDA-approved for T2DM (Ozempic®) and weight management (Wegovy®). Clinical trials showed up to 14.9% weight reduction. Want details on its pharmacokinetics?",
  storage: "Proper peptide storage is critical for maintaining stability. General guidelines: Lyophilized peptides should be stored at -20°C. Reconstituted peptides: 2–8°C, use within 14–28 days. Avoid repeated freeze-thaw cycles. Use bacteriostatic water for reconstitution. Protect from light and moisture. Need specific storage info for a particular peptide?",
  quality: "All our peptides undergo rigorous quality control: HPLC purity analysis (≥98%), Mass Spectrometry (MS) for molecular identity verification, Endotoxin testing (LAL method), Sterility testing per USP standards. Each product ships with a Certificate of Analysis (COA). We can provide batch-specific testing data upon request.",
  default: "That's a great question! For detailed clinical information, I recommend reviewing the product's COA and research literature. You can also reach our medical affairs team at medical@peptidepro.com for physician-specific inquiries. Is there anything else I can help with?",
};

const MOCK_ORDERS = [
  { id: "ORD-1001", date: "2026-03-24", customer: "Dr. Sarah Johnson", email: "sjohnson@medicclinic.com", product: "BPC-157", size: "10mg", amount: 87.98, status: "Delivered" },
  { id: "ORD-1002", date: "2026-03-23", customer: "Dr. Michael Chen", email: "mchen@healthpartners.org", product: "Semaglutide", size: "5mg", amount: 189.99, status: "Shipped" },
  { id: "ORD-1003", date: "2026-03-22", customer: "Dr. Emily Rodriguez", email: "erodriguez@rfm.com", product: "Ipamorelin", size: "10mg", amount: 63.98, status: "Processing" },
  { id: "ORD-1004", date: "2026-03-21", customer: "Dr. James Williams", email: "jwilliams@sportsmedicine.net", product: "CJC-1295 (DAC)", size: "5mg", amount: 103.98, status: "Delivered" },
  { id: "ORD-1005", date: "2026-03-20", customer: "Dr. Lisa Park", email: "lpark@functionalmedicine.com", product: "Thymosin Alpha-1", size: "5mg", amount: 72.99, status: "Delivered" },
  { id: "ORD-1006", date: "2026-03-19", customer: "Dr. Robert Thompson", email: "rthompson@endocrine.org", product: "Semaglutide", size: "10mg", amount: 303.98, status: "Shipped" },
  { id: "ORD-1007", date: "2026-03-18", customer: "Dr. Anna Martinez", email: "amartinez@derm.com", product: "PT-141 (Bremelanotide)", size: "20mg", amount: 68.78, status: "Delivered" },
  { id: "ORD-1008", date: "2026-03-17", customer: "Dr. David Kim", email: "dkim@antiaging.com", product: "BPC-157", size: "20mg", amount: 140.77, status: "Processing" },
  { id: "ORD-1009", date: "2026-03-10", customer: "Dr. Sarah Johnson", email: "sjohnson@medicclinic.com", product: "Ipamorelin", size: "5mg", amount: 55.98, status: "Delivered" },
  { id: "ORD-1010", date: "2026-03-05", customer: "Dr. Michael Chen", email: "mchen@healthpartners.org", product: "BPC-157", size: "5mg", amount: 54.99, status: "Delivered" },
];

const MOCK_USERS = [
  { id: 1, name: "Dr. Sarah Johnson", email: "sjohnson@medicclinic.com", npi: "1234567890", specialty: "Sports Medicine", joined: "2026-03-10", status: "Verified" },
  { id: 2, name: "Dr. Michael Chen", email: "mchen@healthpartners.org", npi: "9876543210", specialty: "Endocrinology", joined: "2026-03-12", status: "Verified" },
  { id: 3, name: "Dr. Emily Rodriguez", email: "erodriguez@rfm.com", npi: "1122334455", specialty: "Functional Medicine", joined: "2026-03-15", status: "Pending" },
];

export function getProducts() {
  try {
    const stored = localStorage.getItem("pp_products");
    if (stored) return JSON.parse(stored);
  } catch {}
  localStorage.setItem("pp_products", JSON.stringify(INITIAL_PEPTIDES));
  return INITIAL_PEPTIDES;
}

export function saveProducts(products) {
  localStorage.setItem("pp_products", JSON.stringify(products));
}

export function getUsers() {
  try {
    const stored = localStorage.getItem("pp_users");
    if (stored) return JSON.parse(stored);
  } catch {}
  localStorage.setItem("pp_users", JSON.stringify(MOCK_USERS));
  return MOCK_USERS;
}

export function saveUsers(users) {
  localStorage.setItem("pp_users", JSON.stringify(users));
}

export function getOrders() {
  try {
    const stored = localStorage.getItem("pp_orders");
    if (stored) return JSON.parse(stored);
  } catch {}
  localStorage.setItem("pp_orders", JSON.stringify(MOCK_ORDERS));
  return MOCK_ORDERS;
}

export function saveOrders(orders) {
  localStorage.setItem("pp_orders", JSON.stringify(orders));
}

export function isAdminAuth() {
  return localStorage.getItem("pp_admin_auth") === "true";
}

export function setAdminAuth(val) {
  if (val) localStorage.setItem("pp_admin_auth", "true");
  else localStorage.removeItem("pp_admin_auth");
}
