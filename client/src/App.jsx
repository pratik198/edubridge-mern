import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./screens/auth/login/Login";
import Register from "./screens/auth/register/Register";
import OnBording from "./screens/auth/register/OnBording";
import OnboardingStep2 from "./screens/auth/register/OnboardingStep2";
import OnboardingStep3 from "./screens/auth/register/OnboardingStep3";
import OnboardingStep4 from "./screens/auth/register/OnboardingStep4";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/onboarding" element={<OnBording />} />
      <Route path="/onboarding-step-2" element={<OnboardingStep2 />} />
      <Route path="/onboarding-step-3" element={<OnboardingStep3 />} />
      <Route path="/onboarding-step-4" element={<OnboardingStep4 />} />
    </Routes>
  );
};

export default App;
