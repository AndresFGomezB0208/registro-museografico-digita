"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showReset, setShowReset] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Simulated authentication
        await new Promise((r) => setTimeout(r, 1000));

        if (form.email && form.password.length >= 6) {
            router.push("/dashboard");
        } else {
            setError("Credenciales incorrectas. Verifica tu email y contraseña.");
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-[#050505] flex">
            {/* Left panel – decorative */}
            <div className="hidden lg:flex flex-1 relative overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(135deg, #050505 0%, #0E3A5315 50%, #050505 100%)",
                    }}
                />
                {/* Geometric art */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-10"
                    viewBox="0 0 600 800"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <circle cx="300" cy="400" r="200" fill="none" stroke="#0E3A53" strokeWidth="0.5" />
                    <circle cx="300" cy="400" r="280" fill="none" stroke="#0E3A53" strokeWidth="0.3" />
                    <circle cx="300" cy="400" r="360" fill="none" stroke="#0E3A53" strokeWidth="0.2" />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                        <line
                            key={i}
                            x1={300 + 200 * Math.cos((angle * Math.PI) / 180)}
                            y1={400 + 200 * Math.sin((angle * Math.PI) / 180)}
                            x2={300 + 360 * Math.cos((angle * Math.PI) / 180)}
                            y2={400 + 360 * Math.sin((angle * Math.PI) / 180)}
                            stroke="#0E3A53"
                            strokeWidth="0.3"
                        />
                    ))}
                </svg>

                <div className="relative z-10 flex flex-col justify-center px-16">
                    <Link href="/" className="flex items-center gap-3 mb-16">
                        <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#0E3A53] to-[#0F3D2E]" />
                        <span className="font-heading font-semibold text-[#F0F0F0] text-sm">
                            Registro Museográfico Digital
                        </span>
                    </Link>

                    <p className="font-mono text-[10px] tracking-widest text-[#606060] uppercase mb-4">
                        Panel institucional
                    </p>
                    <h1 className="font-heading font-bold text-4xl text-[#F0F0F0] leading-tight mb-6">
                        Acceso al sistema<br />
                        <span className="text-[#5BA3C9]">curatorial</span>
                    </h1>
                    <p className="font-body text-[#606060] text-base leading-relaxed max-w-md">
                        Plataforma restringida para diseñadores y supervisores del sistema de registro museográfico.
                    </p>

                    <div className="mt-12 space-y-4">
                        {["Registro de nuevas piezas", "Revisión de colecciones", "Gestión de multimedia", "Exportación de fichas"].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                                <div className="w-1 h-1 rounded-full bg-[#0E3A53]" />
                                <span className="font-body text-[#606060] text-sm">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right panel – form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="w-full max-w-sm"
                >
                    {/* Mobile logo */}
                    <div className="lg:hidden mb-12 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#0E3A53] to-[#0F3D2E]" />
                        <span className="font-heading font-semibold text-[#F0F0F0] text-sm">
                            Registro Museográfico Digital
                        </span>
                    </div>

                    {!showReset ? (
                        <>
                            <div className="mb-8">
                                <p className="font-mono text-[10px] tracking-widest text-[#606060] uppercase mb-2">
                                    Autenticación
                                </p>
                                <h2 className="font-heading font-bold text-2xl text-[#F0F0F0]">
                                    Iniciar sesión
                                </h2>
                            </div>

                            {error && (
                                <div className="mb-4 p-3 rounded-lg bg-[#3D0F0F]/30 border border-[#3D0F0F]/60 text-[#AD4F4F] font-body text-xs">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="label-mono block mb-2">Correo electrónico</label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                                        placeholder="diseñador@museo.co"
                                        required
                                        autoComplete="email"
                                    />
                                </div>

                                <div>
                                    <label className="label-mono block mb-2">Contraseña</label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={form.password}
                                        onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                                        placeholder="••••••••"
                                        required
                                        autoComplete="current-password"
                                        minLength={6}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-[#0E3A53] hover:bg-[#1A5C83] disabled:opacity-50 text-[#F0F0F0] rounded font-body text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 mt-2"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Verificando…
                                        </>
                                    ) : (
                                        "Ingresar al panel"
                                    )}
                                </button>
                            </form>

                            <button
                                onClick={() => setShowReset(true)}
                                className="mt-6 w-full text-center font-body text-xs text-[#606060] hover:text-[#A0A0A0] transition-colors"
                            >
                                Recuperar acceso
                            </button>

                            <div className="mt-8 pt-6 border-t border-[#1F1F1F]">
                                <p className="font-mono text-[9px] tracking-widest text-[#404040] uppercase text-center">
                                    Acceso restringido · Sistema institucional
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mb-8">
                                <button
                                    onClick={() => setShowReset(false)}
                                    className="flex items-center gap-2 text-[#606060] hover:text-[#A0A0A0] font-body text-sm mb-6 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Volver
                                </button>
                                <p className="font-mono text-[10px] tracking-widest text-[#606060] uppercase mb-2">
                                    Recuperación
                                </p>
                                <h2 className="font-heading font-bold text-2xl text-[#F0F0F0]">
                                    Recuperar acceso
                                </h2>
                            </div>

                            <div className="p-4 rounded-lg bg-[#111111] border border-[#2A2A2A]">
                                <p className="font-body text-[#A0A0A0] text-sm leading-relaxed">
                                    Para recuperar acceso, contacta al administrador del sistema en{" "}
                                    <span className="text-[#5BA3C9] font-mono">admin@museo.co</span>
                                </p>
                            </div>
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
