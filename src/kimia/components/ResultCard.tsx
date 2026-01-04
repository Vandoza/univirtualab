import React from "react";
import { Text, View } from "react-native";
import type { ReactionResult } from "@/logic/reactions";

export function ResultCard({ result }: { result: ReactionResult | null }) {
  if (!result) {
    return (
      <View style={{ backgroundColor: "white", borderRadius: 18, padding: 14, borderWidth: 1, borderColor: "#e2e8f0" }}>
        <Text style={{ color: "#334155" }}>
          Pilih dua reaktan untuk melihat hasil reaksi.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: "white", borderRadius: 18, padding: 14, borderWidth: 1, borderColor: "#e2e8f0" }}>
      <Text style={{ fontSize: 16, fontWeight: "800", color: "#0f172a" }}>Hasil Pengamatan</Text>

      <View style={{ marginTop: 10, gap: 6 }}>
        <Row label="Warna larutan" value={result.color ? result.color : "-"} />
        <Row label="Endapan" value={result.precipitate ? `${result.precipitate.name} (${result.precipitate.color})` : "-"} />
        <Row label="Gas" value={result.gas ? `${result.gas.name}${result.gas.moreOverTime ? " (bertambah)" : ""}` : "-"} />
        <Row label="Catatan" value={result.note || "-"} />
        <Row label="Persamaan" value={result.equation || "-"} mono />
      </View>
    </View>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <Text style={{ width: 90, color: "#475569", fontWeight: "700", fontSize: 12 }}>{label}</Text>
      <Text style={{ flex: 1, color: "#0f172a", fontSize: 12, fontFamily: mono ? "monospace" : undefined }}>
        {value}
      </Text>
    </View>
  );
}
