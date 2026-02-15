import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./screens/auth/login/Login";
import Register from "./screens/auth/register/Register";
import Students from "./screens/teacher/Students";
import Onboarding from "./screens/auth/register/studentOnboarding/OnBording";
import OnboardingStep2 from "./screens/auth/register/studentOnboarding/OnboardingStep2";
import OnboardingStep3 from "./screens/auth/register/studentOnboarding/OnboardingStep3";
import OnboardingStep4 from "./screens/auth/register/studentOnboarding/OnboardingStep4";
import TeacherOnboarding from "./screens/auth/register/teacherOnBoarding/TeacherOnboarding";
import TeachingPreferences from "./screens/auth/register/teacherOnBoarding/TeachingPreferences";
import StudentDashboard from "./screens/dashboard/student/StudentHome";
import TeacherDashboard from "./screens/teacher/dashboard/TeacherDashboard";
import MyCourses from "./screens/teacher/myCourses/MyCourses";
import CreateCourseStep1 from "./screens/teacher/createCourse/CreateCourseStep1";
import CreateCourseStep2 from "./screens/teacher/createCourse/CreateCourseStep2";
import CreateCourseStep3 from "./screens/teacher/createCourse/CreateCourseStep3";
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

      {/* STUDENT ROUTES */}
      <Route path="/student-dashboard" element={<StudentDashboard />} />

      {/* TEACHER ROUTES */}
      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      <Route path="/t-my-courses" element={<MyCourses />} />
      <Route
        path="/teacher/create-course/step-1"
        element={<CreateCourseStep1 />}
      />
      <Route
        path="/teacher/create-course/step-2"
        element={<CreateCourseStep2 />}
      />
      <Route
        path="/teacher/create-course/step-3"
        element={<CreateCourseStep3 />}
      />
      <Route path="/teacher/students" element={<Students />} />
     
    </Routes>
  );
};

export default App;
