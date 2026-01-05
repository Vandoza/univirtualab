import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { mathUI } from "../constants/mathUI";

interface IntegralPieceProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export const IntegralPiece: React.FC<IntegralPieceProps> = ({
  label,
  onPress,
  disabled = false
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        mathUI.piece,
        disabled && mathUI.pieceDisabled
      ]}
      activeOpacity={0.7}
    >
      <Text
        style={[
          mathUI.pieceText,
          disabled && mathUI.pieceTextDisabled
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
