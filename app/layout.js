import './globals.css'

export const metadata = {
  title: 'Anime Wallpaper Curation',
  description: 'Curated anime wallpapers from various sources',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
