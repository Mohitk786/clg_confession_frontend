import type { Metadata } from 'next'
import './globals.css'
import QueryProvider from './QueryProvider'
import AuthProvider from '@/context/AuthProvider'
import { Toaster } from '@/components/ui/toaster'

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
        <AuthProvider>
          <QueryProvider>
            <Toaster />
            {children}
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
