import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./screens/auth/login/Login";
import Register from "./screens/auth/register/Register";

import Onboarding from "./screens/auth/register/studentOnboarding/OnBording";
import OnboardingStep2 from "./screens/auth/register/studentOnboarding/OnboardingStep2";
import OnboardingStep3 from "./screens/auth/register/studentOnboarding/OnboardingStep3";
import OnboardingStep4 from "./screens/auth/register/studentOnboarding/OnboardingStep4";
import TeacherOnboarding from "./screens/auth/register/teacherOnBoarding/TeacherOnboarding";
import TeachingPreferences from "./screens/auth/register/teacherOnBoarding/TeachingPreferences";
import StudentDashboard from "./screens/dashboard/student/StudentHome";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/onboarding-step-2" element={<OnboardingStep2 />} />
      <Route path="/onboarding-step-3" element={<OnboardingStep3 />} />
      <Route path="/onboarding-step-4" element={<OnboardingStep4 />} />
      <Route path="/teacher-onboarding" element={<TeacherOnboarding />} />
      <Route path="/teaching-preferences" element={<TeachingPreferences />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
    </Routes>
  );
};

export default App;
// import React from 'react'
// import StudentDashboard from './screens/dashboard/student/StudentHome'

// const App = () => {
//   return (
//     <div>
//       <StudentDashboard />
//     </div>
//   )
// }

// export default App
