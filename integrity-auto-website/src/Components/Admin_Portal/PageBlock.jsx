// src/Components/Admin_Portal/PageBlock.jsx


import InfoBlock from './InfoBlock';
import "./Styles/PageBlock.css"
import useCSSVar from '../../hooks/useCSSVar';
import { to_px } from '../../Common_Functions/px_conversion';
import ImageInput from './ImageInput';


function PageBlock({ order, picSize=100, textWidth=400, p=30, uuid, spacing=10}) {
    const [, setPadding] = useCSSVar('block-vertical-padding')
    setPadding(to_px(p))
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
                    <ImageInput size={picSize} uuid={uuid} /> : 
                    <InfoBlock w={textWidth} h={picSize * 0.6} />
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
                    <InfoBlock w={textWidth} h={picSize * 0.6} /> : 
                    <ImageInput size={picSize} uuid={uuid} />
                }
            </div>
        </div>

    );
}

export default PageBlock;
