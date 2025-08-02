// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import AdminHomeScreen from "./Components/Admin_Portal/Screens/AdminHomeScreen";
import Home from './Components/Customer_Portal/Home';
import AppointmentForm from "./Components/Customer_Portal/appointment form/AppointmentForm";

function App() {
  return (
    <BrowserRouter basename="/IntegrityAuto">
      <Routes>
        <Route path="/" element={<AppointmentForm />} />
        <Route path="/admin" element={<AdminHomeScreen />} />
        {/* You can add more routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

