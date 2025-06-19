// src/App.js
import './App.css';
import PageBlock from './Components/Admin_Portal/PageBlock';
// import UploadImage from './Components/Admin_Portal/ImageUploadForm';
// import "./Components/Admin_Portal/Styles/PageBlock.css"

function App() {
  const size = 300
  return (
    <>
      <PageBlock order={"pic"} picSize={size} uuid="test2"/>
      <PageBlock order={"text"} picSize={size} uuid="test2"/>
      <PageBlock order={"pic"} picSize={size} uuid="test2"/>
    </>
  );
}

export default App;
