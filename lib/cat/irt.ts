// IRT (Item Response Theory) 모델 — 2PL/3PL

/** 2PL: P(correct) = 1 / (1 + exp(-a(theta - b))) */
export function p2pl(theta: number, a: number, b: number): number {
  return 1 / (1 + Math.exp(-a * (theta - b)));
}

/** 3PL: P(correct) = c + (1-c) / (1 + exp(-a(theta - b))) */
export function p3pl(theta: number, a: number, b: number, c: number): number {
  return c + (1 - c) / (1 + Math.exp(-a * (theta - b)));
}

/** Fisher Information (2PL): I(theta) = a^2 * P * (1-P) */
export function fisherInfo2pl(theta: number, a: number, b: number): number {
  const p = p2pl(theta, a, b);
  return a * a * p * (1 - p);
}

/**
 * Newton-Raphson MLE for theta given responses.
 * responses: [{ a, b, c, isCorrect }]
 */
export function estimateTheta(
  responses: { a: number; b: number; c: number; isCorrect: boolean }[],
  initial = 0,
): number {
  if (responses.length === 0) return 0;

  let theta = initial;

  for (let iter = 0; iter < 30; iter++) {
    let grad = 0;
    let hess = 0;

    for (const r of responses) {
      const p = p3pl(theta, r.a, r.b, r.c);
      const q = 1 - p;
      const u = r.isCorrect ? 1 : 0;
      // Derivative of log-likelihood for 3PL
      const dpdt = (r.a * (p - r.c) * q) / (1 - r.c);
      grad += ((u - p) / (p * q + 1e-9)) * dpdt;
      // Approximate Hessian (negative Fisher information)
      hess -= (r.a * r.a * (p - r.c) * (p - r.c) * q) / ((1 - r.c) * (1 - r.c) * p + 1e-9);
    }

    if (Math.abs(hess) < 1e-9) break;
    const delta = -grad / hess;
    theta += delta;
    theta = Math.max(-4, Math.min(4, theta));
    if (Math.abs(delta) < 0.001) break;
  }

  return theta;
}

/** Standard Error of theta from total Fisher Information */
export function standardError(
  theta: number,
  items: { a: number; b: number }[],
): number {
  const totalInfo = items.reduce((sum, it) => sum + fisherInfo2pl(theta, it.a, it.b), 0);
  return totalInfo > 0 ? 1 / Math.sqrt(totalInfo) : 1.0;
}

/** Mastery % from theta — sigmoid scaled */
export function thetaToMastery(theta: number): number {
  // theta -2 ~ 2 → mastery 0~1
  return 1 / (1 + Math.exp(-1.5 * theta));
}
