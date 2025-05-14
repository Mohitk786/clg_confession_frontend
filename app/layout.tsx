import type { Metadata } from 'next'
import './globals.css'
import QueryProvider from './QueryProvider'

export const metadata: Metadata = {
  title: 'ClgConfessions',
  description: 'A platform for anonymous confessions',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        ></script>
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
