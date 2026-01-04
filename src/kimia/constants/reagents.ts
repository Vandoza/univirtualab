export type Reagent = { id: string; label: string; color: string; state?: 'aq' | 's' };
export type Metal = { id: string; label: string; metal: string; color: string };

export const SOLUTIONS: Reagent[] = [
  {
    "id": "sol-CuSO4",
    "label": "CuSO₄ (aq)",
    "color": "#3b82f6",
    "state": "aq"
  },
  {
    "id": "sol-HCl",
    "label": "HCl (aq)",
    "color": "#ef4444",
    "state": "aq"
  },
  {
    "id": "sol-AgNO3",
    "label": "AgNO₃ (aq)",
    "color": "#a78bfa",
    "state": "aq"
  },
  {
    "id": "sol-PbNO3_2",
    "label": "Pb(NO₃)₂ (aq)",
    "color": "#cbd5e1",
    "state": "aq"
  },
  {
    "id": "sol-CH3COONa",
    "label": "CH₃COONa (aq)",
    "color": "#cbd5e1",
    "state": "aq"
  },
  {
    "id": "sol-KI",
    "label": "KI (aq)",
    "color": "#fde047",
    "state": "aq"
  },
  {
    "id": "sol-CuSO4_5H2O_s",
    "label": "CuSO₄·5H₂O (s)",
    "color": "#60a5fa",
    "state": "s"
  },
  {
    "id": "sol-KI_s",
    "label": "KI (s)",
    "color": "#facc15",
    "state": "s"
  },
  {
    "id": "sol-CuSO4_5H2O_aq",
    "label": "CuSO₄·5H₂O (aq)",
    "color": "#3b82f6",
    "state": "aq"
  },
  {
    "id": "sol-KI_aq",
    "label": "KI (aq)",
    "color": "#fde047",
    "state": "aq"
  },
  {
    "id": "sol-NaOH",
    "label": "NaOH (aq)",
    "color": "#10b981",
    "state": "aq"
  },
  {
    "id": "sol-NH3",
    "label": "NH₃ (aq)",
    "color": "#34d399",
    "state": "aq"
  },
  {
    "id": "sol-H2C2O4",
    "label": "H₂C₂O₄ (aq)",
    "color": "#cbd5e1",
    "state": "aq"
  },
  {
    "id": "sol-H2O2",
    "label": "H₂O₂ (aq)",
    "color": "#e5e7eb",
    "state": "aq"
  },
  {
    "id": "sol-KMnO4_005M",
    "label": "KMnO₄ (aq) 0.05 M",
    "color": "#a855f7",
    "state": "aq"
  },
  {
    "id": "sol-Fe2_01M",
    "label": "Fe(II) (aq) 0.1 M",
    "color": "#22c55e",
    "state": "aq"
  },
  {
    "id": "sol-PbAc2_01M",
    "label": "Pb(CH₃COO)₂ (aq) 0.1 M",
    "color": "#cbd5e1",
    "state": "aq"
  },
  {
    "id": "sol-KI_01M",
    "label": "KI (aq) 0.1 M",
    "color": "#fde047",
    "state": "aq"
  }
];

export const METALS: Metal[] = [
  {
    "id": "metal-Mg",
    "label": "Batang Magnesium (Mg)",
    "metal": "Mg",
    "color": "#9ca3af"
  },
  {
    "id": "metal-Zn",
    "label": "Batang Seng (Zn)",
    "metal": "Zn",
    "color": "#9ca3af"
  },
  {
    "id": "metal-Cu",
    "label": "Batang Tembaga (Cu)",
    "metal": "Cu",
    "color": "#b45309"
  },
  {
    "id": "metal-Fe",
    "label": "Batang Besi (Fe)",
    "metal": "Fe",
    "color": "#6b7280"
  },
  {
    "id": "metal-Ag",
    "label": "Batang Perak (Ag)",
    "metal": "Ag",
    "color": "#d1d5db"
  }
];
