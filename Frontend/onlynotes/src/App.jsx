import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Year from "./pages/Year";
import AdminUpload from "./pages/AdminUpload";
import Subject from "./pages/Subject";
import PDF from "./pages/Pdf";
import AdminPanel from "./pages/AdminPanel";



const Protected = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={<Protected><Dashboard /></Protected>}
        />

        <Route
          path="/notes/:pattern"
          element={<Protected><Notes /></Protected>}
        />

        <Route
          path="/notes/:pattern/:year"
          element={<Protected><Year /></Protected>}
        />

        <Route
          path="/admin/upload"
          element={<Protected><AdminUpload /></Protected>}
        />
        <Route path="/notes/:pattern/:year/:semester" element={<Protected><Subject/></Protected>} />
<Route path="/notes/:pattern/:year/:semester/:subject" element={<Protected><PDF/></Protected>} />
<Route path="/admin/panel" element={<Protected><AdminPanel/></Protected>} />
      </Routes>
    </BrowserRouter>
  );
}
