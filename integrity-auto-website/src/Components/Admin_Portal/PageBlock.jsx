import SquareImage from './SquareImage';
import InfoBlock from './InfoBlock';
import "./PageBlock.css"
import useCSSVar from '../../hooks/useCSSVar';
import { to_px } from '../../Common_Functions/px_conversion';
function PageBlock({ order, picSize=100, textWidth=300, p=30}) {
    const [padding, setPadding] = useCSSVar('block-vertical-padding')
    setPadding(to_px(p))
    return (
        <div className="pageBlock">
        {order === "pic" ? (
            <>
            <SquareImage size={picSize} />
            <InfoBlock w={textWidth} h={picSize} />
            </>
        ) : (
            <>
            <InfoBlock w={textWidth} h={picSize} />
            <SquareImage size={picSize} />
            </>
        )}
        </div>
    );
}

export default PageBlock;
