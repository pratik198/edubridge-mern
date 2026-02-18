// import MyActiveCourses from "../../../components/studentcomponents/studentDashboard/MyActiveCourses";
// import CompletedCourses from "../../../components/studentcomponents/studentDashboard/CompletedCourses";
import Footer from "../../../components/studentcomponents/Footer";
import Navbar from "../../../components/studentcomponents/Navbar";
import ActiveCourseList from "../../../components/studentcomponents/dashboard/ActiveCourseList";
import CourseCompletionList from "../../../components/studentcomponents/dashboard/CourseCompletionList";
import DashHero from "../../../components/studentcomponents/dashboard/DashHero";
import RecommendedCourseList from "../../../components/studentcomponents/dashboard/RecommendedCourseList";
const StudentDash = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <DashHero />

      {/* DASHBOARD CONTENT */}
      <section className="px-6 md:px-10 pb-16 mt-10 space-y-14">
        {/* 🔥 Latest / New Courses (inside dashboard) */}
        <ActiveCourseList />
        <CourseCompletionList />
        <RecommendedCourseList />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StudentDash;
