"use client";

import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";

export default function PerfilPage() {
    return (
        <div className="min-h-screen bg-[#050505] flex">
            <Sidebar />
            <main className="flex-1 lg:ml-60 min-h-screen">
                <div className="px-6 lg:px-10 py-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="font-mono text-[10px] tracking-widest text-[#606060] uppercase mb-2">
                            Cuenta
                        </p>
                        <h1 className="font-heading font-bold text-3xl text-[#F0F0F0] mb-8">
                            Perfil
                        </h1>

                        <div className="max-w-lg space-y-6">
                            <div className="flex items-center gap-5 p-6 rounded-lg bg-[#111111] border border-[#1F1F1F]">
                                <div className="w-16 h-16 rounded-full bg-[#0E3A53] flex items-center justify-center flex-shrink-0">
                                    <span className="font-heading font-bold text-xl text-[#5BA3C9]">DV</span>
                                </div>
                                <div>
                                    <p className="font-heading font-semibold text-[#F0F0F0] text-lg">Diseñador Visual</p>
                                    <p className="font-mono text-[10px] tracking-widest text-[#606060] uppercase mt-1">diseñador@museo.co</p>
                                    <span className="inline-block mt-2 px-2 py-0.5 bg-[#0E3A53]/20 border border-[#0E3A53]/30 rounded font-mono text-[9px] tracking-widest text-[#5BA3C9] uppercase">
                                        Diseñador
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 rounded-lg bg-[#111111] border border-[#1F1F1F] space-y-4">
                                <h2 className="font-heading font-semibold text-[#F0F0F0] text-base">Información de cuenta</h2>
                                <div className="divider" />
                                {[
                                    { label: "Nombre completo", value: "Diseñador Visual" },
                                    { label: "Correo electrónico", value: "diseñador@museo.co" },
                                    { label: "Rol institucional", value: "Diseñador – Registro Museográfico" },
                                    { label: "Museo asignado", value: "Museo del Mar / Museo de Trajes" },
                                    { label: "Estado de cuenta", value: "Activo" },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex justify-between">
                                        <span className="label-mono">{label}</span>
                                        <span className="font-body text-[#A0A0A0] text-sm">{value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 rounded-lg bg-[#111111] border border-[#1F1F1F]">
                                <p className="font-mono text-[9px] tracking-widest text-[#404040] uppercase text-center">
                                    Para modificar datos de cuenta, contacta al administrador
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
