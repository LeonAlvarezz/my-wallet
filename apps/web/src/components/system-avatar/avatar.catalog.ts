const TOTAL_SYSTEM_AVATARS = 9;

export const systemAvatars = Array.from(
  { length: TOTAL_SYSTEM_AVATARS },
  (_, index) => {
    const id = String(index + 1);
    return {
      id,
      src: `/avatars/${id}.svg`,
    };
  },
);
