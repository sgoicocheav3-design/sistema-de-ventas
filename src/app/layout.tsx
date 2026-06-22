import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/lib/AuthContext"

export const metadata: Metadata = {
  title: "Sistema de Ventas - Minimarket",
  description: "Sistema de ventas para minimarket",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
