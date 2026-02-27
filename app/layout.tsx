import type { Metadata } from "next";
import "./globals.css";
import AIChatWidget from "@/components/AIChatWidget";

export const metadata: Metadata = {
    title: "Registro Museográfico Digital | Plataforma Institucional",
    description:
        "Plataforma institucional para registro, documentación y preservación del patrimonio material de los museos colombianos.",
    keywords: [
        "museo",
        "patrimonio",
        "museografía",
        "Colombia",
        "registro cultural",
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body className="bg-[#050505] text-[#F0F0F0] antialiased">
                {children}
                <AIChatWidget />
            </body>
        </html>
    );
}
