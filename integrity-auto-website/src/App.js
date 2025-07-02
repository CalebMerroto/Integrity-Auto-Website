// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import AdminHomeScreen from "./Components/Admin_Portal/Screens/AdminHomeScreen";
import Home from './Components/Customer_Portal/Home';

function App() {
  return (
    <BrowserRouter basename="/IntegrityAuto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminHomeScreen />} />
        {/* You can add more routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

