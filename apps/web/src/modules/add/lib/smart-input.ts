import type { CategoryModel } from "@my-wallet/types";

export type SmartInputParseResult = {
  amount?: number;
  category?: CategoryModel.CategoryDto;
  note?: string;
  categorySource: "tag" | "tail" | "none";
  parsed: {
    amount: boolean;
    category: boolean;
    note: boolean;
  };
  warnings: string[];
};

function normalizeForMatch(input: string): string {
  return (
    input
      .trim()
      .toLowerCase()
      .replace(/[\s]+/g, " ")
      // keep letters/numbers/spaces only; makes matching tolerant to punctuation like '&'
      .replace(/[^\p{L}\p{N} ]+/gu, "")
  );
}

function parseAmountToken(token: string): number | undefined {
  const cleaned = token.trim().replace(/[$,]/g, "");
  if (!/^\d+(?:\.\d+)?$/.test(cleaned)) return undefined;
  const num = Number.parseFloat(cleaned);
  if (!Number.isFinite(num)) return undefined;
  return num;
}

function bestCategoryMatch(
  candidateNormalized: string,
  categories: CategoryModel.CategoryDto[],
): CategoryModel.CategoryDto | undefined {
  if (!candidateNormalized) return undefined;

  const normalizedCategories = categories.map((c) => ({
    category: c,
    normalized: normalizeForMatch(c.name),
  }));

  // Exact match first
  const exact = normalizedCategories.find(
    (c) => c.normalized === candidateNormalized,
  );
  if (exact) return exact.category;

  // Then prefix match (e.g., #trans -> Transportation)
  const prefixMatches = normalizedCategories
    .filter((c) => c.normalized.startsWith(candidateNormalized))
    .sort((a, b) => a.normalized.length - b.normalized.length);
  return prefixMatches.length > 0 ? prefixMatches[0].category : undefined;
}

/**
 * Parses a natural language string into amount/category/note.
 * Supported examples:
 * - "5 Starbucks #coffee" (tag)
 * - "5 Starbucks coffee" (tail match)
 * - "Starbucks 12 coffee" (amount token can appear anywhere)
 */
export function parseSmartInput(
  text: string,
  categories: CategoryModel.CategoryDto[],
): SmartInputParseResult {
  const warnings: string[] = [];
  const raw = text.trim();

  if (!raw) {
    return {
      categorySource: "none",
      parsed: { amount: false, category: false, note: false },
      warnings,
    };
  }

  let tokens = raw.split(/\s+/g).filter(Boolean);

  // 1) Amount: first standalone numeric token (allows $12, 12.50, 1,234)
  let amount: number | undefined;
  const amountIndex = tokens.findIndex(
    (t) => parseAmountToken(t) !== undefined,
  );
  if (amountIndex >= 0) {
    amount = parseAmountToken(tokens[amountIndex]);
    tokens = tokens.filter((_, idx) => idx !== amountIndex);
  }

  // 2) Category: explicit tag (#coffee/@coffee) preferred
  let category: CategoryModel.CategoryDto | undefined;
  let categorySource: SmartInputParseResult["categorySource"] = "none";

  const tagIndex = tokens.findIndex(
    (t) => t.startsWith("#") || t.startsWith("@"),
  );
  if (tagIndex >= 0) {
    const tag = tokens[tagIndex].slice(1);
    const tagNormalized = normalizeForMatch(tag);
    const match = bestCategoryMatch(tagNormalized, categories);
    if (match) {
      category = match;
      categorySource = "tag";
      tokens = tokens.filter((_, idx) => idx !== tagIndex);
    }
  }

  // 3) Category fallback: tail match (longest match wins)
  if (!category) {
    const maxTailTokens = Math.min(3, tokens.length);
    for (let size = maxTailTokens; size >= 1; size -= 1) {
      const tail = tokens.slice(-size).join(" ");
      const tailNormalized = normalizeForMatch(tail);
      const match = bestCategoryMatch(tailNormalized, categories);
      if (match) {
        category = match;
        categorySource = "tail";
        tokens = tokens.slice(0, -size);
        warnings.push(`Category guessed: ${match}`);
        break;
      }
    }
  }

  // 4) Note: whatever remains
  const noteText = tokens.join(" ").trim();
  const note = noteText ? noteText : undefined;

  return {
    amount,
    category,
    note,
    categorySource,
    parsed: {
      amount: amount !== undefined,
      category: category !== undefined,
      note: note !== undefined,
    },
    warnings,
  };
}
