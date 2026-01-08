import TeacherNavbar from "../../../components/teacher/TeacherNavbar";
import { IoIosArrowDown } from "react-icons/io";
import Footer from "../../../components/studentcomponents/Footer";
import MyCoursesTable from "../../../components/teacher/myCoursesTable/MyCoursesTable";
import { sampleCourses } from "../../../data/sampleCoursesData";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 🔝 TOP NAVBAR */}
      <TeacherNavbar />

      {/* 🧠 MAIN CONTENT */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Courses</h1>
          <button
            onClick={() => navigate("/create-course-step1")}
            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg font-medium"
          >
            + Create New Course
          </button>
        </div>

        <div className="flex gap-3 mb-4">
          {["Published", "Draft", "Archived"].map((item) => (
            <button
              key={item}
              className="px-4 py-1 border rounded-full text-sm hover:bg-gray-100"
            >
              {item}
            </button>
          ))}

          <button className="px-4 py-1 border rounded-full text-sm ml-auto flex justify-center items-center gap-1">
            Sort By <IoIosArrowDown size={12} />
          </button>
        </div>

        <MyCoursesTable data={sampleCourses} />
      </main>

      {/* 🔚 FOOTER */}
      <Footer />
    </div>
  );
};

export default MyCourses;
