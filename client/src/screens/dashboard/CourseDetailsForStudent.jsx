// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import TeacherNavbar from "../../components/teacher/TeacherNavbar";
// import Footer from "../../components/studentcomponents/Footer";
// import { FiChevronDown, FiBookOpen, FiHelpCircle } from "react-icons/fi";
// import Navbar from "../../components/studentcomponents/Navbar";
// const CourseDetailsForStudent = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role"); // 👈 IMPORTANT

//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [openModule, setOpenModule] = useState(null);

//   const fetchCourse = async () => {
//     try {
//       let res;

//       // ================= ROLE BASED API =================
//       if (role === "educator") {
//         res = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//       } else if (role === "student") {
//         res = await fetch(
//           `http://localhost:5000/api/student/courses/${courseId}`,
//         );
//       } else {
//         navigate("/login");
//         return;
//       }

//       const data = await res.json();

//       if (data.success) {
//         setCourse(data.course);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!role) {
//       navigate("/login");
//       return;
//     }

//     fetchCourse();
//   }, [courseId]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500">
//         Loading course...
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500">
//         Course not found.
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Navbar />

//       <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-10 space-y-14">
//         {/* HEADER */}
//         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
//           <div className="flex flex-col md:flex-row gap-8 justify-between">
//             <div className="flex gap-6 flex-col sm:flex-row">
//               {course.thumbnail && (
//                 <img
//                   src={course.thumbnail}
//                   alt="thumbnail"
//                   className="w-full sm:w-56 h-36 object-cover rounded-2xl"
//                 />
//               )}

//               <div className="space-y-4">
//                 <h1 className="text-3xl font-semibold text-gray-900">
//                   {course.title}
//                 </h1>

//                 <p className="text-gray-500 max-w-2xl">
//                   {course.shortDescription}
//                 </p>

//                 <div className="flex flex-wrap gap-6 text-sm text-gray-600">
//                   <span>
//                     <strong>Category:</strong> {course.category || "-"}
//                   </span>
//                   <span>
//                     <strong>Level:</strong> {course.level || "-"}
//                   </span>
//                   <span>
//                     <strong>Duration:</strong> {course.duration || "-"}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {role === "teacher" && (
//               <div>
//                 <span
//                   className={`px-5 py-2 rounded-full text-xs font-semibold ${
//                     course.isPublished
//                       ? "bg-green-50 text-green-600"
//                       : "bg-gray-100 text-gray-600"
//                   }`}
//                 >
//                   {course.isPublished ? "Published" : "Draft"}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* MODULES */}
//         <div className="space-y-8">
//           <h2 className="text-2xl font-semibold text-gray-900">
//             Course Modules
//           </h2>

//           {course.modules?.map((module, moduleIndex) => {
//             const isOpen = openModule === module._id;

//             const moduleTitle = module.title?.toLowerCase().includes("module")
//               ? module.title
//               : `Module ${moduleIndex + 1}: ${module.title}`;

//             return (
//               <div
//                 key={module._id}
//                 className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
//               >
//                 <div
//                   onClick={() => setOpenModule(isOpen ? null : module._id)}
//                   className="flex justify-between items-center px-6 py-5 cursor-pointer hover:bg-gray-50 transition"
//                 >
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900">
//                       {moduleTitle}
//                     </h3>
//                     <p className="text-xs text-gray-400 mt-1">
//                       {module.lessons?.length || 0} Lessons ·{" "}
//                       {module.quizzes?.length || 0} Quizzes
//                     </p>
//                   </div>

//                   <FiChevronDown
//                     className={`transition-transform ${
//                       isOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </div>

//                 {isOpen && (
//                   <div className="px-6 pb-8 space-y-6 border-t border-gray-100">
//                     {module.lessons?.map((lesson, i) => (
//                       <div
//                         key={lesson._id}
//                         className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100"
//                       >
//                         <FiBookOpen className="text-yellow-500 mt-1" />
//                         <div>
//                           <p className="font-medium text-gray-900">
//                             {i + 1}. {lesson.title}
//                           </p>
//                           <p className="text-xs text-gray-500 mt-1">
//                             Duration: {lesson.duration || "-"}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default CourseDetailsForStudent;



import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiChevronDown, FiBookOpen } from "react-icons/fi";
import Navbar from "../../components/studentcomponents/Navbar";
import Footer from "../../components/studentcomponents/Footer";

const CourseDetailsForStudent = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModule, setOpenModule] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  // ================= FETCH COURSE =================
  const fetchCourse = async () => {
    try {
      let res;

      if (role === "educator") {
        res = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (role === "student") {
        res = await fetch(
          `http://localhost:5000/api/student/courses/${courseId}`
        );
      } else {
        navigate("/login");
        return;
      }

      const data = await res.json();

      if (data.success) {
        setCourse(data.course);

        // ✅ Check enrollment
        if (role === "student" && token) {
          const user = JSON.parse(localStorage.getItem("user"));
          if (data.course.enrolledStudents?.includes(user?.id)) {
            setIsEnrolled(true);
          }
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!role) {
      navigate("/login");
      return;
    }
    fetchCourse();
  }, [courseId]);

  // ================= ENROLL FUNCTION =================
  const handleEnroll = async () => {
    try {
      setEnrolling(true);

      const res = await fetch(
        `http://localhost:5000/api/courses/${courseId}/enroll`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setIsEnrolled(true);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading course...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Course not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-10 space-y-14">

        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <div className="flex flex-col md:flex-row gap-8 justify-between">

            <div className="flex gap-6 flex-col sm:flex-row">
              {course.thumbnail && (
                <img
                  src={course.thumbnail}
                  alt="thumbnail"
                  className="w-full sm:w-56 h-36 object-cover rounded-2xl"
                />
              )}

              <div className="space-y-4">
                <h1 className="text-3xl font-semibold text-gray-900">
                  {course.title}
                </h1>

                <p className="text-gray-500 max-w-2xl">
                  {course.shortDescription}
                </p>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                  <span><strong>Category:</strong> {course.category}</span>
                  <span><strong>Level:</strong> {course.level}</span>
                  <span><strong>Duration:</strong> {course.duration}</span>
                </div>
              </div>
            </div>

            {/* ================= ENROLL BUTTON ================= */}
            {role === "student" && (
              <div className="flex items-start">
                {!isEnrolled ? (
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-xl font-medium transition shadow-sm"
                  >
                    {enrolling ? "Enrolling..." : "Enroll Now"}
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/student/learn/${courseId}`)}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition shadow-sm"
                  >
                    Start Learning
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ================= MODULES ================= */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Course Curriculum
          </h2>

          {course.modules?.map((module, index) => {
            const isOpen = openModule === module._id;

            return (
              <div
                key={module._id}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
              >
                <div
                  onClick={() => setOpenModule(isOpen ? null : module._id)}
                  className="flex justify-between items-center px-6 py-5 cursor-pointer hover:bg-gray-50 transition"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Module {index + 1}: {module.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {module.lessons?.length || 0} Lessons ·{" "}
                      {module.quizzes?.length || 0} Quizzes
                    </p>
                  </div>

                  <FiChevronDown
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {isOpen && (
                  <div className="px-6 pb-8 space-y-4 border-t border-gray-100">
                    {module.lessons?.map((lesson, i) => (
                      <div
                        key={lesson._id}
                        className={`flex items-start gap-4 p-4 rounded-xl border ${
                          isEnrolled
                            ? "bg-gray-50 border-gray-100"
                            : "bg-gray-100 border-gray-200 opacity-70"
                        }`}
                      >
                        <FiBookOpen className="text-yellow-500 mt-1" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {i + 1}. {lesson.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Duration: {lesson.duration || "-"}
                          </p>

                          {!isEnrolled && (
                            <p className="text-xs text-red-400 mt-2">
                              Enroll to unlock this lesson
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetailsForStudent;
