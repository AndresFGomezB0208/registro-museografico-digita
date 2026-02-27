"use client";

import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { mockPieces } from "@/lib/data";
import Link from "next/link";

export default function MisRegistrosPage() {
    return (
        <div className="min-h-screen bg-[#050505] flex">
            <Sidebar />
            <main className="flex-1 lg:ml-60 min-h-screen">
                <div className="px-6 lg:px-10 py-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-10"
                    >
                        <p className="font-mono text-[10px] tracking-widest text-[#606060] uppercase mb-2">
                            Mi colección
                        </p>
                        <div className="flex items-center justify-between">
                            <h1 className="font-heading font-bold text-3xl text-[#F0F0F0]">
                                Mis Registros
                            </h1>
                            <Link
                                href="/dashboard/nueva-pieza"
                                className="flex items-center gap-2 px-5 py-2.5 bg-[#0E3A53] hover:bg-[#1A5C83] text-[#F0F0F0] rounded font-body text-sm transition-all duration-300"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                </svg>
                                Nueva pieza
                            </Link>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-3">
                        {mockPieces.map((piece, i) => (
                            <motion.div
                                key={piece.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.04 }}
                            >
                                <Link href={`/pieza/${piece.id}`} className="group flex items-center gap-4 p-4 rounded-lg bg-[#111111] border border-[#1F1F1F] hover:border-[#2A2A2A] transition-all duration-200">
                                    <div
                                        className="w-12 h-12 rounded-md flex items-center justify-center flex-shrink-0 text-lg"
                                        style={{
                                            background: piece.museo === "Museo del Mar"
                                                ? "rgba(14,58,83,0.2)"
                                                : "rgba(15,61,46,0.2)",
                                        }}
                                    >
                                        {piece.museo === "Museo del Mar" ? "🌊" : "👘"}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-heading font-semibold text-[#F0F0F0] text-sm group-hover:text-white transition-colors truncate">
                                            {piece.nombre}
                                        </p>
                                        <p className="font-mono text-[9px] tracking-widest text-[#606060] uppercase mt-0.5">
                                            {piece.categoria} · {piece.sala.split("–")[0].trim()}
                                        </p>
                                    </div>
                                    <span
                                        className="px-2 py-1 rounded font-mono text-[9px] uppercase tracking-widest flex-shrink-0"
                                        style={{
                                            background: piece.estado_conservacion === "Excelente"
                                                ? "#0F3D2E22"
                                                : piece.estado_conservacion === "Bueno"
                                                    ? "#0E3A5322"
                                                    : "#2A1F0022",
                                            color: piece.estado_conservacion === "Excelente"
                                                ? "#4FAD80"
                                                : piece.estado_conservacion === "Bueno"
                                                    ? "#5BA3C9"
                                                    : "#C9A35B",
                                        }}
                                    >
                                        {piece.estado_conservacion}
                                    </span>
                                    <svg className="w-4 h-4 text-[#404040] group-hover:text-[#606060] group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
