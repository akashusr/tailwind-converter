import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Tailwind CSS v3 to v4 Converter | Free Online Tool",
    description:
        "Convert your Tailwind CSS v3 configuration to v4 @theme syntax instantly. Free online tool with dark mode, copy functionality, and real-time conversion.",
    keywords: [
        "Tailwind CSS",
        "Tailwind v4",
        "CSS converter",
        "Tailwind migration",
        "@theme syntax",
        "CSS framework",
        "web development tools",
        "frontend tools",
        "CSS utilities",
        "Tailwind config",
    ],
    authors: [{ name: "Tailwind CSS Converter" }],
    creator: "Tailwind CSS Converter",
    publisher: "Tailwind CSS Converter",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://tailwind-converter.vercel.app",
        title: "Tailwind CSS v3 to v4 Converter | Free Online Tool",
        description:
            "Convert your Tailwind CSS v3 configuration to v4 @theme syntax instantly. Free online tool with dark mode and real-time conversion.",
        siteName: "Tailwind CSS Converter",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Tailwind CSS v3 to v4 Converter Tool",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Tailwind CSS v3 to v4 Converter | Free Online Tool",
        description:
            "Convert your Tailwind CSS v3 configuration to v4 @theme syntax instantly. Free online tool with dark mode and real-time conversion.",
        images: ["/og-image.png"],
        creator: "@tailwindcss",
    },
    alternates: {
        canonical: "https://tailwind-converter.vercel.app",
    },
    category: "Web Development Tools",
    generator: "v0.dev",
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Tailwind CSS v3 to v4 Converter",
    description:
        "Free online tool to convert Tailwind CSS v3 configuration to v4 @theme syntax",
    url: "https://tailwind-converter.vercel.app",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web Browser",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
    creator: {
        "@type": "Organization",
        name: "Tailwind CSS Converter",
    },
    featureList: [
        "Convert Tailwind CSS v3 to v4",
        "Real-time conversion",
        "Dark mode support",
        "Copy to clipboard",
        "Error handling",
        "Mobile responsive",
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <link
                    rel="canonical"
                    href="https://tailwind-converter.vercel.app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="theme-color" content="#3b82f6" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <meta
                    name="google-site-verification"
                    content="your-google-verification-code"
                />
            </head>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange={false}
                >
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
