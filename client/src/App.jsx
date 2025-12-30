import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./screens/auth/login/Login";
import Register from "./screens/auth/register/Register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
