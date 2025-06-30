// src/Components/Admin_Portal/Sub-Components/PageBlock.jsx


import InfoBlock from './InfoBlock';
import "../Styles/PageBlock.css"
import useCSSVar from '../../../hooks/useCSSVar';
import { to_px } from '../../../Common_Functions/px_conversion';
import ImageInput from './ImageInput';
import useComponentID from '../../../hooks/useComponentID';


function PageBlock({ order, picSize=100, textWidth=400, p=30, image, spacing=10, parentID}) {
    const fid = useComponentID(parentID)
    const [, setPadding] = useCSSVar('block-vertical-padding')
    setPadding(to_px(p))
    // console.log("PageBlock",parentID,fid)
    const w = picSize > textWidth ? picSize : textWidth
    return (
        <div className="pageBlock">
            <div className="centered-block" 
            style={{ 
                width: `${w}px`, 
                height: `${picSize}px`,
                marginRight: `${spacing}%`,
                alignItems: "left",
                justifyContent: "left",
            }}
            >
                {order === "pic" ? 
                    <ImageInput size={picSize} image={image} parentID={fid} /> : 
                    <InfoBlock w={textWidth} h={picSize * 0.6} parentID={fid} />
                }
            </div>
            <div 
                className="centered-block" 
                style={{ 
                    width: `${w}px`, 
                    height: `${picSize}px` ,
                    alignItems: "right",
                    justifyContent: "right",
                }}
            >
                {order === "pic" ? 
                    <InfoBlock w={textWidth} h={picSize * 0.6} parentID={fid} /> : 
                    <ImageInput size={picSize} image={image} parentID={fid} />
                }
            </div>
        </div>

    );
}

export default PageBlock;
