
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/studentcomponents/Navbar";
import Footer from "../../../components/studentcomponents/Footer";

const EnrolledCourses = () => {
  const filters = [
    { id: 1, label: "All", count: 0, dot: null },
    { id: 2, label: "In Progress", count: 0, dot: "bg-yellow-400" },
    { id: 3, label: "Completed", count: 0, dot: "bg-green-500" },
    { id: 4, label: "Not Started", count: 0, dot: "bg-red-500" },
  ];

  const [activeFilter, setActiveFilter] = useState("All");
  const [courses, setCourses] = useState([]);
  const [openCourses, setOpenCourses] = useState([]);
  const token = localStorage.getItem("token");

  // ✅ FETCH ENROLLED COURSES
  const fetchCourses = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/courses/my-enrolled-courses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setCourses(data.courses);

        // open all by default
        setOpenCourses(data.courses.map((course) => course._id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const toggleCourse = (id) => {
    setOpenCourses((prev) =>
      prev.includes(id)
        ? prev.filter((courseId) => courseId !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white">
        <Navbar />
      </div>

      <div className="bg-white min-h-screen pt-24 flex flex-col">
        <div className="flex-1 px-8 lg:px-16 py-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-5">
            My Courses
          </h1>

          {/* SORT */}
          <div className="flex gap-3 mb-5">
            <button className="bg-white border border-gray-300 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
              ↕ Sort ▾
            </button>
            <button className="bg-white border border-gray-300 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
              ☰ Category ▾
            </button>
          </div>

          {/* FILTERS (static UI untouched) */}
          <div className="flex gap-3 mb-8 flex-wrap">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.label;

              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.label)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm border border-gray-300 transition ${
                    isActive
                      ? "bg-gray-200 text-gray-900"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {filter.dot && (
                    <span
                      className={`w-2 h-2 rounded-full ${filter.dot}`}
                    ></span>
                  )}
                  {filter.label}
                  <span className="bg-gray-300 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                    {courses.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* COURSES */}
          <div className="space-y-8">
            {courses.map((course) => {
              const isOpen = openCourses.includes(course._id);

              return (
                <div key={course._id}>
                  {/* HEADER */}
                  <div
                    onClick={() => toggleCourse(course._id)}
                    className="flex justify-between items-center cursor-pointer border-b border-gray-300 pb-2"
                  >
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {course.title}
                      </h2>

                      <span className="text-sm text-gray-500">
                        {course.modules.length} Modules • {course.duration}
                      </span>
                    </div>

                    <span className="text-gray-500 text-sm">
                      {isOpen ? "▴" : "▾"}
                    </span>
                  </div>

                  {isOpen && (
                    <div className="mt-5 space-y-4">
                      {course.modules.map((module) => {
                        const buttonText =
                          module.progress === 100
                            ? "View"
                            : module.progress === 0
                            ? "Start"
                            : "Resume";

                        const progressColor =
                          module.progress === 100
                            ? "bg-green-600"
                            : module.progress > 0
                            ? "bg-yellow-400"
                            : "bg-red-400";

                        return (
                          <div
                            key={module._id}
                            className="bg-gray-50 border border-gray-300 rounded-lg px-5 py-4 flex justify-between items-center"
                          >
                            <div className="w-[70%]">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`w-2 h-2 rounded-full ${progressColor}`}
                                ></span>
                                <p className="font-medium text-gray-900">
                                  {module.title}
                                </p>
                              </div>

                              <p className="text-sm text-gray-500 mt-1">
                                {module.progress === 0
                                  ? "Not Started"
                                  : `${module.progress}% Complete`}
                              </p>

                              <div className="mt-3 w-[85%] bg-gray-300 rounded-full h-1.5">
                                <div
                                  className={`${progressColor} h-1.5 rounded-full`}
                                  style={{
                                    width: `${module.progress}%`,
                                  }}
                                ></div>
                              </div>
                            </div>

                            <Link
                              to={`/student-course/${course._id}/${module._id}/${module.lessons[0]?._id}`}
                              className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-md text-sm font-medium"
                            >
                              {buttonText}
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default EnrolledCourses;
