import { mockPieces } from "@/lib/data";
import PieceDetailClient from "@/components/PieceDetailClient";

export function generateStaticParams() {
    return mockPieces.map((p) => ({
        id: p.id,
    }));
}

export default async function PieceDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <PieceDetailClient id={id} />;
}
