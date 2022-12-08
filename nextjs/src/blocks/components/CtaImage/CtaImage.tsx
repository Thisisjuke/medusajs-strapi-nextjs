import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"
import getConfig from "next/config";

export interface CtaImageBlockProps {
    title?: string
    ctaText?: string
    ctaUrl?: string
    imageUrl?: string
    imageAlt?: string
}

export const CtaImage = ({title, ctaText, ctaUrl, imageUrl, imageAlt}:CtaImageBlockProps) => {
    const { publicRuntimeConfig } = getConfig();
    const { strapiBackendUrl } = publicRuntimeConfig;

    return (
        <div className="bg-amber-100 w-full">
            <div className="content-container flex flex-col-reverse gap-y-8 small:flex-row small:items-center justify-between py-16 relative">
                <div>
                    { title && <h3 className="text-2xl-semi">{title}</h3>}
                    { ctaText && (
                        <div className="mt-6">
                            <UnderlineLink href={ctaUrl || '/'}>{ctaText}</UnderlineLink>
                        </div>
                    )}
                </div>

                {imageUrl && imageAlt && (<div className="relative w-full aspect-square small:w-[35%] small:aspect-[28/36]">
                    <Image
                        src={`${strapiBackendUrl}${imageUrl}`}
                        alt={imageAlt}
                        className="absolute inset-0 object-cover"
                        fill
                    />
                </div>)}
            </div>
        </div>
    )
}
