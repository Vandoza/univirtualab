import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RefreshControl, ScrollView, Text, View, Pressable } from "react-native";
import { loadProgressLocal, deleteProgressLocalByIndex, type ProgressEntry } from "@/services/progress";
import { SOLUTIONS, METALS } from "@/kimia/constants/reagents";

type DisplayItem = {
  entry: ProgressEntry;
  originalIndex: number;
};

export default function ResultsScreen() {
  const [items, setItems] = useState<ProgressEntry[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const allItems = useMemo(
    () => [...SOLUTIONS, ...METALS] as { id: string; label: string; color: string }[],
    []
  );

  const labelById = useMemo(() => {
    const map = new Map<string, string>();
    for (const it of allItems) map.set(it.id, it.label);
    return map;
  }, [allItems]);

  const loadData = useCallback(async () => {
    const data = await loadProgressLocal();
    setItems(data);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const displayItems: DisplayItem[] = useMemo(() => {
    return items
      .map((entry, index) => ({ entry, originalIndex: index }))
      .filter((x) => !x.entry.reagentIds || x.entry.reagentIds.length === 0);
  }, [items]);

  const handleDelete = useCallback(
    async (originalIndex: number) => {
      await deleteProgressLocalByIndex(originalIndex);
      await loadData();
    },
    [loadData]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#c2e6fc" }}>
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 30 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={{ fontSize: 18, fontWeight: "900", color: "#0f172a" }}>Progress Praktikum</Text>
        <Text style={{ marginTop: 4, color: "#334155" }}>
          Ringkasan hasil praktikum yang tersimpan secara lokal di perangkat ini.
        </Text>

        {displayItems.length === 0 && (
          <View
            style={{
              marginTop: 20,
              padding: 16,
              borderRadius: 18,
              backgroundColor: "#f8fafc",
              borderWidth: 1,
              borderColor: "#e2e8f0"
            }}
          >
            <Text style={{ color: "#475569" }}>Belum ada progress yang tersimpan.</Text>
          </View>
        )}

        {displayItems.map(({ entry, originalIndex }, i) => {
          const time = new Date(entry.createdAt);
          const label = entry.result.note && entry.result.note.trim().length > 0
            ? "Praktikum Kimia"
            : "Progress";

          return (
            <View
              key={entry.createdAt.toString() + "|" + i.toString()}
              style={{
                marginTop: 14,
                padding: 16,
                borderRadius: 18,
                backgroundColor: "#f8fafc",
                borderWidth: 1,
                borderColor: "#e2e8f0"
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flex: 1, paddingRight: 8 }}>
                  <Text style={{ fontSize: 14, fontWeight: "800", color: "#0f172a" }}>{label}</Text>
                  <Text style={{ marginTop: 4, fontSize: 11, color: "#64748b" }}>
                    {time.toLocaleDateString()} {time.toLocaleTimeString()}
                  </Text>
                </View>
                <Pressable
                  onPress={() => handleDelete(originalIndex)}
                  style={({ pressed }) => ({
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: "#ef4444",
                    backgroundColor: pressed ? "#fee2e2" : "#ffffff"
                  })}
                >
                  <Text style={{ fontSize: 12, color: "#b91c1c", fontWeight: "800" }}>Hapus</Text>
                </Pressable>
              </View>

              {entry.result.note ? (
                <Text style={{ marginTop: 8, fontSize: 13, color: "#334155" }}>{entry.result.note}</Text>
              ) : null}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
