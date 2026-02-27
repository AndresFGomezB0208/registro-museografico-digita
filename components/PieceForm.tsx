"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createPiece, type Piece } from "@/lib/api";

const MUSEOS = ["Museo del Mar", "Museo de Trajes"] as const;

const CATEGORIAS: Record<string, string[]> = {
    "Museo del Mar": [
        "Fósil",
        "Hueso",
        "Reconstrucción de ecosistema",
        "Animatrónico",
        "Reconstrucción animal",
        "Otro",
    ],
    "Museo de Trajes": [
        "Traje prehispánico de Colombia",
        "Indumentaria colonial",
        "Comunidades indígenas",
        "Comunidades negras tradicionales",
        "Traje contemporáneo",
        "Otro",
    ],
};

const ESTADOS = [
    "Excelente",
    "Bueno",
    "Regular",
    "Deteriorado",
] as const;

const initialForm: Partial<Piece> = {
    museo: "Museo del Mar",
    categoria: "",
    nombre: "",
    descripcion: "",
    contexto_historico: "",
    proceso_construccion: "",
    materiales: [],
    estado_conservacion: "Bueno",
    dimensiones: "",
    peso: "",
    imagenes: [],
    notas_internas: "",
    comentarios_supervisor: "",
    metadata: {
        autor: "",
        periodo: "",
        sala: "",
        comunidad: "",
        anio_aproximado: "",
    },
};

export default function PieceForm() {
    const [form, setForm] = useState<Partial<Piece>>(initialForm);
    const [materialesInput, setMaterialesInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [dragOver, setDragOver] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<{ file: File; preview: string }[]>([]);
    const [uploadingStage, setUploadingStage] = useState("");

    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) {
        const { name, value } = e.target;
        if (name.startsWith("metadata.")) {
            const key = name.split(".")[1];
            setForm((prev) => ({
                ...prev,
                metadata: { ...prev.metadata, [key]: value } as Piece["metadata"],
            }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    }

    function addMaterial() {
        const trimmed = materialesInput.trim();
        if (trimmed && !(form.materiales || []).includes(trimmed)) {
            setForm((prev) => ({
                ...prev,
                materiales: [...(prev.materiales || []), trimmed],
            }));
            setMaterialesInput("");
        }
    }

    function removeMaterial(mat: string) {
        setForm((prev) => ({
            ...prev,
            materiales: (prev.materiales || []).filter((m) => m !== mat),
        }));
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        setDragOver(false);
        const files = Array.from(e.dataTransfer.files).filter((f) =>
            f.type.startsWith("image/")
        );
        const newFiles = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setSelectedFiles((prev) => [...prev, ...newFiles]);
    }

    function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files || []);
        const newFiles = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setSelectedFiles((prev) => [...prev, ...newFiles]);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);
        setUploadingStage("");

        try {
            // ─── 1. Subir imágenes directamente a Cloudflare (Client-side) ───
            const imageUrls: string[] = [];

            if (selectedFiles.length > 0) {
                for (let i = 0; i < selectedFiles.length; i++) {
                    setUploadingStage(`Subiendo imagen ${i + 1} de ${selectedFiles.length}…`);
                    const { file } = selectedFiles[i];

                    const formData = new FormData();
                    formData.append("file", file);

                    // Client-side direct upload using Cloudflare Images URL
                    // Note: Exposing API Token client-side is INSECURE and only done here
                    // as an emergency workaround for pure static GitHub Pages deployment.
                    const cfRes = await fetch(
                        `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CF_ACCOUNT_ID}/images/v1`,
                        {
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_CF_API_TOKEN}`,
                            },
                            body: formData,
                        }
                    );

                    const cfData = await cfRes.json() as { success: boolean; result?: { id: string }, errors?: { message: string }[] };

                    if (!cfRes.ok || !cfData.success) {
                        throw new Error(`Error en imagen ${i + 1}: ${cfData.errors?.[0]?.message || 'Error desconocido'}`);
                    }

                    const deliveryBase =
                        process.env.NEXT_PUBLIC_CF_IMAGE_DELIVERY ||
                        `https://imagedelivery.net/${process.env.NEXT_PUBLIC_CF_ACCOUNT_ID}`;

                    imageUrls.push(`${deliveryBase}/${cfData.result!.id}/public`);
                }
            }

            // ─── 2. Crear el registro en n8n con las URLs finales ───
            setUploadingStage("Registrando pieza en n8n…");
            const result = await createPiece({
                ...(form as Piece),
                imagenes: imageUrls,
            });

            if (result.success) {
                setSuccess(true);
                setForm(initialForm);
                // Liberar los object URLs de memoria
                selectedFiles.forEach((sf) => URL.revokeObjectURL(sf.preview));
                setSelectedFiles([]);
                setMaterialesInput("");
            } else {
                setError(result.error || "Error al guardar el registro.");
            }
        } catch (err: any) {
            setError(err.message || "Error inesperado. Intenta nuevamente.");
        } finally {
            setLoading(false);
            setUploadingStage("");
        }
    }

    const categorias = CATEGORIAS[form.museo || "Museo del Mar"] || [];

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            {/* Success message */}
            {success && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-[#0F3D2E]/30 border border-[#0F3D2E]/60 text-[#4FAD80] font-body text-sm"
                >
                    ✓ Registro guardado exitosamente. Pendiente de revisión por supervisor.
                </motion.div>
            )}

            {error && (
                <div className="p-4 rounded-lg bg-[#3D0F0F]/30 border border-[#3D0F0F]/60 text-[#AD4F4F] font-body text-sm">
                    {error}
                </div>
            )}

            {/* Section: Información general */}
            <section>
                <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono text-[10px] tracking-widest text-[#606060] uppercase">
                        01
                    </span>
                    <div className="divider flex-1" />
                    <h2 className="font-heading font-semibold text-[#F0F0F0] text-base">
                        Información General
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="label-mono block mb-2">Nombre de la pieza *</label>
                        <input
                            type="text"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            placeholder="Ej: Cráneo de Mosasaurio"
                            required
                        />
                    </div>

                    <div>
                        <label className="label-mono block mb-2">Museo *</label>
                        <select
                            name="museo"
                            value={form.museo}
                            onChange={handleChange}
                            required
                        >
                            {MUSEOS.map((m) => (
                                <option key={m} value={m}>
                                    {m}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="label-mono block mb-2">Categoría *</label>
                        <select
                            name="categoria"
                            value={form.categoria}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccionar…</option>
                            {categorias.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="label-mono block mb-2">Período histórico</label>
                        <input
                            type="text"
                            name="metadata.periodo"
                            value={form.metadata?.periodo}
                            onChange={handleChange}
                            placeholder="Ej: Cretácico Superior"
                        />
                    </div>

                    <div>
                        <label className="label-mono block mb-2">Comunidad / Autor</label>
                        <input
                            type="text"
                            name="metadata.autor"
                            value={form.metadata?.autor}
                            onChange={handleChange}
                            placeholder="Ej: Pueblo Muisca"
                        />
                    </div>

                    <div>
                        <label className="label-mono block mb-2">Año aproximado</label>
                        <input
                            type="text"
                            name="metadata.anio_aproximado"
                            value={form.metadata?.anio_aproximado}
                            onChange={handleChange}
                            placeholder="Ej: 1400 d.C. (aprox.)"
                        />
                    </div>
                </div>
            </section>

            {/* Section: Descripción */}
            <section>
                <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono text-[10px] tracking-widest text-[#606060] uppercase">
                        02
                    </span>
                    <div className="divider flex-1" />
                    <h2 className="font-heading font-semibold text-[#F0F0F0] text-base">
                        Descripción
                    </h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="label-mono block mb-2">Descripción general *</label>
                        <textarea
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            placeholder="Descripción detallada de la pieza..."
                            rows={4}
                            required
                            style={{ resize: "vertical" }}
                        />
                    </div>

                    <div>
                        <label className="label-mono block mb-2">Contexto histórico</label>
                        <textarea
                            name="contexto_historico"
                            value={form.contexto_historico}
                            onChange={handleChange}
                            placeholder="Contexto cultural e histórico de la pieza..."
                            rows={3}
                            style={{ resize: "vertical" }}
                        />
                    </div>

                    <div>
                        <label className="label-mono block mb-2">Proceso de construcción / hallazgo</label>
                        <textarea
                            name="proceso_construccion"
                            value={form.proceso_construccion}
                            onChange={handleChange}
                            placeholder="Técnicas de elaboración o proceso de extracción..."
                            rows={3}
                            style={{ resize: "vertical" }}
                        />
                    </div>
                </div>
            </section>

            {/* Section: Materiales */}
            <section>
                <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono text-[10px] tracking-widest text-[#606060] uppercase">
                        03
                    </span>
                    <div className="divider flex-1" />
                    <h2 className="font-heading font-semibold text-[#F0F0F0] text-base">
                        Materiales
                    </h2>
                </div>

                <div className="flex gap-2 mb-3">
                    <input
                        type="text"
                        value={materialesInput}
                        onChange={(e) => setMaterialesInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                addMaterial();
                            }
                        }}
                        placeholder="Ej: Tumbaga, Algodón nativo…"
                        className="flex-1"
                    />
                    <button
                        type="button"
                        onClick={addMaterial}
                        className="px-4 py-2 bg-[#0E3A53] text-[#F0F0F0] rounded text-sm font-body hover:bg-[#1A5C83] transition-colors"
                    >
                        Agregar
                    </button>
                </div>

                {(form.materiales || []).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {(form.materiales || []).map((mat) => (
                            <span
                                key={mat}
                                className="flex items-center gap-2 px-3 py-1.5 bg-[#181818] border border-[#2A2A2A] rounded font-mono text-xs text-[#A0A0A0]"
                            >
                                {mat}
                                <button
                                    type="button"
                                    onClick={() => removeMaterial(mat)}
                                    className="text-[#606060] hover:text-[#AD4F4F] transition-colors"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </section>

            {/* Section: Técnico */}
            <section>
                <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono text-[10px] tracking-widest text-[#606060] uppercase">
                        04
                    </span>
                    <div className="divider flex-1" />
                    <h2 className="font-heading font-semibold text-[#F0F0F0] text-base">
                        Datos Técnicos
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="label-mono block mb-2">Dimensiones</label>
                        <input
                            type="text"
                            name="dimensiones"
                            value={form.dimensiones}
                            onChange={handleChange}
                            placeholder="Ej: 142 cm × 38 cm × 22 cm"
                        />
                    </div>

                    <div>
                        <label className="label-mono block mb-2">Peso</label>
                        <input
                            type="text"
                            name="peso"
                            value={form.peso}
                            onChange={handleChange}
                            placeholder="Ej: 48 kg"
                        />
                    </div>

                    <div>
                        <label className="label-mono block mb-2">Estado de conservación *</label>
                        <select
                            name="estado_conservacion"
                            value={form.estado_conservacion}
                            onChange={handleChange}
                            required
                        >
                            {ESTADOS.map((e) => (
                                <option key={e} value={e}>
                                    {e}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="label-mono block mb-2">Sala de exhibición</label>
                        <input
                            type="text"
                            name="metadata.sala"
                            value={form.metadata?.sala}
                            onChange={handleChange}
                            placeholder="Ej: Sala Cretácica – Sector A"
                        />
                    </div>
                </div>
            </section>

            {/* Section: Multimedia */}
            <section>
                <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono text-[10px] tracking-widest text-[#606060] uppercase">
                        05
                    </span>
                    <div className="divider flex-1" />
                    <h2 className="font-heading font-semibold text-[#F0F0F0] text-base">
                        Fotografías
                    </h2>
                </div>

                <div
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 mb-4
            ${dragOver
                            ? "border-[#0E3A53] bg-[#0E3A53]/10"
                            : "border-[#2A2A2A] bg-[#111111]"
                        }`}
                >
                    <div className="flex flex-col items-center gap-3">
                        <svg
                            className={`w-10 h-10 transition-colors ${dragOver ? "text-[#5BA3C9]" : "text-[#404040]"
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <p className="font-body text-[#606060] text-sm">
                            Arrastra imágenes aquí o{" "}
                            <label className="text-[#5BA3C9] cursor-pointer hover:text-[#7BC3E0] underline">
                                selecciona archivos
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={handleFileInput}
                                />
                            </label>
                        </p>
                        <p className="font-mono text-[9px] tracking-widest text-[#404040] uppercase">
                            JPG, PNG, WebP – Máximo 10 MB por imagen
                        </p>
                    </div>
                </div>

                {selectedFiles.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {selectedFiles.map((sf, i) => (
                            <div key={i} className="relative group aspect-square rounded-md overflow-hidden bg-[#181818] border border-[#2A2A2A]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={sf.preview}
                                    alt={`Fotografía ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        URL.revokeObjectURL(sf.preview);
                                        setSelectedFiles((prev) => prev.filter((_, idx) => idx !== i));
                                    }}
                                    className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity text-[#AD4F4F] text-lg"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Section: Observaciones */}
            <section>
                <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono text-[10px] tracking-widest text-[#606060] uppercase">
                        06
                    </span>
                    <div className="divider flex-1" />
                    <h2 className="font-heading font-semibold text-[#F0F0F0] text-base">
                        Observaciones
                    </h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="label-mono block mb-2">Notas internas</label>
                        <textarea
                            name="notas_internas"
                            value={form.notas_internas}
                            onChange={handleChange}
                            placeholder="Notas de uso interno del equipo..."
                            rows={3}
                            style={{ resize: "vertical" }}
                        />
                    </div>

                    <div>
                        <label className="label-mono block mb-2">Comentarios para supervisor</label>
                        <textarea
                            name="comentarios_supervisor"
                            value={form.comentarios_supervisor}
                            onChange={handleChange}
                            placeholder="Observaciones que requieren revisión del supervisor..."
                            rows={3}
                            style={{ resize: "vertical" }}
                        />
                    </div>
                </div>
            </section>

            {/* Submit */}
            <div className="flex items-center justify-between pt-4 border-t border-[#1F1F1F]">
                <p className="font-mono text-[10px] tracking-widest text-[#404040] uppercase">
                    * Campos obligatorios
                </p>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-3 px-8 py-3 bg-[#0E3A53] hover:bg-[#1A5C83] disabled:opacity-50 text-[#F0F0F0] rounded font-body text-sm font-medium transition-all duration-300"
                >
                    {loading ? (
                        <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            {uploadingStage || "Guardando…"}
                        </>
                    ) : (
                        <>
                            Guardar Registro
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                            </svg>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
