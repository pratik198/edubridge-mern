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
import StudentDash from "./screens/dashboard/student/StudentDash";
import EnrolledCourses from "./screens/dashboard/enrolledCourses/EnrolledCourses";
import CourseDetails from "./screens/dashboard/courseDetails/CourseDetails";
import LessonPlayer from "./screens/dashboard/lessonPlayer/LessonPlayer";
import QuizPage from "./screens/dashboard/quizPage/QuizPage";
import QuizAttempt from "./screens/dashboard/quizAttempt/QuizAttempt";
import StudentInfo from "./screens/dashboard/studentInfo/StudentInfo";
import StudentProfile from "./screens/teacher/StudentProfile";
import CourseDetailsForTeacher from "./screens/teacher/CourseDetailsForTeacher";
import TeacherProfile from "./screens/teacher/TeacherProfile";
import CourseDetailsForStudent from "./screens/dashboard/CourseDetailsForStudent";
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
      <Route path="/student-home" element={<StudentDashboard />} />
      <Route path="/student-dashboard" element={<StudentDash />} />
      <Route path="/s-enrolled-courses" element={<EnrolledCourses />} />
      <Route
        path="/student-course/:courseId/:moduleId/:lessonId"
        element={<CourseDetails />}
      />

      <Route
        path="/student-course/:courseId/:moduleId/:lessonId/learn"
        element={<LessonPlayer />}
      />
      <Route
        path="/student-course/:courseId/:moduleId/:lessonId/quiz"
        element={<QuizPage />}
      />
      <Route
        path="/student-course/:courseId/:moduleId/:lessonId/quiz/attempt"
        element={<QuizAttempt />}
      />
      <Route path="/student-profile" element={<StudentInfo />} />

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
      <Route path="/teacher/students/:id" element={<StudentProfile />} />
      <Route path="/teacher/course/:courseId" element={<CourseDetails />} />
      {/* <Route
        path="/teacher/course-details/:courseId"
        element={<CourseDetailsForTeacher />}
      /> */}
      <Route
        path="/course-details/:courseId"
        element={<CourseDetailsForTeacher />}
      />
      <Route
        path="/CourseDetailsForStudent/:courseId"
        element={<CourseDetailsForStudent />}
      />
      <Route path="/teacher-profile" element={<TeacherProfile />} />
    </Routes>
  );
};

export default App;
