/* eslint-disable @typescript-eslint/no-explicit-any */
export const withDeps =
  <T extends any[]>(...staticParts: T) =>
  (...dynamicParts: any[]) => {
    const last = dynamicParts[dynamicParts.length - 1];
    const deps = typeof last === "object" && !Array.isArray(last) ? last : {};
    const args = deps === last ? dynamicParts.slice(0, -1) : dynamicParts;
    return [...staticParts, ...args, deps] as const;
  };
