import './globals.css'

export const metadata = {
  title: 'FRAMEZEROES — Curated Anime Wallpaper Gallery',
  description: 'A cinematic collection of hand-curated anime wallpapers. Discover, browse, and download high-quality art from your favorite series.',
  alternates: {
    types: {
      'application/rss+xml': '/rss',
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="alternate" type="application/rss+xml" title="FRAMEZEROES RSS" href="/rss" />
      </head>
      <body>{children}</body>
    </html>
  )
}

