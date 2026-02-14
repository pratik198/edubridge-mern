// import TeacherNavbar from "../../../components/teacher/TeacherNavbar";
// import { IoIosArrowDown } from "react-icons/io";
// import Footer from "../../../components/studentcomponents/Footer";
// import MyCoursesTable from "../../../components/teacher/myCoursesTable/MyCoursesTable";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const MyCourses = () => {
//   const navigate = useNavigate();
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         console.log("Token:", token);
//         if (!token) {
//           // If no token → redirect to login
//           navigate("/login");
//           return;
//         }

//         const response = await axios.get(
//           "http://localhost:8080/api/courses/my-courses",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         // Format backend data for table
//         const formattedCourses = response.data.courses.map((course) => ({
//           _id: course._id,
//           title: course.title,
//           status: course.isPublished ? "Published" : "Draft",
//           enrollments: course.enrollments || 0,
//           completion: course.completion || "0%",
//           updated: new Date(course.updatedAt).toLocaleDateString(),
//         }));

//         setCourses(formattedCourses);
//       } catch (error) {
//         console.error("Error fetching courses:", error);

//         // If token expired or invalid
//         if (error.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }
//       }
//     };

//     fetchCourses();
//   }, [navigate]);

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       {/* 🔝 TOP NAVBAR */}
//       <TeacherNavbar />

//       {/* 🧠 MAIN CONTENT */}
//       <main className="flex-1 p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">My Courses</h1>
//           <button
//             onClick={() => navigate("/teacher/create-course/step-1")}
//             className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg font-medium"
//           >
//             + Create New Course
//           </button>
//         </div>

//         <div className="flex gap-3 mb-4">
//           {["Published", "Draft", "Archived"].map((item) => (
//             <button
//               key={item}
//               className="px-4 py-1 border rounded-full text-sm hover:bg-gray-100"
//             >
//               {item}
//             </button>
//           ))}

//           <button className="px-4 py-1 border rounded-full text-sm ml-auto flex justify-center items-center gap-1">
//             Sort By <IoIosArrowDown size={12} />
//           </button>
//         </div>

//         <MyCoursesTable data={courses} />
//       </main>

//       {/* 🔚 FOOTER */}
//       <Footer />
//     </div>
//   );
// };

// export default MyCourses;



import TeacherNavbar from "../../../components/teacher/TeacherNavbar";
import { IoIosArrowDown } from "react-icons/io";
import Footer from "../../../components/studentcomponents/Footer";
import MyCoursesTable from "../../../components/teacher/myCoursesTable/MyCoursesTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MyCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");

      console.log("Token from localStorage:", token);

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8080/api/courses/my-courses",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          console.log("Unauthorized - redirecting");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const data = await response.json();

        const formattedCourses = data.courses.map((course) => ({
          _id: course._id,
          title: course.title,
          status: course.isPublished ? "Published" : "Draft",
          enrollments: course.enrollments || 0,
          completion: course.completion || "0%",
          updated: new Date(course.updatedAt).toLocaleDateString(),
        }));

        setCourses(formattedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 🔝 TOP NAVBAR */}
      <TeacherNavbar />

      {/* 🧠 MAIN CONTENT */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Courses</h1>
          <button
            onClick={() => navigate("/teacher/create-course/step-1")}
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

        <MyCoursesTable data={courses} />
      </main>

      {/* 🔚 FOOTER */}
      <Footer />
    </div>
  );
};

export default MyCourses;
