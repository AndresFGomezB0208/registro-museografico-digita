"use client";

import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { dashboardStats, mockPieces } from "@/lib/data";
import Link from "next/link";

const statCards = [
    {
        label: "Total registradas",
        value: dashboardStats.total,
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        ),
        color: "#5BA3C9",
        bg: "rgba(14,58,83,0.15)",
        border: "rgba(14,58,83,0.3)",
    },
    {
        label: "Pendientes revisión",
        value: dashboardStats.pendientes,
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        color: "#C9A35B",
        bg: "rgba(42,31,0,0.3)",
        border: "rgba(201,163,91,0.2)",
    },
    {
        label: "Aprobadas",
        value: dashboardStats.aprobadas,
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        color: "#4FAD80",
        bg: "rgba(15,61,46,0.2)",
        border: "rgba(15,61,46,0.4)",
    },
    {
        label: "Con observaciones",
        value: dashboardStats.observaciones,
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        color: "#AD4F4F",
        bg: "rgba(61,15,15,0.2)",
        border: "rgba(173,79,79,0.2)",
    },
];

export default function DashboardPage() {
    const recentPieces = mockPieces.slice(0, 5);

    return (
        <div className="min-h-screen bg-[#050505] flex">
            <Sidebar />

            {/* Main content – offset for sidebar */}
            <main className="flex-1 lg:ml-60 min-h-screen">
                <div className="px-6 lg:px-10 py-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-10"
                    >
                        <p className="font-mono text-[10px] tracking-widest text-[#606060] uppercase mb-2">
                            Panel de control
                        </p>
                        <div className="flex items-center justify-between">
                            <h1 className="font-heading font-bold text-3xl text-[#F0F0F0]">
                                Dashboard
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

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        {statCards.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                className="rounded-lg p-5"
                                style={{
                                    background: stat.bg,
                                    border: `1px solid ${stat.border}`,
                                }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span style={{ color: stat.color }}>{stat.icon}</span>
                                    <span
                                        className="font-heading font-bold text-2xl"
                                        style={{ color: stat.color }}
                                    >
                                        {stat.value}
                                    </span>
                                </div>
                                <p className="font-mono text-[9px] tracking-widest text-[#606060] uppercase">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent pieces */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-heading font-semibold text-lg text-[#F0F0F0]">
                                Registros recientes
                            </h2>
                            <Link
                                href="/dashboard/mis-registros"
                                className="font-body text-xs text-[#606060] hover:text-[#A0A0A0] transition-colors"
                            >
                                Ver todos →
                            </Link>
                        </div>

                        <div className="rounded-lg border border-[#1F1F1F] overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[#111111] border-b border-[#1F1F1F]">
                                        {["Pieza", "Museo", "Categoría", "Estado", "Sala"].map((h) => (
                                            <th key={h} className="px-4 py-3 text-left font-mono text-[9px] tracking-widest text-[#404040] uppercase">
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentPieces.map((piece, i) => (
                                        <tr
                                            key={piece.id}
                                            className="border-b border-[#1F1F1F] last:border-0 hover:bg-[#111111] transition-colors"
                                        >
                                            <td className="px-4 py-3">
                                                <Link
                                                    href={`/pieza/${piece.id}`}
                                                    className="font-body text-[#F0F0F0] text-sm hover:text-[#5BA3C9] transition-colors"
                                                >
                                                    {piece.nombre.length > 30
                                                        ? piece.nombre.substring(0, 30) + "…"
                                                        : piece.nombre}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="font-mono text-[10px] text-[#606060]">
                                                    {piece.museo === "Museo del Mar" ? "🌊 Mar" : "👘 Trajes"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="font-body text-[#A0A0A0] text-xs">
                                                    {piece.categoria}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-widest ${piece.estado_conservacion === "Excelente"
                                                            ? "bg-[#0F3D2E]/30 text-[#4FAD80] border border-[#0F3D2E]/50"
                                                            : piece.estado_conservacion === "Bueno"
                                                                ? "bg-[#0E3A53]/30 text-[#5BA3C9] border border-[#0E3A53]/50"
                                                                : piece.estado_conservacion === "Regular"
                                                                    ? "bg-[#2A1F00]/30 text-[#C9A35B] border border-[#C9A35B]/20"
                                                                    : "bg-[#3D0F0F]/30 text-[#AD4F4F] border border-[#AD4F4F]/20"
                                                        }`}
                                                >
                                                    {piece.estado_conservacion}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="font-body text-[#606060] text-xs">
                                                    {piece.sala.split("–")[0].trim()}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Quick links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {[
                            {
                                href: "/museo-del-mar",
                                icon: "🌊",
                                title: "Colección Mar",
                                desc: "Explorar piezas del Museo del Mar",
                                color: "#0E3A53",
                            },
                            {
                                href: "/museo-de-trajes",
                                icon: "👘",
                                title: "Colección Trajes",
                                desc: "Explorar piezas del Museo de Trajes",
                                color: "#0F3D2E",
                            },
                        ].map((card) => (
                            <Link
                                key={card.href}
                                href={card.href}
                                className="group flex items-center gap-4 p-5 rounded-lg bg-[#111111] border border-[#1F1F1F] hover:border-[#2A2A2A] transition-all duration-300"
                            >
                                <span className="text-2xl">{card.icon}</span>
                                <div>
                                    <p className="font-heading font-semibold text-[#F0F0F0] text-sm">
                                        {card.title}
                                    </p>
                                    <p className="font-body text-[#606060] text-xs mt-0.5">
                                        {card.desc}
                                    </p>
                                </div>
                                <svg
                                    className="w-4 h-4 ml-auto text-[#404040] group-hover:text-[#606060] group-hover:translate-x-1 transition-all"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
