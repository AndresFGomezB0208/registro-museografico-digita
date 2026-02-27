"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { MockPiece } from "@/lib/data";

interface PieceCardProps {
    piece: MockPiece;
    index?: number;
}

const estadoColors = {
    Excelente: { bg: "#0F3D2E22", border: "#0F3D2E55", text: "#4FAD80" },
    Bueno: { bg: "#0E3A5322", border: "#0E3A5355", text: "#5BA3C9" },
    Regular: { bg: "#2A1F0022", border: "#2A1F0055", text: "#C9A35B" },
    Deteriorado: { bg: "#3D0F0F22", border: "#3D0F0F55", text: "#AD4F4F" },
};

export default function PieceCard({ piece, index = 0 }: PieceCardProps) {
    const estado =
        estadoColors[piece.estado_conservacion] || estadoColors["Bueno"];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
        >
            <Link href={`/pieza/${piece.id}`} className="block group">
                <div className="relative rounded-lg overflow-hidden bg-[#111111] border border-[#1F1F1F] hover:border-[#2A2A2A] transition-all duration-300 hover:shadow-lg hover:shadow-black/50">
                    {/* Header visual */}
                    <div
                        className="relative h-48 overflow-hidden"
                        style={{
                            background:
                                piece.museo === "Museo del Mar"
                                    ? "linear-gradient(135deg, #050A0F 0%, #0E3A5322 100%)"
                                    : "linear-gradient(135deg, #050A08 0%, #0F3D2E22 100%)",
                        }}
                    >
                        {/* Pattern */}
                        <svg
                            className="absolute inset-0 w-full h-full opacity-10"
                            viewBox="0 0 300 192"
                            preserveAspectRatio="xMidYMid slice"
                        >
                            {piece.museo === "Museo del Mar" ? (
                                <>
                                    <circle
                                        cx="150"
                                        cy="96"
                                        r="60"
                                        fill="none"
                                        stroke="#0E3A53"
                                        strokeWidth="0.5"
                                    />
                                    <circle
                                        cx="150"
                                        cy="96"
                                        r="90"
                                        fill="none"
                                        stroke="#0E3A53"
                                        strokeWidth="0.3"
                                    />
                                </>
                            ) : (
                                <polygon
                                    points="150,10 280,170 20,170"
                                    fill="none"
                                    stroke="#0F3D2E"
                                    strokeWidth="0.5"
                                />
                            )}
                        </svg>

                        {/* Category label */}
                        <div className="absolute top-3 left-3">
                            <span className="px-2 py-1 bg-[#050505]/80 backdrop-blur-sm border border-[#2A2A2A] rounded font-mono text-[9px] tracking-widest text-[#606060] uppercase">
                                {piece.categoria}
                            </span>
                        </div>

                        {/* Museum indicator */}
                        <div className="absolute top-3 right-3">
                            <span className="text-lg opacity-40 group-hover:opacity-60 transition-opacity">
                                {piece.museo === "Museo del Mar" ? "🌊" : "👘"}
                            </span>
                        </div>

                        {/* Center icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                                style={{
                                    background:
                                        piece.museo === "Museo del Mar"
                                            ? "rgba(14, 58, 83, 0.5)"
                                            : "rgba(15, 61, 46, 0.5)",
                                }}
                            >
                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={0.5}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#111111] to-transparent" />
                    </div>

                    {/* Card content */}
                    <div className="p-4">
                        <h3 className="font-heading font-semibold text-[#F0F0F0] text-base leading-snug mb-1 group-hover:text-white transition-colors line-clamp-2">
                            {piece.nombre}
                        </h3>

                        <p className="font-body text-[#606060] text-xs mb-3 line-clamp-2">
                            {piece.descripcion}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[9px] tracking-widest text-[#404040] uppercase">
                                    Período
                                </span>
                                <span className="font-body text-[#A0A0A0] text-xs">
                                    {piece.periodo.length > 20
                                        ? piece.periodo.substring(0, 20) + "…"
                                        : piece.periodo}
                                </span>
                            </div>

                            <span
                                className="px-2 py-1 rounded text-[10px] font-mono"
                                style={{
                                    background: estado.bg,
                                    border: `1px solid ${estado.border}`,
                                    color: estado.text,
                                }}
                            >
                                {piece.estado_conservacion}
                            </span>
                        </div>

                        <div className="divider mt-3 mb-3" />

                        <div className="flex items-center gap-1 text-[#404040] group-hover:text-[#606060] transition-colors">
                            <span className="font-mono text-[10px] tracking-widest uppercase">
                                Ver ficha
                            </span>
                            <svg
                                className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
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
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
