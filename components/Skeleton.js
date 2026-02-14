'use client';

export function SkeletonCard({ height = 280 }) {
    return (
        <article className="skeleton-card" style={{ height: `${height}px` }}>
            <div className="skeleton-shimmer" />
        </article>
    );
}

export function SkeletonGrid({ count = 12 }) {
    const heights = [300, 380, 260, 340, 320, 280, 400, 310, 360, 270, 330, 290];

    return (
        <section className="masonry" style={{ animation: 'cardReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
            {Array.from({ length: count }).map((_, idx) => (
                <SkeletonCard key={idx} height={heights[idx % heights.length]} />
            ))}
        </section>
    );
}
