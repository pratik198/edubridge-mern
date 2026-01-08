import CourseCompletionPie from "../../../components/common/charts/CourseCompletionPie";
import MonthlyEngagementBar from "../../../components/common/charts/MonthlyEngagementBar";
import StudentGrowthArea from "../../../components/common/charts/StudentGrowthArea";
import TeacherHero from "../../../components/teacher/TeacherHero";
import TeacherNavbar from "../../../components/teacher/TeacherNavbar";

import LatestCourses from "../../../components/teacher/LatestCourses";
import Footer from "../../../components/studentcomponents/Footer";

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherNavbar />
      <TeacherHero />

      {/* DASHBOARD CONTENT */}
      <section className="px-6 md:px-10 pb-16 mt-10 space-y-14">
        {/* Monthly Engagement (Full Width) */}
        <MonthlyEngagementBar />

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CourseCompletionPie />
          <StudentGrowthArea />
        </div>

        {/* 🔥 Latest / New Courses (inside dashboard) */}
        <LatestCourses />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TeacherDashboard;
