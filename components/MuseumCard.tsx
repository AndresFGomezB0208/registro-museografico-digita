"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface MuseumCardProps {
    type: "mar" | "trajes";
    description: string;
    piecesCount: number;
}

const museumData = {
    mar: {
        title: "Museo del Mar",
        emoji: "🌊",
        href: "/museo-del-mar",
        accentColor: "#0E3A53",
        accentBorder: "rgba(14, 58, 83, 0.4)",
        accentGlow: "rgba(14, 58, 83, 0.15)",
        categories: ["Fósiles", "Huesos", "Reconstrucciones", "Animatrónicos"],
        bgPattern: "mar",
    },
    trajes: {
        title: "Museo de Trajes",
        emoji: "👘",
        href: "/museo-de-trajes",
        accentColor: "#0F3D2E",
        accentBorder: "rgba(15, 61, 46, 0.4)",
        accentGlow: "rgba(15, 61, 46, 0.15)",
        categories: [
            "Prehispánico",
            "Colonial",
            "Comunidades Indígenas",
            "Contemporáneo",
        ],
        bgPattern: "trajes",
    },
};

export default function MuseumCard({
    type,
    description,
    piecesCount,
}: MuseumCardProps) {
    const museum = museumData[type];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className="group relative rounded-lg overflow-hidden cursor-pointer"
            style={{
                background: "#111111",
                border: `1px solid ${museum.accentBorder}`,
            }}
        >
            {/* Background glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${museum.accentGlow} 0%, transparent 60%)`,
                }}
            />

            {/* Abstract visual header */}
            <div
                className="relative h-64 overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, #0a0a0a 0%, ${museum.accentColor}22 50%, #0a0a0a 100%)`,
                }}
            >
                {/* Geometric pattern */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-20"
                    viewBox="0 0 400 256"
                    preserveAspectRatio="xMidYMid slice"
                >
                    {type === "mar" ? (
                        <>
                            <circle
                                cx="200"
                                cy="128"
                                r="80"
                                fill="none"
                                stroke={museum.accentColor}
                                strokeWidth="0.5"
                            />
                            <circle
                                cx="200"
                                cy="128"
                                r="120"
                                fill="none"
                                stroke={museum.accentColor}
                                strokeWidth="0.3"
                            />
                            <circle
                                cx="200"
                                cy="128"
                                r="160"
                                fill="none"
                                stroke={museum.accentColor}
                                strokeWidth="0.2"
                            />
                            <line
                                x1="0"
                                y1="128"
                                x2="400"
                                y2="128"
                                stroke={museum.accentColor}
                                strokeWidth="0.3"
                            />
                            <line
                                x1="200"
                                y1="0"
                                x2="200"
                                y2="256"
                                stroke={museum.accentColor}
                                strokeWidth="0.3"
                            />
                            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                                <line
                                    key={i}
                                    x1={200 + 80 * Math.cos((angle * Math.PI) / 180)}
                                    y1={128 + 80 * Math.sin((angle * Math.PI) / 180)}
                                    x2={200 + 160 * Math.cos((angle * Math.PI) / 180)}
                                    y2={128 + 160 * Math.sin((angle * Math.PI) / 180)}
                                    stroke={museum.accentColor}
                                    strokeWidth="0.2"
                                />
                            ))}
                        </>
                    ) : (
                        <>
                            <polygon
                                points="200,20 370,220 30,220"
                                fill="none"
                                stroke={museum.accentColor}
                                strokeWidth="0.5"
                            />
                            <polygon
                                points="200,60 330,200 70,200"
                                fill="none"
                                stroke={museum.accentColor}
                                strokeWidth="0.3"
                            />
                            <polygon
                                points="200,100 290,180 110,180"
                                fill="none"
                                stroke={museum.accentColor}
                                strokeWidth="0.2"
                            />
                            <line
                                x1="200"
                                y1="20"
                                x2="200"
                                y2="220"
                                stroke={museum.accentColor}
                                strokeWidth="0.2"
                            />
                        </>
                    )}
                </svg>

                {/* Large emoji/icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                        {museum.emoji}
                    </span>
                </div>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#111111] to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading font-bold text-xl text-[#F0F0F0]">
                        {museum.title}
                    </h3>
                    <span className="font-mono text-[10px] tracking-widest text-[#606060] uppercase">
                        {piecesCount} piezas
                    </span>
                </div>

                <p className="font-body text-[#A0A0A0] text-sm leading-relaxed mb-5">
                    {description}
                </p>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {museum.categories.map((cat) => (
                        <span
                            key={cat}
                            className="px-2 py-1 bg-[#181818] border border-[#2A2A2A] rounded text-[10px] font-mono text-[#606060] tracking-wide uppercase"
                        >
                            {cat}
                        </span>
                    ))}
                </div>

                <div className="divider mb-5" />

                <Link
                    href={museum.href}
                    className="group/btn flex items-center gap-2 text-sm font-body text-[#A0A0A0] hover:text-[#F0F0F0] transition-colors duration-200"
                >
                    Explorar piezas
                    <svg
                        className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </Link>
            </div>
        </motion.div>
    );
}
