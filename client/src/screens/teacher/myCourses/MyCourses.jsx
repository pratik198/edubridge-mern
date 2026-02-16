
// import TeacherNavbar from "../../../components/teacher/TeacherNavbar";
// import Footer from "../../../components/studentcomponents/Footer";
// import MyCoursesTable from "../../../components/teacher/myCoursesTable/MyCoursesTable";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// const MyCourses = () => {
//   const navigate = useNavigate();
//   const [courses, setCourses] = useState([]);
//   const token = localStorage.getItem("token");

//   const fetchCourses = async () => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/courses/my-courses",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 401) {
//         localStorage.removeItem("token");
//         navigate("/login");
//         return;
//       }

//       const data = await response.json();

//       const formatted = data.courses.map((course) => ({
//         _id: course._id,
//         title: course.title,
//         status: course.isPublished ? "Published" : "Draft",
//         enrollments: course.enrollments || 0,
//         completion: course.completion || "0%",
//         updated: new Date(course.updatedAt).toLocaleDateString(),
//       }));

//       setCourses(formatted);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const handleDelete = async (courseId) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this course?"
//     );
//     if (!confirmDelete) return;

//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/courses/${courseId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await response.json();

//       if (data.success) {
//         fetchCourses();
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleEdit = (courseId) => {
//     localStorage.setItem("currentCourseId", courseId);
//     navigate("/teacher/create-course/step-1");
//   };

//   const dataWithActions = courses.map((course) => ({
//     ...course,
//     onEdit: () => handleEdit(course._id),
//     onDelete: () => handleDelete(course._id),
//   }));

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <TeacherNavbar />

//       <main className="flex-1 p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">My Courses</h1>

//           <button
//             onClick={() => {
//               localStorage.removeItem("currentCourseId");
//               navigate("/teacher/create-course/step-1");
//             }}
//             className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg font-medium"
//           >
//             + Create New Course
//           </button>
//         </div>

//         <MyCoursesTable data={dataWithActions} />
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default MyCourses;


import TeacherNavbar from "../../../components/teacher/TeacherNavbar";
import Footer from "../../../components/studentcomponents/Footer";
import MyCoursesTable from "../../../components/teacher/myCoursesTable/MyCoursesTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MyCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");

  const fetchCourses = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/courses/my-courses",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await response.json();

      const formatted = data.courses.map((course) => ({
        _id: course._id,
        title: course.title,
        status: course.isPublished ? "Published" : "Draft",
        enrollments: course.enrollments || 0,
        completion: course.completion || "0%",
        updated: new Date(course.updatedAt).toLocaleDateString(),
      }));

      setCourses(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEdit = (courseId) => {
    localStorage.setItem("currentCourseId", courseId);
    navigate("/teacher/create-course/step-1");
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm("Delete this course?")) return;

    await fetch(`http://localhost:5000/api/courses/${courseId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchCourses();
  };

  const dataWithActions = courses.map((course) => ({
    ...course,
    onEdit: () => handleEdit(course._id),
    onDelete: () => handleDelete(course._id),
  }));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TeacherNavbar />
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Courses</h1>
          <button
            onClick={() => {
              localStorage.removeItem("currentCourseId");
              navigate("/teacher/create-course/step-1");
            }}
            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg font-medium"
          >
            + Create New Course
          </button>
        </div>
        <MyCoursesTable data={dataWithActions} />
      </main>
      <Footer />
    </div>
  );
};

export default MyCourses;
