import * as React from "react";

interface InfiniteScrollProps {
  isLoading: boolean;
  hasMore: boolean;
  next: () => void;
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  reverse?: boolean;
  children?: React.ReactNode;
}

export default function InfiniteScroll({
  isLoading,
  hasMore,
  next,
  threshold = 1,
  root = null,
  rootMargin = "0px",
  reverse = false,
  children,
}: InfiniteScrollProps) {
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!sentinelRef.current) return;
    if (isLoading) return;

    const safeThreshold = threshold >= 0 && threshold <= 1 ? threshold : 1;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !isLoading) {
          next();
        }
      },
      {
        threshold: safeThreshold,
        root,
        rootMargin,
      },
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoading, next, threshold, root, rootMargin]);

  return (
    <>
      {reverse && <div ref={sentinelRef} />}
      {children}
      {!reverse && <div ref={sentinelRef} />}
    </>
  );
}
