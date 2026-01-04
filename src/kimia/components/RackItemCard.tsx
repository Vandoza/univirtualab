import React from "react";
import { Pressable, Text, View } from "react-native";

export function RackItemCard({
  label,
  color,
  selected,
  disabled,
  onPress,
}: {
  label: string;
  color: string;
  selected: boolean;
  disabled: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => ({
        borderWidth: 1,
        borderColor: selected ? "#2563eb" : "#e2e8f0",
        backgroundColor: disabled ? "#f1f5f9" : "white",
        padding: 10,
        borderRadius: 14,
        opacity: pressed ? 0.85 : 1,
        minHeight: 64,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: color }} />
        <Text style={{ color: "#0f172a", fontWeight: "700", fontSize: 13, flex: 1 }}>
          {label}
        </Text>
      </View>
      {selected ? (
        <Text style={{ marginTop: 6, fontSize: 12, color: "#2563eb", fontWeight: "600" }}>
          Dipilih
        </Text>
      ) : null}
    </Pressable>
  );
}
