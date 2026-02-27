"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface HeroProps {
    title?: string;
    subtitle?: string;
    showButtons?: boolean;
    accentColor?: "teal" | "green";
    badge?: string;
}

export default function Hero({
    title = "Archivo Museográfico Digital",
    subtitle = "Registro, documentación y preservación del patrimonio material",
    showButtons = true,
    accentColor = "teal",
    badge,
}: HeroProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            alpha: number;
            size: number;
        }> = [];

        const color = accentColor === "teal" ? "14, 58, 83" : "15, 61, 46";

        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                alpha: Math.random() * 0.4 + 0.05,
                size: Math.random() * 1.5 + 0.5,
            });
        }

        let animId: number;
        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
                ctx.fill();
            });

            // Draw subtle connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${color}, ${0.05 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animId = requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", handleResize);
        };
    }, [accentColor]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Particle canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: 0.8 }}
            />

            {/* Radial glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        accentColor === "teal"
                            ? "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(14,58,83,0.12) 0%, transparent 70%)"
                            : "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(15,61,46,0.12) 0%, transparent 70%)",
                }}
            />

            {/* Grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.02]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                {badge && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 mb-8"
                    >
                        <span className="px-3 py-1 bg-[#111111] border border-[#2A2A2A] rounded-full font-mono text-[10px] tracking-widest uppercase text-[#606060]">
                            {badge}
                        </span>
                    </motion.div>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="font-heading font-bold text-5xl md:text-7xl text-[#F0F0F0] leading-[1.05] tracking-tight mb-6"
                >
                    {title.split(" ").map((word, i) => (
                        <span key={i}>
                            {i === 1 ? (
                                <span
                                    className={
                                        accentColor === "teal"
                                            ? "text-[#5BA3C9]"
                                            : "text-[#4FAD80]"
                                    }
                                >
                                    {word}{" "}
                                </span>
                            ) : (
                                `${word} `
                            )}
                        </span>
                    ))}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="font-body text-[#A0A0A0] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
                >
                    {subtitle}
                </motion.p>

                {showButtons && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/museo-del-mar"
                            className="group px-8 py-3.5 bg-[#0E3A53] hover:bg-[#1A5C83] text-[#F0F0F0] rounded font-body text-sm font-medium transition-all duration-300 flex items-center gap-2"
                        >
                            <span className="text-base">🌊</span>
                            Explorar Museo del Mar
                            <svg
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                        <Link
                            href="/museo-de-trajes"
                            className="group px-8 py-3.5 bg-[#0F3D2E] hover:bg-[#1A6B4E] text-[#F0F0F0] rounded font-body text-sm font-medium transition-all duration-300 flex items-center gap-2"
                        >
                            <span className="text-base">👘</span>
                            Explorar Museo de Trajes
                            <svg
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                        <Link
                            href="/login"
                            className="px-8 py-3.5 border border-[#2A2A2A] hover:border-[#3A3A3A] text-[#A0A0A0] hover:text-[#F0F0F0] rounded font-body text-sm transition-all duration-300"
                        >
                            Acceso Diseñadores
                        </Link>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="font-mono text-[10px] tracking-widest text-[#404040] uppercase">
                            Scroll
                        </span>
                        <div className="w-px h-12 bg-gradient-to-b from-[#404040] to-transparent" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
