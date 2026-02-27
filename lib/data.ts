// lib/data.ts – Mock structured data for the museum platform

export interface MockPiece {
    id: string;
    museo: "Museo del Mar" | "Museo de Trajes";
    categoria: string;
    nombre: string;
    descripcion: string;
    contexto_historico: string;
    proceso_construccion: string;
    materiales: string[];
    estado_conservacion: "Excelente" | "Bueno" | "Regular" | "Deteriorado";
    dimensiones: string;
    peso: string;
    sala: string;
    periodo: string;
    autor: string;
    comunidad?: string;
    anio_aproximado: string;
    imagenes: string[];
    notas_curatoriales: string;
}

export const mockPieces: MockPiece[] = [
    {
        id: "mar-001",
        museo: "Museo del Mar",
        categoria: "Fósil",
        nombre: "Cráneo de Mosasaurio Colombiano",
        descripcion:
            "Espécimen excepcional de mosasaurio descubierto en las formaciones calcáreas de Boyacá. Presenta dentición completa y parte del paladar óseo.",
        contexto_historico:
            "Los mosasaurios dominaron los mares cretácicos hace aproximadamente 75 millones de años. Colombia fue un mar epicontinental durante este período, dando origen a numerosos hallazgos paleontológicos de valor científico mundial.",
        proceso_construccion:
            "Extracción mediante técnicas de consolidación in situ con resinas epóxicas. Limpieza mecánica y química en laboratorio durante 8 meses.",
        materiales: ["Hueso fosilizado", "Calcita", "Matriz sedimentaria"],
        estado_conservacion: "Bueno",
        dimensiones: "142 cm × 38 cm × 22 cm",
        peso: "48 kg",
        sala: "Sala Cretácica – Sector A",
        periodo: "Cretácico Superior",
        autor: "Hallazgo colectivo",
        anio_aproximado: "75,000,000 a.C.",
        imagenes: [],
        notas_curatoriales:
            "Pieza insignia de la colección. Requiere monitoreo de humedad relativa permanente. Préstamos sujetos a autorización de la dirección científica.",
    },
    {
        id: "mar-002",
        museo: "Museo del Mar",
        categoria: "Hueso",
        nombre: "Vértebra de Plesiosaurio",
        descripcion:
            "Vértebra dorsal de plesiosaurio en estado de conservación notable, con marcas de articulación visibles y tejido esponjoso interno preservado.",
        contexto_historico:
            "Los plesiosaurios habitaron los océanos del Jurásico y Cretácico. Esta vértebra corresponde a un individuo adulto de gran talla.",
        proceso_construccion:
            "Preparación mecánica con herramientas de aire comprimido. Consolidación con Paraloid B-72.",
        materiales: ["Hueso fosilizado", "Matriz arcillosa"],
        estado_conservacion: "Excelente",
        dimensiones: "24 cm × 19 cm × 15 cm",
        peso: "3.2 kg",
        sala: "Sala Cretácica – Sector B",
        periodo: "Cretácico Inferior",
        autor: "Equipo Paleontológico UPTC",
        anio_aproximado: "110,000,000 a.C.",
        imagenes: [],
        notas_curatoriales:
            "Excelente potencial didáctico. Autorizada para manipulación con guantes en visitas científicas.",
    },
    {
        id: "mar-003",
        museo: "Museo del Mar",
        categoria: "Reconstrucción de ecosistema",
        nombre: "Diorama Mar Interior Cretácico",
        descripcion:
            "Reconstrucción tridimensional a escala 1:20 del ecosistema marino cretácico colombiano, con 23 especies representadas mediante modelos de resina policromada.",
        contexto_historico:
            "El mar de Tetis cubrió gran parte del territorio que hoy es Colombia durante el Cretácico. Esta reconstrucción integra evidencia fósil de cuatro departamentos.",
        proceso_construccion:
            "Diseño basado en literatura científica actualizada. Modelado en arcilla, moldeado en silicona, colado en poliuretano y pintura con acrílicos de archivo.",
        materiales: [
            "Resina de poliuretano",
            "Acrílico de archivo",
            "Fibra de vidrio",
            "Madera de cedro",
        ],
        estado_conservacion: "Excelente",
        dimensiones: "320 cm × 180 cm × 90 cm",
        peso: "85 kg",
        sala: "Sala Central – Vitrina 1",
        periodo: "Cretácico",
        autor: "Taller de Taxidermia y Modelado - Museo",
        anio_aproximado: "2019",
        imagenes: [],
        notas_curatoriales: "Pieza central de la exposición permanente.",
    },
    {
        id: "mar-004",
        museo: "Museo del Mar",
        categoria: "Animatrónico",
        nombre: "Kronosaurus Animatrónico",
        descripcion:
            "Réplica animatrónica a escala 1:1 de Kronosaurus boyacensis, el reptil marino más grande descubierto en Colombia. Opera con sistema hidráulico y sensor de movimiento.",
        contexto_historico:
            "El Kronosaurus boyacensis es una de las especies más emblemáticas del patrimonio paleontológico colombiano, descubierto en la región de Villa de Leyva.",
        proceso_construccion:
            "Estructura de acero soldado, recubrimiento en espuma de poliuretano esculpida, piel en látex texturizado. Sistema hidráulico con 12 actuadores.",
        materiales: [
            "Acero estructural",
            "Poliuretano",
            "Látex",
            "Acrílico",
            "Sistema hidráulico",
        ],
        estado_conservacion: "Bueno",
        dimensiones: "9.5 m × 2.1 m × 1.8 m",
        peso: "1,200 kg",
        sala: "Sala Interactiva – Entrada Principal",
        periodo: "Contemporáneo (referencia Cretácico)",
        autor: "Estudio de Animatrónica Fauna & Forma",
        anio_aproximado: "2021",
        imagenes: [],
        notas_curatoriales:
            "Mantenimiento mensual del sistema hidráulico requerido. Mayor atracción del museo según métricas de visita.",
    },
    {
        id: "trajes-001",
        museo: "Museo de Trajes",
        categoria: "Traje prehispánico de Colombia",
        nombre: "Atuendo Ceremonial Muisca – Cacique",
        descripcion:
            "Conjunto indumentario de alto rango para ceremonias del pueblo Muisca. Compuesto por manta tejida, pectoral de tumbaga y tocado de plumas.",
        contexto_historico:
            "Los Muisca desarrollaron una compleja jerarquía social reflejada en su indumentaria. Los caciques utilizaban atuendos específicos para rituales como la ceremonia del Dorado.",
        proceso_construccion:
            "Algodón hilado a mano, teñido con añil y cochinilla. Tejido en telar de cintura. Orfebrería en técnica de cera perdida.",
        materiales: [
            "Algodón nativo",
            "Tumbaga (oro-cobre)",
            "Plumas de guacamaya",
            "Semillas",
            "Tintes naturales",
        ],
        estado_conservacion: "Regular",
        dimensiones: "180 cm × 140 cm (manta)",
        peso: "2.4 kg",
        sala: "Sala Prehispánica – Vitrina 3",
        periodo: "Prehispánico – 900 a 1600 d.C.",
        autor: "Artesanos Muisca",
        comunidad: "Pueblo Muisca",
        anio_aproximado: "1400 d.C. (aprox.)",
        imagenes: [],
        notas_curatoriales:
            "Requiere condiciones de temperatura 18°C y humedad relativa 45-55%. Iluminación LED de baja emisión UV.",
    },
    {
        id: "trajes-002",
        museo: "Museo de Trajes",
        categoria: "Indumentaria colonial",
        nombre: "Vestido de Gala Neogranadino – Siglo XVIII",
        descripcion:
            "Traje completo de dama de alcurnia del período colonial tardío. Influencia borbónica marcada, adaptada con textiles locales y bordados criollos.",
        contexto_historico:
            "La Nueva Granada mantuvo una élite criolla que imitaba las modas europeas adaptándolas al contexto local. Este vestido corresponde a una familia terrateniente bogotana.",
        proceso_construccion:
            "Confección manual con técnicas de sastrería europea. Bordados en seda con hilos de oro. Estructura interior en ballena de ballena.",
        materiales: [
            "Seda importada de Europa",
            "Hilo de oro",
            "Ballena",
            "Encaje de Flandes",
            "Algodón de forro",
        ],
        estado_conservacion: "Bueno",
        dimensiones: "165 cm largura total",
        peso: "1.8 kg",
        sala: "Sala Colonial – Vitrina Central",
        periodo: "Colonial – Siglo XVIII",
        autor: "Sastre desconocido – Santa Fe de Bogotá",
        anio_aproximado: "1760 d.C. (aprox.)",
        imagenes: [],
        notas_curatoriales:
            "Pieza de alta fragilidad. Manipulación solo por personal especializado con guantes de algodón.",
    },
    {
        id: "trajes-003",
        museo: "Museo de Trajes",
        categoria: "Comunidades indígenas",
        nombre: "Cushma Uitoto – Atuendo Masculino Ritual",
        descripcion:
            "Cushma tradicional del pueblo Uitoto elaborada en corteza de árbol (llanchama). Decorada con motivos geométricos de significado cosmológico.",
        contexto_historico:
            "La cushma es la vestimenta sagrada de los pueblos amazónicos colombianos. Su portador adquiere protección espiritual durante los rituales de mambeo y ambil.",
        proceso_construccion:
            "Elaborada con corteza interior de Ficus insipida. Maceración, golpeo y secado durante 3 semanas. Pintura con vegetales locales.",
        materiales: [
            "Corteza de llanchama",
            "Pigmentos vegetales (achiote, jagua)",
            "Fibras de palma",
        ],
        estado_conservacion: "Regular",
        dimensiones: "140 cm × 120 cm",
        peso: "0.9 kg",
        sala: "Sala Amazónica – Vitrina 1",
        periodo: "Contemporáneo (tradición ancestral)",
        autor: "Artesano Uitoto – Comunidad La Chorrera",
        comunidad: "Pueblo Uitoto – Amazonas",
        anio_aproximado: "1985",
        imagenes: [],
        notas_curatoriales:
            "Donada directamente por la comunidad. Consulta previa requerida para préstamos o exposición itinerante.",
    },
    {
        id: "trajes-004",
        museo: "Museo de Trajes",
        categoria: "Comunidades negras tradicionales",
        nombre: "Traje de Mapalé – Barranquilla",
        descripcion:
            "Indumentaria femenina tradicional para el baile de mapalé. Representa la fusión afrodiaspórica del Caribe colombiano con influencias indígenas y españolas.",
        contexto_historico:
            "El mapalé es uno de los ritmos más antiguos del folclor caribeño colombiano, de origen africano. Su indumentaria refleja la identidad cultural de las comunidades negras de la costa Caribe.",
        proceso_construccion:
            "Confección artesanal con telas de colores vibrantes. Decoración con lentejuelas, encajes y flecos. Técnicas de costura transmitidas generacionalmente.",
        materiales: [
            "Algodón",
            "Lentejuelas",
            "Encaje",
            "Flecos de hilo",
            "Tules de colores",
        ],
        estado_conservacion: "Excelente",
        dimensiones: "Talla única – 155 cm portadora",
        peso: "1.1 kg",
        sala: "Sala Caribe – Vitrina 2",
        periodo: "Siglo XX – Tradición viva",
        autor: "Modista de San Basilio de Palenque",
        comunidad: "Comunidad Afrocolombiana Caribe",
        anio_aproximado: "1970",
        imagenes: [],
        notas_curatoriales: "Pieza activa en exhibiciones temporales y préstamos.",
    },
    {
        id: "trajes-005",
        museo: "Museo de Trajes",
        categoria: "Trajes contemporáneos",
        nombre: "Colección 'Raíces' – Alta Costura Contemporánea",
        descripcion:
            "Conjunto couture que dialoga con las tradiciones textiles colombianas. Integra técnicas de tejeduría wayuu, bordado muisca y siluetas contemporáneas.",
        contexto_historico:
            "Parte del movimiento de revalorización de la identidad textil colombiana en la moda contemporánea internacional. Presentada en Bogotá Fashion Week 2022.",
        proceso_construccion:
            "Diseño computacional asistido, tejido wayuu tradicional a mano, construcción en taller de alta costura. 340 horas de trabajo artesanal.",
        materiales: [
            "Hilo de lana virgen teñida",
            "Seda colombiana",
            "Bordado en mostacilla",
            "Estructura en organza",
        ],
        estado_conservacion: "Excelente",
        dimensiones: "Talla 38 – 168 cm portadora",
        peso: "0.7 kg",
        sala: "Sala Contemporánea – Pedestales centrales",
        periodo: "Contemporáneo – 2022",
        autor: "Diseñadora: Valentina Ospina",
        comunidad: "Colaboración con artesanas Wayuu",
        anio_aproximado: "2022",
        imagenes: [],
        notas_curatoriales:
            "Donación de la diseñadora. Seleccionada para representar Colombia en exposición internacional 2024.",
    },
];

export const dashboardStats = {
    total: mockPieces.length,
    pendientes: 2,
    aprobadas: 6,
    observaciones: 1,
};

export function getPiecesByMuseum(museo: "Museo del Mar" | "Museo de Trajes") {
    return mockPieces.filter((p) => p.museo === museo);
}

export function getPieceById(id: string) {
    return mockPieces.find((p) => p.id === id) ?? null;
}
