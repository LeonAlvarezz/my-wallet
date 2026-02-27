import { BadRequestException } from "@my-wallet/exception";
import { CursorModel } from "@my-wallet/types";

export function encodeCursor({ id, created_at }: CursorModel.CursorProps) {
  return btoa(JSON.stringify({ id, created_at }));
}

export function decodeCursor(cursor: string): CursorModel.CursorProps {
  try {
    const decoded = atob(cursor);
    const parsed = JSON.parse(decoded);
    const result = CursorModel.CursorPropsSchema.safeParse(parsed);
    if (!result.success) {
      throw new BadRequestException({ message: "Invalid cursor" });
    }
    return result.data;
  } catch {
    throw new BadRequestException({ message: "Invalid cursor" });
  }
}

export function getCursorMeta({
  created_at,
  id,
  page_size,
  total,
}: CursorModel.CursorMetaProps): CursorModel.CursorMeta {
  return {
    has_more: total > page_size,
    page_size,
    next_cursor: id && created_at ? encodeCursor({ id, created_at }) : null,
  };
}

export function processCursorResult<T extends CursorModel.CursorProps>(
  data: T[],
  page_size: number,
): { data: T[]; meta: CursorModel.CursorMeta } {
  const has_more = data.length >= page_size;
  console.log("page_size:", page_size);
  console.log("data.length:", data.length);
  const last = data.at(-1);
  return {
    data,
    meta: {
      has_more,
      page_size,
      next_cursor:
        has_more && last
          ? encodeCursor({ id: last.id, created_at: last.created_at })
          : null,
    },
  };
}
