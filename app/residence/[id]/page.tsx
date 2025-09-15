import type { Metadata } from "next"
import ResidenceDetail from "./residence-detail"
import { residences } from "@/src/data/residences" // ton tableau existant

interface Props {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const residence = residences.find(r => r.id === Number(id))

    if (!residence) {
        return {
            title: "Résidence introuvable",
            description: "La résidence demandée est introuvable",
        }
    }

    return {
        metadataBase: new URL(`https://bimoye.com/residence/${residence.id}`), // ← ton domaine prod
        title: {
            default: residence.title,
            template: residence.title,
        },
        description: `Découvrez ${residence.title} à ${residence.location} dès ${residence.price} XOF/nuit.`,
        openGraph: {
            images: residence.images,
        },
        twitter: {
            card: "summary_large_image",
            images: residence.images,
        },
        generator: "Yamoussa KEITA",
        icons: {
            icon: "/favicon.ico", // favicon par défaut
            shortcut: "/favicon.ico",
            apple: "/logo.png", // pour iOS si tu veux
        },
    }
}

export default async function Page({ params }: Props) {
    const { id } = await params
    const residence = residences.find(r => r.id === Number(id))

    if (!residence) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-xl text-gray-700 dark:text-gray-300">Résidence introuvable</p>
        </div>
    )

    return <ResidenceDetail data={residence} />
}
