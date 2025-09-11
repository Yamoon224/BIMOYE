import type { Metadata } from "next"
import { residences } from "@/src/data/residences" // ton tableau existant
import ResidenceDetail from "./residence-detail"

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = Number(params.id)
    const residence = residences.find(r => r.id === id)

    if (!residence) {
        return {
            title: "Résidence introuvable",
            description: "La résidence demandée est introuvable",
        }
    }

    return {
        title: residence.title,
        description: `Découvrez ${residence.title} à ${residence.location} dès ${residence.price} XOF/nuit.`,
        openGraph: {
            title: residence.title,
            description: `Découvrez ${residence.title} à ${residence.location} dès ${residence.price} XOF/nuit.`,
            url: `https://bimoye.com/residences/${residence.id}`,
            type: "article",
            images: [
                {
                    url: residence.images[0],
                    width: 1200,
                    height: 630,
                    alt: residence.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: residence.title,
            description: `Découvrez ${residence.title} à ${residence.location}`,
            images: [residence.images[0]],
        },
    }
}

export default function Page({ params }: Props) {
    const id = Number(params.id)
    const residence = residences.find(r => r.id === id)

    if (!residence) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-xl text-gray-700 dark:text-gray-300">Résidence introuvable</p>
        </div>
    )

    return <ResidenceDetail data={residence} />
}
