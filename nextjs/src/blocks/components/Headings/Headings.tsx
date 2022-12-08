import UnderlineLink from "@modules/common/components/underline-link";

export const Headings = ({title, subtitle, ctaUrl, ctaText}) => {

    return(
        <div className="py-12">
            <div className="content-container py-12">
                <div className="flex flex-col items-center text-center mb-16">
          <span className="text-base-regular text-gray-600 mb-6">
            {subtitle}
          </span>
                    <p className="text-2xl-regular text-gray-900 max-w-lg mb-4">
                        {title}
                    </p>
                    <UnderlineLink href={ctaUrl}>{ctaText}</UnderlineLink>
                </div>
            </div>
        </div>
    )
}