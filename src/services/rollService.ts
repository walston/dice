import { parse } from "./languageService";

export async function roll(script: string) {
  const ast = parse(script);
  if (!ast) return;

  switch (ast.type) {
    case "sum":
      return rollSum(ast as Sum);
    case "largest":
      return 0;
    default:
      return null;
  }
}

type Sum = { type: "sum", multiset: MultiSet, modifier?: number };
async function rollSum({ multiset, modifier }: Sum) {
  const results = await rollMultiset(multiset);
  return results.reduce((acc, curr) => acc + curr, modifier || 0)
}

type MultiSet = { type: "set"; count: number; dice: Die };
async function rollMultiset({ count, dice }: MultiSet) {
  const set = new Array<ReturnType<typeof rollSingleDie>>(count);
  for (let i = 0; i < count; i++) set[i] = rollSingleDie(dice);
  return Promise.all(set);
}

/** someday this will speak with a physics based 3d model driven dice. */
type Die = { type: "die" | "zero-based die"; sides: number };
async function rollSingleDie({ type, sides }: Die) {
  const random = Math.random();
  return type === "zero-based die"
    ? Math.floor(random * sides)
    : Math.ceil(random * sides);
}
