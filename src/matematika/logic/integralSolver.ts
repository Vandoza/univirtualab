const Algebrite = require("algebrite");

export function parseInput(input: string): string {
  const normalized = input
    .toLowerCase()
    .replace(/π/g, "pi")
    .replace(/∞|infinity/g, "Infinity")
    .replace(/\bln\b/g, "log")
    .replace(/\blog\b/g, "log10")
    .replace(/\|([^|]+)\|/g, "abs($1)")
    .trim();

  try {
    return Algebrite.simplify(normalized).toString();
  } catch {
    return normalized;
  }
}

export function parseOutput(output: string): string {
  let simplified = output;

  try {
    simplified = Algebrite.simplify(output).toString();
  } catch {
  }

  return simplified
    .replace(/pi/g, "π")
    .replace(/\blog10\b/g, "log")
    .replace(/\blog\b/g, "ln")
    .replace(/abs\(([^)]+)\)/g, "|$1|");
}

export function solveIndefiniteIntegral(funcRaw: string) {
  const func = parseInput(funcRaw);

  try {
    const result = Algebrite.integral(func).toString();
    return {
      result: parseOutput(result),
    };
  } catch (e: any) {
    return {
      error: "Tidak bisa mengintegralkan fungsi ini.",
    };
  }
}
