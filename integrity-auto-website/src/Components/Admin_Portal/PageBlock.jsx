import SquareImage from './SquareImage';
import InfoBlock from './InfoBlock';
import "./PageBlock.css"
function PageBlock({ order, picSize=100, textWidth=300}) {
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
