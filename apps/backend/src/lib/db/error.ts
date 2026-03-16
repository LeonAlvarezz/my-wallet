// Format any Drizzle/PG error into a readable message
export function isDrizzleError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;

  const errorObj = err as {
    name?: unknown;
    message?: unknown;
    query?: unknown;
    params?: unknown;
    code?: unknown;
    cause?: {
      query?: unknown;
      params?: unknown;
      code?: unknown;
    };
  };

  const hasQuery =
    typeof errorObj.query === "string" ||
    typeof errorObj.cause?.query === "string";
  const hasParams =
    Array.isArray(errorObj.params) || Array.isArray(errorObj.cause?.params);
  const hasPgCode =
    typeof errorObj.code === "string" ||
    typeof errorObj.cause?.code === "string";

  const name = typeof errorObj.name === "string" ? errorObj.name : "";
  const message = typeof errorObj.message === "string" ? errorObj.message : "";
  const looksLikeDrizzle =
    /drizzle/i.test(name) || /failed query:/i.test(message);

  return hasQuery || hasParams || hasPgCode || looksLikeDrizzle;
}

export function formatDrizzleError(err: any): string {
  if (!err || typeof err !== "object") {
    return "An unknown database error occurred.";
  }

  const pgError = extractOriginalPgError(err);

  const code = pgError?.code;
  const detail = pgError?.detail ?? "";
  const constraint = pgError?.constraint ?? "";
  const column = pgError?.column ?? "";
  const rawMsg = pgError?.message ?? "";

  switch (code) {
    case "23505": // unique_violation
      return `Duplicate value error: ${parseConstraint(constraint) || detail || "a unique field already exists."}`;

    case "23503": // foreign_key_violation
      return `Foreign key violation: ${parseConstraint(constraint) || detail || "referenced record not found."}`;

    case "23502": // not_null_violation
      return `Missing required field: ${column || parseColumnFromMessage(rawMsg) || "a required field was missing."}`;

    case "22P02": // invalid_text_representation
      return `Invalid data format: ${detail || "Check input types and formats."}`;

    default:
      return `Database error${code ? ` [${code}]` : ""}: ${stripQuery(rawMsg) || "Unexpected database error."}`;
  }
}

// Extracts underlying PG error from Drizzle's wrapped error
function extractOriginalPgError(err: any): any {
  if (err?.cause && typeof err.cause === "object") return err.cause;
  return err;
}

// Dynamically parse constraint name into human-readable message
function parseConstraint(constraint: string): string {
  if (!constraint) return "A database constraint was violated.";

  const fieldMatch = constraint.match(/_(\w+?)(?:_key|_idx|_fkey)?$/);
  const field = fieldMatch?.[1];
  const prettyField = field ? toTitleCase(field.replace(/_/g, " ")) : null;

  if (constraint.includes("_key"))
    return `${prettyField ?? constraint} must be unique.`;
  if (constraint.includes("_fkey"))
    return `${prettyField ?? constraint} must reference a valid record.`;

  return `Constraint violation on ${prettyField ?? constraint}.`;
}

// Converts snake_case to Title Case
function toTitleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Parses column name from a NOT NULL violation message
function parseColumnFromMessage(msg: string): string | null {
  const match = msg.match(/null value in column "(.*?)"/);
  return match ? match[1] : null;
}

// Clean up noisy raw SQL messages
function stripQuery(msg: string): string {
  if (!msg) return "";
  return msg
    .split("\n")[0] // Only keep the first line
    .replace(/^Failed query:\s*/, "")
    .trim();
}

// Function wrapper to catch and rethrow with formatted error
export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
): T {
  return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await fn(...args);
    } catch (err: any) {
      const message = formatDrizzleError(err);
      console.error("🚨 Database Error:", message);
      throw err;
    }
  }) as T;
}
