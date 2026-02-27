"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface NavbarProps {
    isDashboard?: boolean;
}

export default function Navbar({ isDashboard = false }: NavbarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/", label: "Inicio" },
        { href: "/museo-del-mar", label: "Museo del Mar" },
        { href: "/museo-de-trajes", label: "Museo de Trajes" },
    ];

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-[#050505]/90 backdrop-blur-md border-b border-[#1F1F1F]"
                    : "bg-transparent"
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#0E3A53] to-[#0F3D2E] flex items-center justify-center">
                        <span className="text-xs font-mono font-medium text-[#A0A0A0]">
                            RMD
                        </span>
                    </div>
                    <div>
                        <p className="text-[#F0F0F0] font-heading font-semibold text-sm leading-none">
                            Registro Museográfico
                        </p>
                        <p className="text-[#606060] font-mono text-[10px] tracking-widest uppercase mt-0.5">
                            Digital
                        </p>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-body transition-colors duration-200 ${pathname === link.href
                                    ? "text-[#F0F0F0]"
                                    : "text-[#606060] hover:text-[#A0A0A0]"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="/login"
                        className="px-4 py-2 text-sm font-body text-[#A0A0A0] hover:text-[#F0F0F0] transition-colors duration-200"
                    >
                        Acceso
                    </Link>
                    <Link
                        href="/login"
                        className="px-4 py-2 text-sm font-body text-[#F0F0F0] bg-[#0E3A53] hover:bg-[#1A5C83] rounded transition-colors duration-200"
                    >
                        Panel Diseñador
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-[#A0A0A0] hover:text-[#F0F0F0]"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {menuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-[#111111] border-t border-[#1F1F1F] px-6 py-4"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="block py-3 text-sm text-[#A0A0A0] hover:text-[#F0F0F0] border-b border-[#1F1F1F] last:border-0"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/login"
                        className="block mt-4 py-3 text-sm text-center text-[#F0F0F0] bg-[#0E3A53] rounded"
                        onClick={() => setMenuOpen(false)}
                    >
                        Panel Diseñador
                    </Link>
                </motion.div>
            )}
        </motion.header>
    );
}
