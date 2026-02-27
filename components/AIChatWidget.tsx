"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Knowledge Base ────────────────────────────────────────────────────────────
// Editable FAQ / knowledge items. Each entry has keywords and a response.
const knowledgeBase = [
    {
        keywords: ["imagen", "foto", "fotografía", "resolución", "tamaño", "peso", "mb", "jpg", "png", "webp", "formato"],
        response: "¡Buena pregunta! 📸 Para las fotografías acepto **JPG, PNG y WebP**. El peso máximo es **10 MB por imagen** y recomiendo al menos **1200 × 900 px** en alta resolución. ¡Más nitidez = mejor ficha! ✨",
    },
    {
        keywords: ["categoría", "categorias", "tipo", "fósil", "fosil", "hueso", "animatrónico", "traje", "prehispánico", "colonial", "indígena"],
        response: "¡Las categorías dependen del museo! 🌊 **Museo del Mar**: Fósil, Hueso, Reconstrucción de ecosistema, Animatrónico, Reconstrucción animal.\n\n👘 **Museo de Trajes**: Traje prehispánico, Indumentaria colonial, Comunidades indígenas, Comunidades negras, Traje contemporáneo.\n\n¡Elige la que mejor describa tu pieza!",
    },
    {
        keywords: ["dimensión", "dimensiones", "medidas", "tamaño", "cm", "metro", "ancho", "largo", "alto", "peso"],
        response: "Para las dimensiones usa el formato **largo × ancho × alto** (ej: *142 cm × 38 cm × 22 cm*). Si es una prenda, basta con la longitud total. El peso va en **kg o gramos** según el caso. 📏",
    },
    {
        keywords: ["estado", "conservación", "condición", "daño", "deterioro"],
        response: "El estado de conservación tiene 4 niveles:\n\n✅ **Excelente** – Sin daños visibles\n🔵 **Bueno** – Desgaste mínimo natural\n🟡 **Regular** – Daños leves pero estable\n🔴 **Deteriorado** – Requiere intervención\n\n¡Sé honesto! Esto ayuda al equipo curatorial. 😊",
    },
    {
        keywords: ["publicar", "publicación", "guardar", "enviar", "registro", "proceso", "pasos", "cómo"],
        response: "¡Vamos a hacerlo juntos! 🚀 El proceso es:\n\n1️⃣ **Info general** – Nombre, museo, categoría\n2️⃣ **Descripción** – Contexto e historia\n3️⃣ **Materiales** – Agrega uno a uno\n4️⃣ **Datos técnicos** – Medidas y estado\n5️⃣ **Fotos** – Arrastra o selecciona\n6️⃣ **Observaciones** – Notas para el supervisor\n\nLuego haz clic en **Guardar Registro**. ¡Listo! ✨",
    },
    {
        keywords: ["error", "falla", "no funciona", "problema", "carga", "subir", "cargar"],
        response: "Ups, eso no suena bien 😕 Vamos a revisar:\n\n• ¿La imagen pesa más de 10 MB? Comprímela primero.\n• ¿Los campos obligatorios (*) están completos?\n• ¿Hay buena conexión a internet?\n\nSi el error persiste, contacta soporte en **admin@museo.co** 📧",
    },
    {
        keywords: ["material", "materiales", "agregar", "añadir", "ingrediente"],
        response: "¡Agrega los materiales uno por uno! ✏️ Escribe el nombre en el campo y presiona **Agregar** (o **Enter**). Ejemplos:\n• *Tumbaga*\n• *Algodón nativo*\n• *Resina de poliuretano*\n\nSi tienes muchos, ¡no te preocupes, puedes agregar todos los que quieras! 🎉",
    },
    {
        keywords: ["sala", "ubicación", "exhibición", "vitrina", "sección"],
        response: "La **Sala de exhibición** es donde está ubicada físicamente la pieza. Por ejemplo:\n• *Sala Cretácica – Sector A*\n• *Sala Colonial – Vitrina Central*\n\nSi aún no tiene sala asignada, puedes dejarlo en blanco o escribir *Por definir*. 🏛️",
    },
    {
        keywords: ["supervisor", "observación", "comentario", "revisión", "aprobación"],
        response: "Las **observaciones para supervisor** son mensajes directos al equipo curatorial. Úsalas para:\n• Señalar condiciones especiales de conservación\n• Indicar si la información está incompleta\n• Solicitar verificación de datos\n\n¡El supervisor revisará tu registro antes de aprobarlo! 👀",
    },
    {
        keywords: ["periodo", "período", "fecha", "año", "época", "historia"],
        response: "Para el **período histórico** puedes ser tan específico como quieras:\n• *Cretácico Superior* (fósiles)\n• *1400 d.C. (aprox.)* (piezas prehispánicas)\n• *Siglo XVIII* (colonial)\n• *Contemporáneo – 2022*\n\n¡La precisión ayuda mucho a los investigadores! 🔍",
    },
    {
        keywords: ["hola", "ayuda", "help", "inicio", "empezar", "comenzar", "nueva pieza"],
        response: "¡Hola! 👋 Soy **Muse**, tu asistente museográfica. Estoy aquí para ayudarte a registrar tus piezas paso a paso.\n\nPuedo ayudarte con:\n• 📸 Formatos de imagen\n• 📋 Categorías y campos\n• 📏 Medidas y dimensiones\n• ✅ Proceso de publicación\n• 🔧 Errores de carga\n\n¿Por dónde empezamos? 😊",
    },
    {
        keywords: ["soporte", "contacto", "admin", "administrador", "humano", "persona"],
        response: "Entiendo, a veces necesitas hablar con alguien directamente. 💬\n\nPuedes contactar al equipo en:\n📧 **admin@museo.co**\n\n¡Ellos responderán lo antes posible! Mientras tanto, cuéntame qué necesitas y veo si puedo ayudarte yo primero. 😊",
    },
];

// Frequently asked quick actions
const quickActions = [
    { label: "¿Cómo cargo una foto?", query: "imagen formato" },
    { label: "¿Qué categorías hay?", query: "categoría tipo" },
    { label: "¿Cómo es el proceso?", query: "publicar proceso pasos" },
    { label: "Tengo un error", query: "error problema" },
];

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

// ─── Helper: match knowledge base ──────────────────────────────────────────────
function getResponse(input: string): string {
    const lower = input.toLowerCase();
    for (const entry of knowledgeBase) {
        if (entry.keywords.some((kw) => lower.includes(kw))) {
            return entry.response;
        }
    }
    return "¡Hmm, esa es una pregunta muy interesante! 🤔 No tengo la respuesta exacta ahora, pero puedo ayudarte con temas de **imágenes, categorías, dimensiones, materiales o el proceso de publicación**.\n\nSi es algo muy específico, te recomiendo escribir al equipo en **admin@museo.co**. ¡Ellos te ayudarán enseguida! 💪";
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function AIChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "¡Hola! Soy **Muse** 👋 ¿Necesitas ayuda para registrar una pieza? ¡Vamos a hacerlo juntos! 🚀",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [unread, setUnread] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Scroll to bottom on new messages
    useEffect(() => {
        if (open) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            setUnread(0);
        }
    }, [messages, open]);

    // Focus input when opened
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [open]);

    const sendMessage = useCallback(async (text: string) => {
        const query = text.trim();
        if (!query) return;

        const userMsg: Message = {
            id: `u-${Date.now()}`,
            role: "user",
            content: query,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate thinking delay (150-600ms based on content)
        await new Promise((r) => setTimeout(r, 300 + Math.random() * 400));

        const responseText = getResponse(query);
        const assistantMsg: Message = {
            id: `a-${Date.now()}`,
            role: "assistant",
            content: responseText,
            timestamp: new Date(),
        };

        setIsTyping(false);
        setMessages((prev) => [...prev, assistantMsg]);
        if (!open) setUnread((n) => n + 1);
    }, [open]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        sendMessage(input);
    }

    // Simple markdown-ish renderer
    function renderContent(text: string) {
        const lines = text.split("\n");
        return lines.map((line, i) => {
            const rendered = line
                .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                .replace(/\*(.+?)\*/g, "<em>$1</em>");

            return (
                <span
                    key={i}
                    className="block"
                    dangerouslySetInnerHTML={{ __html: rendered || "&nbsp;" }}
                />
            );
        });
    }

    return (
        <>
            {/* Chat window */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="fixed bottom-24 right-4 sm:right-6 z-50 w-[340px] sm:w-[380px] rounded-2xl overflow-hidden shadow-2xl"
                        style={{
                            background: "#0F0F0F",
                            border: "1px solid #1F1F1F",
                            boxShadow: "0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(15,61,46,0.2)",
                        }}
                    >
                        {/* Header */}
                        <div
                            className="flex items-center gap-3 px-4 py-3 border-b border-[#1F1F1F]"
                            style={{
                                background: "linear-gradient(135deg, #0F1A0F 0%, #0F3D2E22 100%)",
                            }}
                        >
                            <div className="relative">
                                <div className="w-9 h-9 rounded-full bg-[#0F3D2E] flex items-center justify-center">
                                    <span className="text-base">🏛️</span>
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#4FAD80] rounded-full border-2 border-[#0F0F0F]" />
                            </div>
                            <div className="flex-1">
                                <p className="font-heading font-semibold text-[#F0F0F0] text-sm leading-none">
                                    Muse
                                </p>
                                <p className="font-mono text-[9px] tracking-widest text-[#4FAD80] uppercase mt-0.5">
                                    Asistente Museográfica · En línea
                                </p>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-[#606060] hover:text-[#A0A0A0] transition-colors p-1"
                                aria-label="Cerrar chat"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="h-72 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth" style={{ scrollbarWidth: "thin" }}>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    {msg.role === "assistant" && (
                                        <div className="w-6 h-6 rounded-full bg-[#0F3D2E] flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 text-xs">
                                            🏛️
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[80%] rounded-xl px-3 py-2.5 text-xs font-body leading-relaxed ${msg.role === "user"
                                                ? "bg-[#0F3D2E] text-[#E0F0E8] rounded-tr-sm"
                                                : "bg-[#181818] text-[#C0C0C0] rounded-tl-sm border border-[#2A2A2A]"
                                            }`}
                                    >
                                        {renderContent(msg.content)}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-6 h-6 rounded-full bg-[#0F3D2E] flex items-center justify-center text-xs flex-shrink-0">🏛️</div>
                                    <div className="bg-[#181818] border border-[#2A2A2A] rounded-xl rounded-tl-sm px-3 py-2.5 flex gap-1">
                                        {[0, 1, 2].map((i) => (
                                            <span
                                                key={i}
                                                className="w-1.5 h-1.5 bg-[#4FAD80] rounded-full animate-bounce"
                                                style={{ animationDelay: `${i * 0.15}s` }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick actions */}
                        {messages.length <= 1 && (
                            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                                {quickActions.map((action) => (
                                    <button
                                        key={action.label}
                                        onClick={() => sendMessage(action.query)}
                                        className="px-2.5 py-1 bg-[#181818] border border-[#2A2A2A] hover:border-[#0F3D2E]/60 hover:bg-[#0F3D2E]/10 rounded-full font-mono text-[9px] tracking-widest text-[#A0A0A0] hover:text-[#4FAD80] transition-all duration-200 uppercase"
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <form
                            onSubmit={handleSubmit}
                            className="flex items-center gap-2 px-4 py-3 border-t border-[#1F1F1F] bg-[#0A0A0A]"
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Escribe tu pregunta…"
                                className="flex-1 bg-[#181818] border border-[#2A2A2A] focus:border-[#0F3D2E]/60 text-[#F0F0F0] placeholder-[#404040] rounded-lg px-3 py-2 text-xs font-body outline-none transition-all"
                                style={{ boxShadow: "none" }}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isTyping}
                                className="w-8 h-8 rounded-lg bg-[#0F3D2E] hover:bg-[#1A6B4E] disabled:opacity-30 flex items-center justify-center text-[#4FAD80] transition-all duration-200 flex-shrink-0"
                                aria-label="Enviar mensaje"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="px-4 py-2 bg-[#0A0A0A] border-t border-[#1A1A1A]">
                            <p className="font-mono text-[8px] tracking-widest text-[#404040] uppercase text-center">
                                Muse · Asistente IA · Registro Museográfico Digital
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5, type: "spring", stiffness: 300, damping: 20 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen((prev) => !prev)}
                className="fixed bottom-4 right-4 sm:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all"
                style={{
                    background: open
                        ? "#0F3D2E"
                        : "linear-gradient(135deg, #0F3D2E 0%, #1A6B4E 100%)",
                    boxShadow: open
                        ? "0 0 0 2px #0F3D2E, 0 8px 24px rgba(15,61,46,0.5)"
                        : "0 0 0 2px rgba(15,61,46,0.4), 0 8px 24px rgba(15,61,46,0.4)",
                }}
                aria-label={open ? "Cerrar asistente" : "Abrir asistente Muse"}
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.span
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <svg className="w-5 h-5 text-[#4FAD80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.span>
                    ) : (
                        <motion.span
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-2xl"
                        >
                            🏛️
                        </motion.span>
                    )}
                </AnimatePresence>

                {/* Unread badge */}
                {unread > 0 && !open && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-[#4FAD80] rounded-full flex items-center justify-center"
                    >
                        <span className="font-mono text-[8px] font-bold text-[#050505]">{unread}</span>
                    </motion.div>
                )}

                {/* Pulse ring */}
                {!open && (
                    <span
                        className="absolute inset-0 rounded-full animate-ping opacity-20"
                        style={{ background: "#4FAD80" }}
                    />
                )}
            </motion.button>
        </>
    );
}
