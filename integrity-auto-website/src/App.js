import './App.css';
import SquareImage from './Components/Admin_Portal/Square_Image';
import InfoBlock from './Components/Admin_Portal/Info_block';

function App() {
  return (
    <span style={{display:"flex",flexDirection:"row"}}>
      <SquareImage />
      <InfoBlock/>
    </span>
  );
}

export default App;
