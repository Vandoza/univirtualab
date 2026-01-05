const Algebrite = require("algebrite");

export function numericIntegration(
  func: string,
  lower: number,
  upper: number,
  n: number = 1_000
): number | "Divergent" | "Undefined" {

  if (!isFinite(lower) || !isFinite(upper)) {
    return symbolicFallback(func, lower, upper);
  }

  const dx = (upper - lower) / n;
  let sum = 0;

  for (let i = 0; i < n; i++) {
    const x1 = lower + i * dx;
    const x2 = x1 + dx;

    let y1: number;
    let y2: number;

    try {
      y1 = Number(
        Algebrite.eval(func.replace(/x/g, `(${x1})`)).toString()
      );
      y2 = Number(
        Algebrite.eval(func.replace(/x/g, `(${x2})`)).toString()
      );
    } catch {
      return "Undefined";
    }

    if (!isFinite(y1) || !isFinite(y2)) {
      return symbolicFallback(func, lower, upper);
    }

    sum += (y1 + y2) * dx / 2;
  }

  if (!isFinite(sum) || Math.abs(sum) > 1e9) {
    return symbolicFallback(func, lower, upper);
  }

  return sum;
}

function symbolicFallback(
  func: string,
  lower: number,
  upper: number
): number | "Divergent" | "Undefined" {

  let integralExpr: string;

  try {
    integralExpr = Algebrite.integral(func).toString();
  } catch {
    return "Undefined";
  }

  try {
    const upperVal = evaluateLimit(integralExpr, upper);
    const lowerVal = evaluateLimit(integralExpr, lower);

    if (!isFinite(upperVal) || !isFinite(lowerVal)) {
      return "Divergent";
    }

    return upperVal - lowerVal;
  } catch {
    return "Undefined";
  }
}

function evaluateLimit(expr: string, x: number): number {
  const delta = 1e-4;

  const val = Algebrite.eval(
    expr.replace(/x/g, `(${x - delta})`)
  ).toString();

  return Number(val);
}
