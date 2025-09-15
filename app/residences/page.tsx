import type { Metadata } from "next"
import { residences } from "@/src/data/residences"
import Residences from "./residences"

export async function generateMetadata(): Promise<Metadata> {
    const allImages = residences.flatMap(r => r.images)

    return {
        metadataBase: new URL("https://bimoye.com/residences"),
        title: {
            default: "BiMOYE: Toutes les résidences",
            template: "BiMOYE: Toutes les résidences",
        },
        description: `Découvrez notre collection complète de résidences exceptionnelles dès 25 000 XOF/nuit.`,
        openGraph: {
            images: allImages,
        },
        twitter: {
            card: "summary_large_image",
            images: allImages,
        },
        generator: "Yamoussa KEITA",
        icons: {
            icon: "/favicon.ico",
            shortcut: "/favicon.ico",
            apple: "/logo.png",
        },
    }
}

export default function Page() {
    return <Residences />
}
