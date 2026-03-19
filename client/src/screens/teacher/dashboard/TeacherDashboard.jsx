
import { useEffect, useState } from "react";
import CourseCompletionPie from "../../../components/common/charts/CourseCompletionPie";
import MonthlyEngagementBar from "../../../components/common/charts/MonthlyEngagementBar";
import StudentGrowthArea from "../../../components/common/charts/StudentGrowthArea";
import TeacherHero from "../../../components/teacher/TeacherHero";
import TeacherNavbar from "../../../components/teacher/TeacherNavbar";
import LatestCourses from "../../../components/teacher/LatestCourses";
import Footer from "../../../components/studentcomponents/Footer";

const TeacherDashboard = () => {
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/dashboard/teacher",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      if (data.success) {
        setCourses(data.data.courses);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherNavbar />
      <TeacherHero />

      <section className="px-6 md:px-10 pb-16 mt-10 space-y-14">
        <MonthlyEngagementBar />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CourseCompletionPie courses={courses} />
          <StudentGrowthArea />
        </div>
        <LatestCourses courses={courses} />
      </section>

      <Footer />
    </div>
  );
};

export default TeacherDashboard;
