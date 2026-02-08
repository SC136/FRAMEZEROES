'use client';

export function SkeletonCard({ height = 280 }) {
    return (
        <article className="skeleton-card" style={{ height: `${height}px` }}>
            <div className="skeleton-shimmer" />
        </article>
    );
}

export function SkeletonGrid({ count = 12 }) {
    // Create varied heights to mimic masonry layout
    const heights = [280, 350, 240, 320, 300, 260, 380, 290, 340, 250, 310, 270];

    return (
        <section className="masonry">
            {Array.from({ length: count }).map((_, idx) => (
                <SkeletonCard key={idx} height={heights[idx % heights.length]} />
            ))}
        </section>
    );
}
