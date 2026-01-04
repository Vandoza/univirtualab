export type ReactionGas = { name: string; moreOverTime?: boolean };
export type ReactionPrecipitate = { name: string; color: string };
export type ReactionHeat = { type: "exo" | "endo"; note?: string };

export type ReactionResult = {
  color: string | null;
  precipitate: ReactionPrecipitate | null;
  gas: ReactionGas | null;
  heat: ReactionHeat | null;
  note: string;
  equation: string;
  showRod: boolean;
};

export function evaluateMix(ids: string[]): ReactionResult {
  const set = new Set(ids);
  const out = { color: null, precipitate: null, gas: null, heat: null, note: '', equation: '', showRod: false };

  const has = (...keys) => keys.every(k => set.has(k));

  if (has('sol-CuSO4','metal-Mg')){
    out.color = '#8fb5ff';
    out.precipitate = { name:'Cu(s)', color:'hitam' };
    out.note = 'Pada awal: endapan hitam tembaga; t=5 menit: endapan bertambah.';
    out.equation = 'CuSO₄(aq) + Mg(s) → MgSO₄(aq) + Cu(s)';
    out.showRod = true;
    return out;
  }
  if (has('sol-HCl','metal-Zn')){
    out.color = '#eab8b8';
    out.gas = { name:'H₂', moreOverTime:true };
    out.note = 'Awal: gelembung gas di sekitar Zn; t=5 menit: gelembung semakin banyak.';
    out.equation = '2HCl(aq) + Zn(s) → ZnCl₂(aq) + H₂(g)';
    out.showRod = true;
    return out;
  }
  if (has('sol-AgNO3','metal-Cu')){
    out.color = '#6fb0ff';
    out.precipitate = { name:'Ag(s)', color:'abu-abu' };
    out.note = 'Awal: endapan abu-abu di sekitar tembaga; t=5 menit: endapan bertambah.';
    out.equation = 'AgNO₃(aq) + Cu(s) → 2Ag(s) + Cu(NO₃)₂(aq)';
    out.showRod = true;
    return out;
  }

  if (has('sol-PbNO3_2','sol-CH3COONa')){
    out.color = '#ffffff';
    out.note = 'Terbentuk kabut putih sebentar lalu kembali bening (pelarutan sementara).';
    out.equation = 'Pb(NO₃)₂(aq) + CH₃COONa(aq) → Pb(C₂H₃O₂)₂(aq) + NaNO₃(s)';
    return out;
  }
  if (has('sol-PbNO3_2','sol-KI')){
    out.color = '#fde047';
    out.precipitate = { name:'PbI₂(s)', color:'kuning cerah' };
    out.note = 'Larutan menjadi kuning cerah dan muncul endapan PbI₂.';
    out.equation = 'Pb(NO₃)₂(aq) + 2KI(aq) → 2KNO₃(aq) + PbI₂(s)';
    return out;
  }

  if (has('sol-CuSO4_5H2O_s','sol-KI_s')){
    out.color = '#7c4c34';
    out.precipitate = { name:'CuI(s)', color:'coklat muda' };
    out.note = 'Padatan berubah menjadi coklat; terbentuk CuI(s) dan I₃⁻.';
    out.equation = '2CuSO₄·5H₂O(s) + 5KI(s) → 2CuI(s) + I₃⁻(aq) + K⁺(aq) + 2K₂SO₄(aq) + 10H₂O(l)';
    return out;
  }
  if (has('sol-CuSO4_5H2O_aq','sol-KI_aq') || has('sol-CuSO4','sol-KI')){
    out.color = '#7c4c34';
    out.precipitate = { name:'CuI(s)', color:'coklat muda' };
    out.note = 'Larutan berubah coklat lalu muncul endapan coklat muda (CuI).';
    out.equation = '2CuSO₄·5H₂O(aq) + 5KI(aq) → 2CuI(s) + I₃⁻(aq) + K⁺(aq) + 2K₂SO₄(aq) + 10H₂O(l)';
    return out;
  }

  if (has('sol-NaOH','sol-H2C2O4')) {
    out.color = '#ffffff';
    out.note = 'Larutan NaOH + fenolftalein kembali bening setelah penambahan H₂C₂O₄ (≈ tetes ke-12).';
    out.equation = '2NaOH(aq) + H₂C₂O₄(aq) → Na₂C₂O₄(aq) + 2H₂O(l)';
    return out;
  }
  if (has('sol-NH3','sol-H2C2O4')) {
    out.color = '#ffffff';
    out.note = 'Larutan NH₃ + fenolftalein kembali bening setelah penambahan H₂C₂O₄ (≈ tetes ke-9).';
    out.equation = '2NH₃(aq) + H₂C₂O₄(aq) → (NH₄)₂C₂O₄(aq)';
    return out;
  }

  if (has('sol-H2O2','sol-KI') || has('sol-H2O2','sol-KI_01M')) {
    out.color = '#fde047';
    out.heat = 'Hangat (reaksi eksoterm).';
    out.gas = { name:'O₂', moreOverTime:true };
    out.note = 'Larutan menguning cerah; terasa hangat; gelembung gas terbentuk.';
    out.equation = '2H₂O₂(aq) → 2H₂O(l) + O₂(g) (via I⁻/IO⁻ siklus)';
    return out;
  }

  if (has('sol-H2C2O4','sol-KMnO4_005M')){
    out.color = '#a855f7';
    out.note = 'Tetes 1: menjadi ungu-pink lalu bening setelah dikocok; warna stabil ungu-pink setelah tetes ke-19.';
    out.equation = '2MnO₄⁻ + 6H⁺ + 5H₂C₂O₄ → 2Mn²⁺ + 8H₂O + 10CO₂';
    return out;
  }
  if (has('sol-Fe2_01M','sol-KMnO4_005M')){
    out.color = '#a855f7';
    out.note = 'Tetes 1: ungu-pink lalu bening setelah dikocok; warna stabil ungu-pink setelah tetes ke-10.';
    out.equation = 'MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O';
    return out;
  }

  if (has('sol-PbAc2_01M','sol-KI_01M')){
    out.color = '#fde047';
    out.precipitate = { name:'PbI₂(s)', color:'kuning cerah' };
    out.note = 'PbI₂ mengendap. Massa endapan pada eksperimen: 0,043 g (contoh).';
    out.equation = 'Pb(CH₃COO)₂(aq) + 2KI(aq) → 2KCH₃COO(aq) + PbI₂(s)';
    return out;
  }

  out.note = 'Campuran umum';
  return out;
}
