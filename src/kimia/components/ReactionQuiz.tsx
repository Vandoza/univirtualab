import React, { useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import type { ReactionResult } from "@/kimia/logic/reactions";

type Option = {
  id: string;
  label: string;
  correct: boolean;
};

type Props = {
  result: ReactionResult | null;
  onAnswered?: (isCorrect: boolean) => void;
  disabled?: boolean;
};

export function ReactionQuiz({ result, onAnswered, disabled }: Props) {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const correctText = useMemo(() => {
    if (!result) return "";
    if (result.equation && result.equation.trim().length > 0) {
      return result.equation.trim();
    }
    if (result.note && result.note.trim().length > 0) {
      return result.note.trim();
    }
    return "Tidak ada reaksi yang berarti untuk diamati.";
  }, [result]);

  useEffect(() => {
    if (!result) {
      setOptions([]);
      setSelectedId(null);
      setAnswered(false);
      setIsCorrect(null);
      return;
    }

    const baseWrong = [
      "Larutan tetap bening tanpa perubahan yang terlihat.",
      "Terbentuk endapan putih pekat tanpa perubahan warna larutan.",
      "Terbentuk gas berbau menyengat dan larutan berubah keruh."
    ];

    const filteredWrong = baseWrong.filter((t) => t !== correctText);
    const wrong1 = filteredWrong[0] ?? "Larutan berubah sedikit keruh tanpa pembentukan gas.";
    const wrong2 = filteredWrong[1] ?? "Terbentuk endapan berwarna tetapi tanpa perubahan lain.";

    const rawOptions: Option[] = [
      { id: "a", label: correctText, correct: true },
      { id: "b", label: wrong1, correct: false },
      { id: "c", label: wrong2, correct: false }
    ];

    const shuffled = [...rawOptions];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }

    setOptions(shuffled);
    setSelectedId(null);
    setAnswered(false);
    setIsCorrect(null);
  }, [result, correctText]);

  const onCheck = () => {
    if (!selectedId || !result || answered || disabled) return;
    const chosen = options.find((o) => o.id === selectedId);
    if (!chosen) return;
    const ok = chosen.correct;
    setIsCorrect(ok);
    setAnswered(true);
    if (onAnswered) {
      onAnswered(ok);
    }
  };

  const letters: Record<string, string> = {
    a: "A",
    b: "B",
    c: "C"
  };

  if (!result) {
    return (
      <View
        style={{
          marginTop: 18,
          padding: 16,
          borderRadius: 18,
          backgroundColor: "#f8fafc",
          borderWidth: 1,
          borderColor: "#e2e8f0"
        }}
      >
        <Text style={{ color: "#475569" }}>
          Pilih dua reaktan terlebih dahulu untuk memulai kuis reaksi.
        </Text>
      </View>
    );
  }

  const isDisabled = !!disabled;

  return (
    <View
      style={{
        marginTop: 18,
        padding: 16,
        borderRadius: 18,
        backgroundColor: "#f8fafc",
        borderWidth: 1,
        borderColor: "#e2e8f0"
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "900", color: "#0f172a" }}>Kuis Reaksi</Text>
      <Text style={{ marginTop: 6, color: "#334155" }}>Apa reaksi yang terjadi?</Text>

      <View style={{ marginTop: 12, gap: 8 }}>
        {options.map((opt) => {
          const letter = letters[opt.id] ?? opt.id.toUpperCase();
          const selected = selectedId === opt.id;
          const isCorrectChoice = answered && opt.correct;
          const isWrongSelected = answered && selected && !opt.correct;

          let borderColor = "#e2e8f0";
          let backgroundColor = "#ffffff";
          if (selected && !answered && !isDisabled) {
            borderColor = "#2563eb";
            backgroundColor = "#dbeafe";
          }
          if (isCorrectChoice) {
            borderColor = "#16a34a";
            backgroundColor = "#dcfce7";
          }
          if (isWrongSelected) {
            borderColor = "#dc2626";
            backgroundColor = "#fee2e2";
          }

          return (
            <Pressable
              key={opt.id}
              onPress={() => {
                if (answered || isDisabled) return;
                setSelectedId(opt.id);
              }}
              style={({ pressed }) => ({
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 14,
                borderWidth: 1,
                borderColor,
                backgroundColor,
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 8,
                opacity: pressed && !answered && !isDisabled ? 0.9 : 1
              })}
            >
              <Text style={{ fontWeight: "900", color: "#0f172a", width: 20 }}>{letter}.</Text>
              <Text style={{ flex: 1, color: "#0f172a" }}>{opt.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={onCheck}
        disabled={!selectedId || answered || isDisabled}
        style={({ pressed }) => ({
          marginTop: 14,
          borderRadius: 14,
          paddingVertical: 10,
          alignItems: "center",
          backgroundColor: !selectedId || answered || isDisabled ? "#94a3b8" : "#2563eb",
          opacity: pressed && !answered && !isDisabled ? 0.9 : 1
        })}
      >
        <Text style={{ color: "white", fontWeight: "900" }}>
          {answered ? "Jawaban sudah diperiksa" : "Periksa jawaban"}
        </Text>
      </Pressable>

      {answered && (
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontWeight: "800",
              color: isCorrect ? "#16a34a" : "#dc2626"
            }}
          >
            {isCorrect ? "Benar!" : "Belum tepat."}
          </Text>
          <Text style={{ marginTop: 4, color: "#334155" }}>
            Jawaban yang benar: {correctText}
          </Text>
        </View>
      )}

      {isDisabled && (
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 12, color: "#64748b" }}>
            Praktikum sudah selesai. Anda tidak dapat menjawab kuis baru.
          </Text>
        </View>
      )}
    </View>
  );
}
