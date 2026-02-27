"use client";

import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import MuseumCard from "@/components/MuseumCard";
import { getPiecesByMuseum } from "@/lib/data";

export default function HomePage() {
    const marPieces = getPiecesByMuseum("Museo del Mar");
    const trajesPieces = getPiecesByMuseum("Museo de Trajes");

    return (
        <div className="min-h-screen bg-[#050505]">
            <Navbar />

            {/* Hero section */}
            <Hero
                title="Archivo Museográfico Digital"
                subtitle="Registro, documentación y preservación del patrimonio material de los museos colombianos"
                showButtons={true}
                accentColor="teal"
                badge="Plataforma Institucional"
            />

            {/* Museums grid */}
            <section className="relative pt-8 pb-32 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16 text-center"
                    >
                        <p className="font-mono text-[10px] tracking-widest text-[#606060] uppercase mb-4">
                            — Nuestras colecciones —
                        </p>
                        <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#F0F0F0]">
                            Dos patrimonios,<br />
                            <span className="text-[#5BA3C9]">un solo archivo</span>
                        </h2>
                    </motion.div>

                    {/* Dual museum cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MuseumCard
                            type="mar"
                            description="Colección de fósiles marinos, reconstrucciones paleontológicas y animatrónicos del período Cretácico colombiano. Una ventana al océano de hace 75 millones de años."
                            piecesCount={marPieces.length}
                        />
                        <MuseumCard
                            type="trajes"
                            description="Archivo textil de la diversidad cultural colombiana. Desde atuendos prehispánicos hasta la alta costura contemporánea que dialoga con la tradición ancestral."
                            piecesCount={trajesPieces.length}
                        />
                    </div>

                    {/* Stats row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1F1F1F] rounded-lg overflow-hidden border border-[#1F1F1F]"
                    >
                        {[
                            { label: "Piezas registradas", value: `${marPieces.length + trajesPieces.length}+` },
                            { label: "Categorías documentadas", value: "10" },
                            { label: "Períodos históricos", value: "5+" },
                            { label: "Años de historia", value: "75M" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-[#111111] px-6 py-8 text-center">
                                <p className="font-heading font-bold text-3xl text-[#F0F0F0] mb-1">
                                    {stat.value}
                                </p>
                                <p className="font-mono text-[9px] tracking-widest text-[#606060] uppercase">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-[#1F1F1F] py-8 px-6">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-sm bg-gradient-to-br from-[#0E3A53] to-[#0F3D2E]" />
                        <span className="font-mono text-[10px] tracking-widest text-[#404040] uppercase">
                            Registro Museográfico Digital
                        </span>
                    </div>
                    <p className="font-mono text-[10px] tracking-widest text-[#404040] uppercase">
                        Patrimonio cultural colombiano
                    </p>
                </div>
            </footer>
        </div>
    );
}
