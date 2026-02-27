"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PieceCard from "@/components/PieceCard";
import { getPiecesByMuseum } from "@/lib/data";

export default function MuseoDeTrajesPage() {
    const pieces = getPiecesByMuseum("Museo de Trajes");

    return (
        <div className="min-h-screen bg-[#050505]">
            <Navbar />

            {/* Page hero */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(15,61,46,0.12) 0%, transparent 70%)",
                    }}
                />
                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-2xl">👘</span>
                            <span className="font-mono text-[10px] tracking-widest text-[#606060] uppercase">
                                Colección permanente
                            </span>
                        </div>
                        <h1 className="font-heading font-bold text-5xl md:text-6xl text-[#F0F0F0] leading-tight mb-4">
                            Museo de Trajes
                        </h1>
                        <p className="font-body text-[#A0A0A0] text-lg max-w-2xl leading-relaxed mb-8">
                            Archivo textil de la diversidad cultural colombiana. Desde indumentaria prehispánica hasta la moda contemporánea que dialoga con las tradiciones ancestrales de comunidades indígenas y afrocolombianas.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {["Prehispánico", "Colonial", "Indígena", "Afrocolombiano", "Contemporáneo"].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1.5 bg-[#111111] border border-[#0F3D2E]/30 rounded font-mono text-[9px] tracking-widest text-[#4FAD80] uppercase"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="divider mx-6" />

            {/* Pieces grid */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <p className="font-mono text-[10px] tracking-widest text-[#606060] uppercase mb-1">
                                Colección
                            </p>
                            <h2 className="font-heading font-semibold text-xl text-[#F0F0F0]">
                                {pieces.length} piezas registradas
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pieces.map((piece, i) => (
                            <PieceCard key={piece.id} piece={piece} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            <footer className="border-t border-[#1F1F1F] py-8 px-6 mt-8">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-widest text-[#404040] uppercase">
                        Registro Museográfico Digital
                    </span>
                    <span className="font-mono text-[10px] tracking-widest text-[#404040] uppercase">
                        Museo de Trajes
                    </span>
                </div>
            </footer>
        </div>
    );
}
