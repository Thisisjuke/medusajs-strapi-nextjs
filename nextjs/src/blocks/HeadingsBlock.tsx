import {Headings} from "./components/Headings";

export const HeadingsBlock = (props) => {
    const {title, subtitle, ctaText, ctaUrl} = props

    return(
        <div className={'bg-indigo-50'}>
            <Headings title={title} subtitle={subtitle} ctaUrl={ctaUrl} ctaText={ctaText}/>
        </div>
    )
}