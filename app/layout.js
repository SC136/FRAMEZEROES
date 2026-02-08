import './globals.css'

export const metadata = {
  title: 'FrameZero - Anime Wallpaper Curation',
  description: 'Curated anime wallpapers from various sources',
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
        <link rel="alternate" type="application/rss+xml" title="FrameZero RSS Feed" href="/rss" />
      </head>
      <body>{children}</body>
    </html>
  )
}

