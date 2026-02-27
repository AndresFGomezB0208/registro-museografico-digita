// lib/api.ts
// Integración activa con n8n webhook

export interface PieceMetadata {
    autor: string;
    periodo: string;
    sala: string;
    comunidad?: string;
    anio_aproximado?: string;
}

export interface Piece {
    id?: string;
    museo: "Museo del Mar" | "Museo de Trajes";
    categoria: string;
    nombre: string;
    descripcion: string;
    contexto_historico?: string;
    proceso_construccion?: string;
    materiales: string[];
    estado_conservacion: string;
    dimensiones?: string;
    peso?: string;
    imagenes: string[];
    notas_internas?: string;
    comentarios_supervisor?: string;
    metadata: PieceMetadata;
}

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

// ─── n8n Webhook ────────────────────────────────────────────────────────────
const N8N_WEBHOOK =
    "https://andreshark02.app.n8n.cloud/webhook/c2d3d68a-ae60-46ea-9a02-d09d2aa25570";

/**
 * Crea un nuevo registro de pieza museográfica.
 * Envía todos los campos al webhook de n8n en formato JSON.
 */
export async function createPiece(piece: Piece): Promise<ApiResponse<Piece>> {
    const pieceId = `piece_${Date.now()}`;

    // Payload completo con todos los campos del formulario
    const payload = {
        // Identificador generado
        id: pieceId,
        timestamp: new Date().toISOString(),

        // Información general
        museo: piece.museo,
        categoria: piece.categoria,
        nombre: piece.nombre,

        // Descripción
        descripcion: piece.descripcion,
        contexto_historico: piece.contexto_historico ?? "",
        proceso_construccion: piece.proceso_construccion ?? "",

        // Materiales
        materiales: piece.materiales,

        // Datos técnicos
        estado_conservacion: piece.estado_conservacion,
        dimensiones: piece.dimensiones ?? "",
        peso: piece.peso ?? "",

        // Multimedia (base64 data URIs o rutas)
        imagenes: piece.imagenes,

        // Observaciones
        notas_internas: piece.notas_internas ?? "",
        comentarios_supervisor: piece.comentarios_supervisor ?? "",

        // Metadata
        metadata: {
            autor: piece.metadata.autor,
            periodo: piece.metadata.periodo,
            sala: piece.metadata.sala,
            comunidad: piece.metadata.comunidad ?? "",
            anio_aproximado: piece.metadata.anio_aproximado ?? "",
        },
    };

    try {
        const res = await fetch(N8N_WEBHOOK, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errorText = await res.text().catch(() => "Sin detalle");
            console.error("[n8n] Error de webhook:", res.status, errorText);
            return {
                success: false,
                error: `Error al enviar registro (${res.status}). Intenta nuevamente.`,
            };
        }

        console.log("[n8n] Registro enviado correctamente:", pieceId);
        return {
            success: true,
            data: { ...piece, id: pieceId },
        };
    } catch (error) {
        console.error("[n8n] Error de red:", error);
        return {
            success: false,
            error:
                "No se pudo conectar con el servidor. Verifica tu conexión e intenta nuevamente.",
        };
    }
}

/**
 * Obtiene todas las piezas (placeholder para futura integración GET).
 */
export async function getPieces(): Promise<ApiResponse<Piece[]>> {
    try {
        await new Promise((r) => setTimeout(r, 400));
        return { success: true, data: [] };
    } catch {
        return { success: false, error: "Error al obtener piezas." };
    }
}

/**
 * Obtiene una pieza por ID (placeholder para futura integración GET).
 */
export async function getPieceById(id: string): Promise<ApiResponse<Piece>> {
    try {
        await new Promise((r) => setTimeout(r, 300));
        return { success: true, data: undefined };
    } catch {
        return { success: false, error: "Pieza no encontrada." };
    }
}
