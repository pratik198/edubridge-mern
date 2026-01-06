import TeacherHero from "../../../components/teacher/TeacherHero";
import TeacherNavbar from "../../../components/teacher/TeacherNavbar";

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen">
      <TeacherNavbar />
      <TeacherHero />
    </div>
  );
};

export default TeacherDashboard;
