"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const navItems = [
    {
        href: "/dashboard",
        label: "Dashboard",
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7h18M3 12h18M3 17h18" />
            </svg>
        ),
        exact: true,
    },
    {
        href: "/dashboard/nueva-pieza",
        label: "Nueva Pieza",
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
        ),
    },
    {
        href: "/dashboard/mis-registros",
        label: "Mis Registros",
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
    },
    {
        href: "/museo-del-mar",
        label: "Museo del Mar",
        icon: <span className="text-sm">🌊</span>,
    },
    {
        href: "/museo-de-trajes",
        label: "Museo de Trajes",
        icon: <span className="text-sm">👘</span>,
    },
];

const bottomItems = [
    {
        href: "/dashboard/perfil",
        label: "Perfil",
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    function isActive(href: string, exact = false) {
        if (exact) return pathname === href;
        return pathname.startsWith(href);
    }

    function handleLogout() {
        router.push("/");
    }

    return (
        <>
            {/* Mobile overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 z-40 lg:hidden"
                        onClick={() => setMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Mobile toggle */}
            <button
                className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-[#111111] border border-[#2A2A2A] rounded text-[#A0A0A0] hover:text-[#F0F0F0]"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle sidebar"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: collapsed ? 64 : 240 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`fixed left-0 top-0 h-full bg-[#0A0A0A] border-r border-[#1F1F1F] z-50 flex flex-col
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          transition-transform lg:transition-none`}
                style={{ width: collapsed ? 64 : 240 }}
            >
                {/* Logo */}
                <div className="h-16 flex items-center border-b border-[#1F1F1F] px-4">
                    {!collapsed && (
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-7 h-7 rounded-sm bg-gradient-to-br from-[#0E3A53] to-[#0F3D2E] flex-shrink-0 flex items-center justify-center">
                                <span className="text-[9px] font-mono text-[#A0A0A0]">RMD</span>
                            </div>
                            <div className="min-w-0">
                                <p className="text-[#F0F0F0] font-heading font-semibold text-xs leading-none truncate">
                                    Museográfico
                                </p>
                                <p className="text-[#606060] font-mono text-[9px] tracking-widest uppercase mt-0.5">
                                    Panel
                                </p>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className={`ml-auto text-[#404040] hover:text-[#A0A0A0] transition-colors lg:flex hidden ${collapsed ? "mx-auto" : ""}`}
                        aria-label="Toggle collapse"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {collapsed ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* User info */}
                {!collapsed && (
                    <div className="px-4 py-4 border-b border-[#1F1F1F]">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#0E3A53] flex items-center justify-center flex-shrink-0">
                                <span className="font-heading font-semibold text-xs text-[#5BA3C9]">DV</span>
                            </div>
                            <div className="min-w-0">
                                <p className="text-[#F0F0F0] font-body text-xs font-medium truncate">Diseñador Visual</p>
                                <p className="text-[#606060] font-mono text-[9px] truncate">diseñador@museo.co</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Nav items */}
                <nav className="flex-1 px-2 py-4 overflow-y-auto">
                    {!collapsed && (
                        <p className="px-2 mb-2 font-mono text-[9px] tracking-widest text-[#404040] uppercase">
                            Navegación
                        </p>
                    )}
                    <ul className="space-y-0.5">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    title={collapsed ? item.label : undefined}
                                    className={`flex items-center gap-3 px-2 py-2.5 rounded-md text-sm font-body transition-all duration-200 group
                    ${collapsed ? "justify-center" : ""}
                    ${isActive(item.href, item.exact)
                                            ? "bg-[#0E3A53]/20 text-[#5BA3C9] border border-[#0E3A53]/30"
                                            : "text-[#606060] hover:text-[#A0A0A0] hover:bg-[#181818]"
                                        }`}
                                >
                                    <span className="flex-shrink-0">{item.icon}</span>
                                    {!collapsed && <span>{item.label}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom items */}
                <div className="px-2 py-4 border-t border-[#1F1F1F]">
                    {bottomItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            title={collapsed ? item.label : undefined}
                            className={`flex items-center gap-3 px-2 py-2.5 rounded-md text-sm font-body transition-all duration-200
                ${collapsed ? "justify-center" : ""}
                ${isActive(item.href)
                                    ? "bg-[#0E3A53]/20 text-[#5BA3C9]"
                                    : "text-[#606060] hover:text-[#A0A0A0] hover:bg-[#181818]"
                                }`}
                        >
                            <span className="flex-shrink-0">{item.icon}</span>
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    ))}

                    <button
                        onClick={handleLogout}
                        title={collapsed ? "Cerrar sesión" : undefined}
                        className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-md text-sm font-body text-[#606060] hover:text-[#AD4F4F] hover:bg-[#3D0F0F]/20 transition-all duration-200 mt-0.5
              ${collapsed ? "justify-center" : ""}`}
                    >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {!collapsed && <span>Cerrar sesión</span>}
                    </button>
                </div>
            </motion.aside>
        </>
    );
}
