import React, { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { SOLUTIONS, METALS } from "@/kimia/constants/reagents";
import { evaluateMix, type ReactionResult } from "@/kimia/logic/reactions";
import { RackItemCard } from "@/kimia/components/RackItemCard";
import { ErlenmeyerSVG } from "@/kimia/components/ErlenmeyerSVG";
import { ReactionQuiz } from "@/kimia/components/ReactionQuiz";
import { saveProgressLocal, saveProgressRemote, type ProgressEntry } from "@/services/progress";
import { useAuth } from "@/contexts/AuthContext";

const MAX_ITEMS = 2;
const MAX_QUESTIONS = 3;

export default function ChemistryLab() {
  const { user } = useAuth();
  const [chosen, setChosen] = useState<string[]>([]);
  const [result, setResult] = useState<ReactionResult | null>(null);
  const [stats, setStats] = useState<{ questionsAnswered: number; correctAnswers: number }>({
    questionsAnswered: 0,
    correctAnswers: 0
  });
  const [sessionSubmitted, setSessionSubmitted] = useState(false);

  const allItems = useMemo(
    () => [...SOLUTIONS, ...METALS] as { id: string; label: string; color: string }[],
    []
  );

  const labelById = useMemo(() => {
    const map = new Map<string, string>();
    for (const it of allItems) map.set(it.id, it.label);
    return map;
  }, [allItems]);

  const colorById = useMemo(() => {
    const map = new Map<string, string>();
    for (const it of allItems) map.set(it.id, it.color);
    return map;
  }, [allItems]);

  const finished = stats.questionsAnswered >= MAX_QUESTIONS;

  const toggle = (id: string) => {
    setChosen((prev) => {
      if (finished) return prev;
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_ITEMS) return prev;
      return [...prev, id];
    });
  };

  const clear = () => {
    setChosen([]);
    setResult(null);
  };

  const restart = () => {
    setStats({ questionsAnswered: 0, correctAnswers: 0 });
    setChosen([]);
    setResult(null);
    setSessionSubmitted(false);
  };

  useEffect(() => {
    if (chosen.length !== 2) {
      setResult(null);
      return;
    }
    const r = evaluateMix(chosen);
    setResult(r);
  }, [chosen]);

  const handleAnswered = (ok: boolean) => {
    setStats((prev) => {
      if (prev.questionsAnswered >= MAX_QUESTIONS) return prev;
      return {
        questionsAnswered: prev.questionsAnswered + 1,
        correctAnswers: prev.correctAnswers + (ok ? 1 : 0)
      };
    });
  };

  useEffect(() => {
    if (stats.questionsAnswered !== MAX_QUESTIONS || sessionSubmitted) return;
    const score = stats.correctAnswers;
    const entry: ProgressEntry = {
      createdAt: Date.now(),
      reagentIds: [],
      result: {
        color: null,
        precipitate: null,
        gas: null,
        note: `Melakukan praktikum kimia dan mendapatkan skor ${score}/3`,
        equation: "",
        showRod: false
      }
    };
    (async () => {
      await saveProgressLocal(entry);
      if (user?.uid) {
        await saveProgressRemote(user.uid, entry);
      }
      setSessionSubmitted(true);
      Alert.alert("Praktikum selesai", `Anda sudah menyelesaikan praktikum dengan skor ${score}/3`);
    })();
  }, [stats.questionsAnswered, stats.correctAnswers, user?.uid, sessionSubmitted]);

  const liquidColor = result?.color ?? "#ffffff";
  const showBubbles = Boolean(result?.gas);

  return (
    <View style={{ marginTop: 24 }}>
      <Text style={{ fontSize: 16, fontWeight: "900", color: "#0f172a" }}>Virtual Lab Kimia</Text>
      <Text style={{ marginTop: 4, color: "#334155" }}>
        Pilih maksimal 2 reaktan. Setiap campuran akan menghasilkan satu pertanyaan kuis. Maksimal {MAX_QUESTIONS} soal per sesi.
      </Text>

      <View style={{ marginTop: 8 }}>
        <Text style={{ fontSize: 12, color: "#64748b" }}>
          Percobaan: {stats.questionsAnswered}/{MAX_QUESTIONS} · Skor: {stats.correctAnswers}/{MAX_QUESTIONS}
        </Text>
      </View>

      <View
        style={{
          marginTop: 14,
          backgroundColor: "white",
          borderRadius: 22,
          padding: 14,
          borderWidth: 1,
          borderColor: "#e2e8f0"
        }}
      >
        <View style={{ alignItems: "center" }}>
          <ErlenmeyerSVG
            liquidColor={liquidColor}
            liquidLevel={chosen.length === 0 ? 0 : chosen.length === 1 ? 0.35 : 0.75}
            showRod={Boolean(result?.showRod)}
            showBubbles={showBubbles}
          />
        </View>

        <Text style={{ marginTop: 12, fontWeight: "900", color: "#0f172a" }}>Reaktan terpilih</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
          {chosen.length === 0 ? (
            <Text style={{ color: "#64748b" }}>Belum ada.</Text>
          ) : (
            chosen.map((id) => (
              <Pressable
                key={id}
                onPress={() => toggle(id)}
                style={({ pressed }) => ({
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 999,
                  backgroundColor: "#f1f5f9",
                  borderWidth: 1,
                  borderColor: "#e2e8f0",
                  opacity: pressed ? 0.85 : 1,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8
                })}
              >
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: colorById.get(id) ?? "#94a3b8"
                  }}
                />
                <Text style={{ color: "#0f172a", fontWeight: "800" }}>{labelById.get(id) ?? id}</Text>
                <Text style={{ color: "#94a3b8" }}>×</Text>
              </Pressable>
            ))
          )}
        </View>

        <Pressable
          onPress={clear}
          style={({ pressed }) => ({
            marginTop: 12,
            backgroundColor: "#0f172a",
            paddingVertical: 10,
            borderRadius: 14,
            alignItems: "center",
            opacity: pressed ? 0.85 : 1
          })}
        >
          <Text style={{ color: "white", fontWeight: "900" }}>Clear</Text>
        </Pressable>

        {finished && (
          <View style={{ marginTop: 10, gap: 8 }}>
            <Text style={{ fontSize: 12, color: "#dc2626" }}>
              Praktikum sesi ini sudah selesai. Tekan tombol di bawah untuk mengulang sesi baru.
            </Text>
            <Pressable
              onPress={restart}
              style={({ pressed }) => ({
                backgroundColor: "#2563eb",
                paddingVertical: 10,
                borderRadius: 14,
                alignItems: "center",
                opacity: pressed ? 0.9 : 1
              })}
            >
              <Text style={{ color: "white", fontWeight: "900" }}>Mulai praktikum lagi</Text>
            </Pressable>
          </View>
        )}
      </View>

      <Text style={{ marginTop: 16, fontSize: 16, fontWeight: "900", color: "#0f172a" }}>Rak Larutan</Text>
      <Text style={{ marginTop: 4, color: "#475569" }}>Tap untuk memilih.</Text>

      <FlatList
        data={SOLUTIONS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 10 }}
        scrollEnabled={false}
        contentContainerStyle={{ gap: 12, marginTop: 10 }}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <RackItemCard
              label={item.label}
              color={item.color}
              selected={chosen.includes(item.id)}
              disabled={finished || (!chosen.includes(item.id) && chosen.length >= MAX_ITEMS)}
              onPress={() => toggle(item.id)}
            />
          </View>
        )}
      />

      <Text style={{ marginTop: 18, fontSize: 16, fontWeight: "900", color: "#0f172a" }}>Batang Logam</Text>

      <FlatList
        data={METALS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 10 }}
        scrollEnabled={false}
        contentContainerStyle={{ gap: 12, marginTop: 10 }}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <RackItemCard
              label={item.label}
              color={item.color}
              selected={chosen.includes(item.id)}
              disabled={finished || (!chosen.includes(item.id) && chosen.length >= MAX_ITEMS)}
              onPress={() => toggle(item.id)}
            />
          </View>
        )}
      />

      <ReactionQuiz result={result} onAnswered={handleAnswered} disabled={finished} />
    </View>
  );
}
