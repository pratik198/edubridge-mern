import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/studentcomponents/Navbar";
import Footer from "../../../components/studentcomponents/Footer";
import { courses } from "../../../data/courses";

const EnrolledCourses = () => {
  const filters = [
    { id: 1, label: "All", count: 7, dot: null },
    { id: 2, label: "In Progress", count: 3, dot: "bg-yellow-400" },
    { id: 3, label: "Completed", count: 2, dot: "bg-green-500" },
    { id: 4, label: "Not Started", count: 2, dot: "bg-red-500" },
  ];

  const [activeFilter, setActiveFilter] = useState("All");

  // ✅ ALL COURSES OPEN BY DEFAULT
  const [openCourses, setOpenCourses] = useState(
    courses.map((course) => course._id),
  );

  const toggleCourse = (id) => {
    setOpenCourses((prev) =>
      prev.includes(id)
        ? prev.filter((courseId) => courseId !== id)
        : [...prev, id],
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
          <h1 className="text-3xl font-bold text-gray-900 mb-5">My Courses</h1>

          {/* SORT */}
          <div className="flex gap-3 mb-5">
            <button className="bg-white border border-gray-300 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
              ↕ Sort ▾
            </button>
            <button className="bg-white border border-gray-300 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
              ☰ Category ▾
            </button>
          </div>

          {/* FILTERS */}
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
                    {filter.count}
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
                <div key={course.id}>
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
                        // ✅ BUTTON LOGIC
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

                            {/* NAVIGATION */}
                            <Link
                              to={`/student-course/${course._id}/${module._id}/${module.lessons[0]._id}`}
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

// import { useState } from "react";
// import Navbar from "../../../components/studentcomponents/Navbar";
// import Footer from "../../../components/studentcomponents/Footer";

// const EnrolledCourses = () => {
//   const filters = [
//     { id: 1, label: "All", count: 7, dot: null },
//     { id: 2, label: "In Progress", count: 3, dot: "bg-yellow-400" },
//     { id: 3, label: "Completed", count: 2, dot: "bg-green-500" },
//     { id: 4, label: "Not Started", count: 2, dot: "bg-red-500" },
//   ];

//   const [activeFilter, setActiveFilter] = useState("All");
//   const [openCourses, setOpenCourses] = useState([1]);

//   const toggleCourse = (id) => {
//     setOpenCourses((prev) =>
//       prev.includes(id)
//         ? prev.filter((courseId) => courseId !== id)
//         : [...prev, id],
//     );
//   };

//   const courses = [
//     {
//       id: 1,
//       title: "Introduction to Python Programming",
//       modulesCount: 3,
//       duration: "7 hours",
//       completed: true,
//       modules: [
//         { id: 1, title: "Module 1: Python Fundamentals", progress: 100 },
//         { id: 2, title: "Module 2: Control Flow in Python", progress: 100 },
//         {
//           id: 3,
//           title: "Module 3: Project – Build a Simple App",
//           progress: 100,
//         },
//       ],
//     },
//     {
//       id: 2,
//       title: "UI/UX Design Masterclass",
//       modulesCount: 4,
//       duration: "5 hours",
//       completed: false,
//       modules: [
//         { id: 1, title: "Module 1: Introduction to UI/UX", progress: 100 },
//         { id: 2, title: "Module 2: UX Research", progress: 60 },
//         { id: 3, title: "Module 3: Wireframing Basics", progress: 30 },
//         { id: 4, title: "Module 4: Final Project", progress: 0 },
//       ],
//     },
//   ];

//   return (
//     <>
//       {/* FIXED NAVBAR */}
//       <div className="fixed top-0 left-0 w-full z-50 bg-white">
//         <Navbar />
//       </div>

//       {/* PAGE CONTENT */}
//       <div className="bg-white min-h-screen pt-24 flex flex-col">
//         {/* MAIN CONTENT */}
//         <div className="flex-1 px-8 lg:px-16 py-10">
//           <h1 className="text-3xl font-bold text-gray-900 mb-5">My Courses</h1>

//           {/* SORT */}
//           <div className="flex gap-3 mb-5">
//             <button className="bg-white border border-gray-300 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
//               ↕ Sort ▾
//             </button>
//             <button className="bg-white border border-gray-300 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
//               ☰ Category ▾
//             </button>
//           </div>

//           {/* FILTERS */}
//           <div className="flex gap-3 mb-8 flex-wrap">
//             {filters.map((filter) => {
//               const isActive = activeFilter === filter.label;

//               return (
//                 <button
//                   key={filter.id}
//                   onClick={() => setActiveFilter(filter.label)}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm border border-gray-300 transition ${
//                     isActive
//                       ? "bg-gray-200 text-gray-900"
//                       : "bg-white text-gray-700 hover:bg-gray-100"
//                   }`}
//                 >
//                   {filter.dot && (
//                     <span
//                       className={`w-2 h-2 rounded-full ${filter.dot}`}
//                     ></span>
//                   )}
//                   {filter.label}
//                   <span className="bg-gray-300 text-gray-800 text-xs px-2 py-0.5 rounded-full">
//                     {filter.count}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>

//           {/* COURSES */}
//           <div className="space-y-8">
//             {courses.map((course) => {
//               const isOpen = openCourses.includes(course.id);

//               return (
//                 <div key={course.id}>
//                   {/* HEADER */}
//                   <div
//                     onClick={() => toggleCourse(course.id)}
//                     className="flex justify-between items-center cursor-pointer border-b border-gray-300 pb-2"
//                   >
//                     <div className="flex items-center gap-3">
//                       {course.completed && (
//                         <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">
//                           ✓
//                         </span>
//                       )}

//                       <h2 className="text-lg font-semibold text-gray-900">
//                         {course.title}
//                       </h2>

//                       <span className="text-sm text-gray-500">
//                         {course.modulesCount} Modules • {course.duration}
//                       </span>
//                     </div>

//                     <span className="text-gray-500 text-sm">
//                       {isOpen ? "▴" : "▾"}
//                     </span>
//                   </div>

//                   {isOpen && (
//                     <div className="mt-5 space-y-4">
//                       {course.modules.map((module) => {
//                         const buttonText =
//                           module.progress === 100
//                             ? "View"
//                             : module.progress > 0
//                               ? "Resume"
//                               : "Start";

//                         const progressColor =
//                           module.progress === 100
//                             ? "bg-green-600"
//                             : module.progress > 0
//                               ? "bg-yellow-400"
//                               : "bg-red-400";

//                         return (
//                           <div
//                             key={module.id}
//                             className="bg-gray-50 border border-gray-300 rounded-lg px-5 py-4 flex justify-between items-center"
//                           >
//                             <div className="w-[70%]">
//                               <div className="flex items-center gap-2">
//                                 <span
//                                   className={`w-2 h-2 rounded-full ${progressColor}`}
//                                 ></span>
//                                 <p className="font-medium text-gray-900">
//                                   {module.title}
//                                 </p>
//                               </div>

//                               <p className="text-sm text-gray-500 mt-1">
//                                 {module.progress === 0
//                                   ? "Not Started"
//                                   : `${module.progress}% Complete`}
//                               </p>

//                               <div className="mt-3 w-[85%] bg-gray-300 rounded-full h-1.5">
//                                 <div
//                                   className={`${progressColor} h-1.5 rounded-full`}
//                                   style={{ width: `${module.progress}%` }}
//                                 ></div>
//                               </div>
//                             </div>

//                             <button className="bg-yellow-400 px-6 py-2 rounded-md text-sm font-medium">
//                               {buttonText}
//                             </button>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* FOOTER (at bottom) */}
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default EnrolledCourses;
