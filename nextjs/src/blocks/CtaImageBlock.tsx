import {CtaImage} from "./components/CtaImage";

export const CtaImageBlock = (props) => {
    const {title, ctaText, ctaUrl, image} = props
    console.log(image)

    return(
        <CtaImage title={title} ctaText={ctaText} ctaUrl={ctaUrl} imageUrl={image.url} imageAlt={image.alternativeText} />
    )
}