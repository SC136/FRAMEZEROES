'use client';

import { useRouter } from 'next/navigation';

export default function RandomButton({ totalCount }) {
    const router = useRouter();

    const handleSurprise = () => {
        if (totalCount > 0) {
            const randomIndex = Math.floor(Math.random() * totalCount);
            router.push(`/wallpaper/${randomIndex}`);
        }
    };

    if (totalCount <= 0) return null;

    return (
        <button onClick={handleSurprise} className="random-button" title="Random wallpaper">
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="16 3 21 3 21 8" />
                <line x1="4" y1="20" x2="21" y2="3" />
                <polyline points="21 16 21 21 16 21" />
                <line x1="15" y1="15" x2="21" y2="21" />
                <line x1="4" y1="4" x2="9" y2="9" />
            </svg>
            <span className="random-text">Random</span>
        </button>
    );
}
