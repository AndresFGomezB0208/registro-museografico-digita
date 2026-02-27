"use client";

import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { getPieceById } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { use } from "react";

const estadoColors = {
    Excelente: { bg: "#0F3D2E22", border: "#0F3D2E55", text: "#4FAD80" },
    Bueno: { bg: "#0E3A5322", border: "#0E3A5355", text: "#5BA3C9" },
    Regular: { bg: "#2A1F0022", border: "#2A1F0055", text: "#C9A35B" },
    Deteriorado: { bg: "#3D0F0F22", border: "#3D0F0F55", text: "#AD4F4F" },
};

export default function PieceDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const piece = getPieceById(id);

    if (!piece) {
        notFound();
    }

    const estado = estadoColors[piece.estado_conservacion] || estadoColors["Bueno"];
    const isMar = piece.museo === "Museo del Mar";

    const fichaItems = [
        { label: "Período histórico", value: piece.periodo },
        { label: "Autor / Comunidad", value: piece.autor },
        ...(piece.comunidad ? [{ label: "Comunidad", value: piece.comunidad }] : []),
        { label: "Año aproximado", value: piece.anio_aproximado },
        { label: "Dimensiones", value: piece.dimensiones },
        { label: "Peso", value: piece.peso },
        { label: "Sala de exhibición", value: piece.sala },
    ];

    return (
        <div className="min-h-screen bg-[#050505]">
            <Navbar />

            {/* Breadcrumb */}
            <div className="pt-24 pb-0 px-6 max-w-6xl mx-auto">
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#404040] uppercase">
                    <Link href="/" className="hover:text-[#606060] transition-colors">Inicio</Link>
                    <span>/</span>
                    <Link
                        href={isMar ? "/museo-del-mar" : "/museo-de-trajes"}
                        className="hover:text-[#606060] transition-colors"
                    >
                        {piece.museo}
                    </Link>
                    <span>/</span>
                    <span className="text-[#606060]">{piece.nombre}</span>
                </div>
            </div>

            {/* Hero visual */}
            <section className="px-6 pt-8 pb-0">
                <div className="max-w-6xl mx-auto">
                    <div
                        className="w-full h-64 md:h-80 rounded-xl overflow-hidden relative"
                        style={{
                            background: isMar
                                ? "linear-gradient(135deg, #060D12 0%, #0E3A5330 50%, #060D12 100%)"
                                : "linear-gradient(135deg, #060D0A 0%, #0F3D2E30 50%, #060D0A 100%)",
                        }}
                    >
                        {/* Geometric art */}
                        <svg
                            className="absolute inset-0 w-full h-full opacity-15"
                            viewBox="0 0 900 320"
                            preserveAspectRatio="xMidYMid slice"
                        >
                            {isMar ? (
                                <>
                                    <circle cx="450" cy="160" r="100" fill="none" stroke="#0E3A53" strokeWidth="0.5" />
                                    <circle cx="450" cy="160" r="150" fill="none" stroke="#0E3A53" strokeWidth="0.3" />
                                    <circle cx="450" cy="160" r="200" fill="none" stroke="#0E3A53" strokeWidth="0.2" />
                                    <circle cx="450" cy="160" r="250" fill="none" stroke="#0E3A53" strokeWidth="0.15" />
                                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
                                        <line
                                            key={i}
                                            x1={450 + 100 * Math.cos((angle * Math.PI) / 180)}
                                            y1={160 + 100 * Math.sin((angle * Math.PI) / 180)}
                                            x2={450 + 250 * Math.cos((angle * Math.PI) / 180)}
                                            y2={160 + 250 * Math.sin((angle * Math.PI) / 180)}
                                            stroke="#0E3A53"
                                            strokeWidth="0.2"
                                        />
                                    ))}
                                </>
                            ) : (
                                <>
                                    <polygon points="450,20 820,280 80,280" fill="none" stroke="#0F3D2E" strokeWidth="0.5" />
                                    <polygon points="450,60 760,260 140,260" fill="none" stroke="#0F3D2E" strokeWidth="0.3" />
                                    <polygon points="450,100 700,240 200,240" fill="none" stroke="#0F3D2E" strokeWidth="0.2" />
                                    <line x1="450" y1="20" x2="450" y2="280" stroke="#0F3D2E" strokeWidth="0.3" />
                                </>
                            )}
                        </svg>

                        {/* Placeholders for images */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <span className="text-5xl opacity-20">
                                    {isMar ? "🌊" : "👘"}
                                </span>
                                <p className="font-mono text-[10px] tracking-widest text-[#404040] uppercase mt-3">
                                    Galería multimedia
                                </p>
                            </div>
                        </div>

                        {/* Category badge */}
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 bg-[#050505]/80 backdrop-blur-sm border border-[#2A2A2A] rounded font-mono text-[9px] tracking-widest text-[#606060] uppercase">
                                {piece.categoria}
                            </span>
                        </div>

                        {/* Museum badge */}
                        <div className="absolute top-4 right-4">
                            <span
                                className="px-3 py-1.5 rounded font-mono text-[9px] tracking-widest uppercase backdrop-blur-sm"
                                style={{
                                    background: isMar
                                        ? "rgba(14,58,83,0.3)"
                                        : "rgba(15,61,46,0.3)",
                                    border: `1px solid ${isMar ? "rgba(14,58,83,0.5)" : "rgba(15,61,46,0.5)"}`,
                                    color: isMar ? "#5BA3C9" : "#4FAD80",
                                }}
                            >
                                {piece.museo}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="px-6 py-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left: Description */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Title & Estado */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <h1 className="font-heading font-bold text-3xl md:text-4xl text-[#F0F0F0] leading-tight">
                                    {piece.nombre}
                                </h1>
                                <span
                                    className="flex-shrink-0 px-3 py-1.5 rounded font-mono text-[10px] uppercase tracking-widest mt-1"
                                    style={{
                                        background: estado.bg,
                                        border: `1px solid ${estado.border}`,
                                        color: estado.text,
                                    }}
                                >
                                    {piece.estado_conservacion}
                                </span>
                            </div>
                            <p className="font-body text-[#A0A0A0] text-base leading-relaxed">
                                {piece.descripcion}
                            </p>
                        </motion.div>

                        {/* Contexto histórico */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="font-mono text-[9px] tracking-widest text-[#606060] uppercase">01</span>
                                <div className="divider flex-1" />
                                <h2 className="font-heading font-semibold text-[#F0F0F0] text-base">Contexto histórico</h2>
                            </div>
                            <p className="font-body text-[#A0A0A0] text-sm leading-relaxed">
                                {piece.contexto_historico}
                            </p>
                        </motion.div>

                        {/* Proceso */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="font-mono text-[9px] tracking-widest text-[#606060] uppercase">02</span>
                                <div className="divider flex-1" />
                                <h2 className="font-heading font-semibold text-[#F0F0F0] text-base">Proceso de elaboración</h2>
                            </div>
                            <p className="font-body text-[#A0A0A0] text-sm leading-relaxed">
                                {piece.proceso_construccion}
                            </p>
                        </motion.div>

                        {/* Materiales */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="font-mono text-[9px] tracking-widest text-[#606060] uppercase">03</span>
                                <div className="divider flex-1" />
                                <h2 className="font-heading font-semibold text-[#F0F0F0] text-base">Materiales</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {piece.materiales.map((mat) => (
                                    <span
                                        key={mat}
                                        className="px-3 py-1.5 bg-[#181818] border border-[#2A2A2A] rounded font-mono text-[10px] text-[#A0A0A0]"
                                    >
                                        {mat}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Observaciones curatoriales */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="font-mono text-[9px] tracking-widest text-[#606060] uppercase">04</span>
                                <div className="divider flex-1" />
                                <h2 className="font-heading font-semibold text-[#F0F0F0] text-base">Observaciones curatoriales</h2>
                            </div>
                            <div className="p-4 rounded-lg bg-[#111111] border border-[#1F1F1F]">
                                <p className="font-body text-[#A0A0A0] text-sm leading-relaxed italic">
                                    "{piece.notas_curatoriales}"
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Ficha técnica */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="rounded-lg bg-[#111111] border border-[#1F1F1F] overflow-hidden"
                        >
                            <div className="px-5 py-4 border-b border-[#1F1F1F]">
                                <p className="font-mono text-[10px] tracking-widest text-[#606060] uppercase">
                                    Ficha técnica
                                </p>
                            </div>
                            <div className="divide-y divide-[#1F1F1F]">
                                {fichaItems.map(({ label, value }) => (
                                    <div key={label} className="px-5 py-3">
                                        <p className="label-mono mb-1">{label}</p>
                                        <p className="font-body text-[#A0A0A0] text-sm">
                                            {value || "—"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* ID pieza */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            className="rounded-lg bg-[#111111] border border-[#1F1F1F] px-5 py-4"
                        >
                            <p className="label-mono mb-1">ID de registro</p>
                            <p className="font-mono text-[#5BA3C9] text-sm">{piece.id}</p>
                        </motion.div>

                        {/* Back link */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <Link
                                href={isMar ? "/museo-del-mar" : "/museo-de-trajes"}
                                className="flex items-center gap-2 text-[#606060] hover:text-[#A0A0A0] font-body text-sm transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Volver a la colección
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
