import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { mathUI } from "../constants/mathUI";

interface IntegralSlotProps {
  value: string | null;
  onPress: () => void;
  disabled?: boolean;
}

export const IntegralSlot: React.FC<IntegralSlotProps> = ({
  value,
  onPress,
  disabled = false
}) => {
  const isEmpty = value === null;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        mathUI.slot,
        isEmpty && mathUI.slotEmpty,
        disabled && mathUI.slotDisabled
      ]}
    >
      {isEmpty ? (
        <Text style={mathUI.slotPlaceholder}>____</Text>
      ) : (
        <View style={mathUI.slotFilled}>
          <Text style={mathUI.slotText}>{value}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
