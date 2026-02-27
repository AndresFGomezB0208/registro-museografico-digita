"use client";

import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import PieceForm from "@/components/PieceForm";

export default function NuevaPiezaPage() {
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
                            Registro museográfico
                        </p>
                        <h1 className="font-heading font-bold text-3xl text-[#F0F0F0] mb-2">
                            Nueva Pieza
                        </h1>
                        <p className="font-body text-[#606060] text-sm max-w-xl">
                            Completa la ficha de registro para incorporar una nueva pieza al archivo digital. Los campos marcados con (*) son obligatorios.
                        </p>
                    </motion.div>

                    <div className="divider mb-10" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        <PieceForm />
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
