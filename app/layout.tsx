import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lucas Ho — Systems Engineer',
  description:
    'Portfolio of Lucas Ho — systems-oriented software engineer building high-performance runtimes and zero-trust infrastructure.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-navy-950 font-sans text-white antialiased">{children}</body>
    </html>
  )
}
