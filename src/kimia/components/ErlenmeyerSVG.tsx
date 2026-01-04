import React from "react";
import Svg, { Rect, Circle, Line } from "react-native-svg";

type Props = {
  liquidColor: string;
  liquidLevel: number;
  showRod: boolean;
  showBubbles: boolean;
};

export function ErlenmeyerSVG({ liquidColor, liquidLevel, showRod, showBubbles }: Props) {
  const level = Math.max(0, Math.min(1, liquidLevel));
  const outerX = 20;
  const outerY = 10;
  const outerWidth = 80;
  const outerHeight = 120;

  const baseY = outerY + outerHeight - 10;
  const maxLiquidHeight = 70;
  const liquidHeight = maxLiquidHeight * level;
  const liquidTopY = baseY - liquidHeight;

  const innerX = outerX + 6;
  const innerWidth = outerWidth - 12;

  const rodSize = 18;
  const rodX = innerX + innerWidth / 2 - rodSize / 2;
  const rodY = baseY - rodSize;

  const bubbles = [
    { cx: innerX + innerWidth * 0.35, cy: liquidTopY + liquidHeight * 0.3, r: 3 },
    { cx: innerX + innerWidth * 0.55, cy: liquidTopY + liquidHeight * 0.5, r: 2.5 },
    { cx: innerX + innerWidth * 0.45, cy: liquidTopY + liquidHeight * 0.7, r: 2.8 }
  ];

  return (
    <Svg width={160} height={160} viewBox="0 0 120 160">
      <Rect
        x={outerX}
        y={outerY}
        width={outerWidth}
        height={outerHeight}
        fill="#f8fafc"
      />

      <Line
        x1={outerX}
        y1={outerY}
        x2={outerX}
        y2={outerY + outerHeight}
        stroke="#0f172a"
        strokeWidth={2}
      />
      <Line
        x1={outerX + outerWidth}
        y1={outerY}
        x2={outerX + outerWidth}
        y2={outerY + outerHeight}
        stroke="#0f172a"
        strokeWidth={2}
      />
      <Line
        x1={outerX}
        y1={outerY + outerHeight}
        x2={outerX + outerWidth}
        y2={outerY + outerHeight}
        stroke="#0f172a"
        strokeWidth={2}
      />

      {level > 0 && (
        <Rect
          x={innerX}
          y={liquidTopY}
          width={innerWidth}
          height={liquidHeight}
          fill={liquidColor || "#38bdf8"}
        />
      )}

      {showRod && (
        <Rect
          x={rodX}
          y={rodY}
          width={rodSize}
          height={rodSize}
          fill="#64748b"
        />
      )}

      {showBubbles && level > 0.2 && (
        <>
          {bubbles.map((b, idx) => (
            <Circle key={idx} cx={b.cx} cy={b.cy} r={b.r} fill="#e0f2fe" />
          ))}
        </>
      )}
    </Svg>
  );
}

