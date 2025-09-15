import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    metadataBase: new URL("https://bimoye.com"), // ← ton domaine prod
    title: {
        default: "Découvrez et réservez des résidences exceptionnelles",
        template: "Découvrez et réservez des résidences exceptionnelles pour vos vacances",
    },
    description:
        "Découvrez et réservez des résidences exceptionnelles pour vos vacances. Villas, chalets, appartements de luxe dans les plus belles destinations.",
    openGraph: {
        images: ["/logo.png"],
    },
    twitter: {
        card: "summary_large_image",
        images: ["/logo.png"],
    },
    generator: "Yamoussa KEITA",
    icons: {
        icon: "/favicon.ico", // favicon par défaut
        shortcut: "/favicon.ico",
        apple: "/logo.png", // pour iOS si tu veux
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
                <link rel="apple-touch-icon" href="/favicon.png" />
            </head>
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                    <LanguageProvider>
                        <div className="min-h-screen flex flex-col">
                            <Header />
                            <main className="flex-1">{children}</main>
                            <Footer />
                        </div>
                    </LanguageProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
