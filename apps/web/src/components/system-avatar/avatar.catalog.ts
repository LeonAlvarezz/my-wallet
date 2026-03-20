const avatarModules = import.meta.glob<{ default: string }>("@/assets/*.svg", {
  eager: true,
});

export const systemAvatars = Object.entries(avatarModules)
  .map(([path, module]) => {
    const match = path.match(/(\d+)\.svg$/);
    return {
      id: match ? match[1] : path,
      src: module.default,
    };
  })
  .sort((left, right) => Number(left.id) - Number(right.id));
