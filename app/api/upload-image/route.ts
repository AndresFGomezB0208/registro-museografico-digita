// app/api/upload-image/route.ts
// Ruta segura para subir imágenes a Cloudflare Images
// El API Token NUNCA se expone al cliente

import { NextRequest, NextResponse } from "next/server";

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID!;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN!;
const CF_UPLOAD_URL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1`;

export async function POST(req: NextRequest) {
    // Verificar que las variables de entorno estén configuradas
    if (!ACCOUNT_ID || !API_TOKEN || API_TOKEN === "TU_API_TOKEN_AQUI") {
        return NextResponse.json(
            {
                success: false,
                error:
                    "Cloudflare Images no configurado. Agrega CLOUDFLARE_API_TOKEN en .env.local",
            },
            { status: 503 }
        );
    }

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { success: false, error: "No se recibió ningún archivo." },
                { status: 400 }
            );
        }

        // Validar tipo de archivo
        const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!validTypes.includes(file.type)) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Formato no soportado: ${file.type}. Usa JPG, PNG, WebP o GIF.`,
                },
                { status: 400 }
            );
        }

        // Validar tamaño (10 MB máximo)
        const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                {
                    success: false,
                    error: `La imagen pesa ${(file.size / 1024 / 1024).toFixed(1)} MB. El máximo es 10 MB.`,
                },
                { status: 400 }
            );
        }

        // Preparar FormData para Cloudflare Images API
        const cfFormData = new FormData();
        cfFormData.append("file", file, file.name);
        // Opcional: metadata adicional
        cfFormData.append(
            "metadata",
            JSON.stringify({
                platform: "registro-museografico-digital",
                uploadedAt: new Date().toISOString(),
                originalName: file.name,
            })
        );

        // Subir a Cloudflare Images
        const cfRes = await fetch(CF_UPLOAD_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                // NO Content-Type: el browser lo pone automáticamente con boundary
            },
            body: cfFormData,
        });

        const cfData = await cfRes.json() as {
            success: boolean;
            result?: { id: string; variants: string[] };
            errors?: { message: string }[];
        };

        if (!cfRes.ok || !cfData.success) {
            const errorMsg =
                cfData.errors?.[0]?.message || `Error Cloudflare (${cfRes.status})`;
            console.error("[Cloudflare Images] Error:", errorMsg);
            return NextResponse.json(
                { success: false, error: errorMsg },
                { status: cfRes.status }
            );
        }

        // Devolver URL pública de la imagen
        const imageId = cfData.result!.id;
        const deliveryBase =
            process.env.NEXT_PUBLIC_CF_IMAGE_DELIVERY ||
            `https://imagedelivery.net/${ACCOUNT_ID}`;

        const publicUrl = `${deliveryBase}/${imageId}/public`;
        const thumbnailUrl = `${deliveryBase}/${imageId}/thumbnail`;

        return NextResponse.json({
            success: true,
            imageId,
            url: publicUrl,
            thumbnail: thumbnailUrl,
            variants: cfData.result!.variants,
        });
    } catch (error) {
        console.error("[Cloudflare Images] Error inesperado:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Error inesperado al subir la imagen. Intenta nuevamente.",
            },
            { status: 500 }
        );
    }
}
