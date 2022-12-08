import {CtaImageBlock} from "./CtaImageBlock";
import {HeadingsBlock} from "./HeadingsBlock";

const blockChecker = (block) => {
    if(block.__component === 'block.cta-image-block'){
        return(<CtaImageBlock {...block} />)
    }
    if(block.__component === 'block.headings-block'){
        return(<HeadingsBlock {...block} />)
    }
}

export const BlocksBuilder = ({blocks}) => {

    return(
        <>
            {blocks.map(block => blockChecker(block))}
        </>
    )
}