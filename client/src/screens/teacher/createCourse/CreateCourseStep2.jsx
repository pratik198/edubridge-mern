
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import TeacherNavbar from "../../../components/teacher/TeacherNavbar";
// import Footer from "../../../components/studentcomponents/Footer";
// import CreateCourseSteps from "../../../components/teacher/createCourseComponents/CreateCourseSteps";
// import Modal from "../../../components/common/modal/Modal";
// import AddLessonForm from "../../../components/teacher/createCourseComponents/AddLessonForm";
// import AddQuizForm from "../../../components/teacher/createCourseComponents/AddQuizForm";

// import { FiPlus, FiMenu, FiTrash } from "react-icons/fi";

// const CreateCourseStep2 = () => {
//   const navigate = useNavigate();

//   const courseId = localStorage.getItem("currentCourseId");
//   const token = localStorage.getItem("token");

//   const [modules, setModules] = useState([]);
//   const [activeModuleIndex, setActiveModuleIndex] = useState(0);
//   const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
//   const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

//   /* ================= FETCH COURSE ================= */
//   const fetchCourse = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/courses/${courseId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const data = await res.json();

//       if (data.success) {
//         setModules(data.course.modules || []);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (!courseId) {
//       navigate("/teacher/create-course/step-1");
//       return;
//     }
//     fetchCourse();
//   }, []);

//   /* ================= ADD MODULE ================= */
//   const addModule = async () => {
//     try {
//       const moduleTitle = `Module ${modules.length + 1}`;

//       const res = await fetch(
//         `http://localhost:5000/api/courses/${courseId}/add-module`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ moduleTitle }),
//         }
//       );

//       const data = await res.json();
//       if (data.success) setModules(data.modules);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   /* ================= ADD LESSON ================= */
//   const addLessonToModule = async (lesson) => {
//     const moduleId = modules[activeModuleIndex]._id;

//     const res = await fetch(
//       `http://localhost:5000/api/courses/${courseId}/${moduleId}/add-lesson`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(lesson),
//       }
//     );

//     const data = await res.json();
//     if (data.success) setModules(data.course.modules);
//   };

//   /* ================= ADD QUIZ ================= */
//   const addQuizToModule = async (quiz) => {
//     const moduleId = modules[activeModuleIndex]._id;

//     const res = await fetch(
//       `http://localhost:5000/api/courses/${courseId}/${moduleId}/add-quiz`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(quiz),
//       }
//     );

//     const data = await res.json();
//     if (data.success) setModules(data.course.modules);
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <TeacherNavbar />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
//         <div className="flex flex-col md:flex-row gap-10 md:gap-20">

//           <div className="hidden md:block">
//             <CreateCourseSteps currentStep={2} />
//           </div>

//           <div className="flex-1 max-w-full lg:max-w-[820px]">
//             <h1 className="text-2xl font-semibold text-black">
//               Curriculum Builder
//             </h1>

//             <p className="text-gray-500 mt-2 mb-8 text-sm max-w-[520px]">
//               Structure your course by creating modules, lessons, and quizzes.
//             </p>

//             <button
//               onClick={addModule}
//               className="flex items-center gap-2 border border-gray-300 px-5 py-2 rounded-md text-sm"
//             >
//               <FiPlus />
//               Add Module
//             </button>

//             <div className="mt-8 border border-gray-200 rounded-md overflow-hidden bg-gray-50">
//               {modules.map((module, mIndex) => (
//                 <div key={module._id}>
                  
//                   {/* MODULE HEADER */}
//                   <div className="px-6 py-3 bg-gray-100 text-sm font-semibold text-gray-800 border-b border-b-gray-200 flex justify-between">
//                     {module.title}
//                   </div>

//                   {/* LESSONS */}
//                   {module.lessons?.map((lesson, lIndex) => (
//                     <div key={lIndex}
//                       className="bg-white px-6 py-4 flex items-center justify-between border-b border-b-gray-200">
//                       <div className="flex items-start gap-4">
//                         <FiMenu className="text-gray-400 mt-1" />
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">
//                             {lesson.title}
//                           </p>
//                           <p className="text-xs text-gray-400 mt-0.5">
//                             Video · {lesson.duration}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}

//                   {/* QUIZ PRODUCTION UI */}
//                   {module.quizzes?.map((quiz, qIndex) => (
//                     <div
//                       key={qIndex}
//                       className="bg-white px-6 py-4 border-b border-b-gray-200"
//                     >
//                       <div className="flex items-start gap-4">
//                         <FiMenu className="text-gray-400 mt-1" />
//                         <div className="w-full">
//                           <div className="flex justify-between items-center">
//                             <p className="text-sm font-semibold text-gray-900">
//                               {quiz.title}
//                             </p>
//                             <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
//                               Quiz
//                             </span>
//                           </div>

//                           <p className="text-xs text-gray-400 mt-1">
//                             {quiz.questions?.length || 0} Questions
//                           </p>

//                           {/* Question Preview */}
//                           <div className="mt-3 space-y-2">
//                             {quiz.questions?.slice(0, 2).map((q, index) => (
//                               <div
//                                 key={index}
//                                 className="bg-gray-50 p-2 rounded-md text-xs text-gray-700"
//                               >
//                                 {q.question}
//                               </div>
//                             ))}
//                             {quiz.questions?.length > 2 && (
//                               <p className="text-xs text-gray-400">
//                                 + {quiz.questions.length - 2} more questions
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}

//                   {/* ACTIONS */}
//                   <div className="grid grid-cols-2 text-sm">
//                     <button
//                       onClick={() => {
//                         setActiveModuleIndex(mIndex);
//                         setIsLessonModalOpen(true);
//                       }}
//                       className="py-3 flex items-center justify-center gap-2 bg-white border-r border-r-gray-200"
//                     >
//                       <FiPlus />
//                       Add Lesson
//                     </button>

//                     <button
//                       onClick={() => {
//                         setActiveModuleIndex(mIndex);
//                         setIsQuizModalOpen(true);
//                       }}
//                       className="py-3 flex items-center justify-center gap-2 bg-white"
//                     >
//                       <FiPlus />
//                       Add Quiz
//                     </button>
//                   </div>

//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-end gap-4 mt-12">
//               <button
//                 onClick={() => navigate("/teacher/create-course/step-3")}
//                 className="bg-yellow-400 px-7 py-2 rounded-lg text-sm font-medium"
//               >
//                 Continue
//               </button>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* MODALS */}
//       <Modal
//         isOpen={isLessonModalOpen}
//         onClose={() => setIsLessonModalOpen(false)}
//         title="Lesson"
//       >
//         <AddLessonForm
//           onClose={() => setIsLessonModalOpen(false)}
//           onSave={addLessonToModule}
//         />
//       </Modal>

//       <Modal
//         isOpen={isQuizModalOpen}
//         onClose={() => setIsQuizModalOpen(false)}
//         title="Quiz"
//       >
//         <AddQuizForm
//           onClose={() => setIsQuizModalOpen(false)}
//           onSave={addQuizToModule}
//         />
//       </Modal>

//       <Footer />
//     </div>
//   );
// };

// export default CreateCourseStep2;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import TeacherNavbar from "../../../components/teacher/TeacherNavbar";
import Footer from "../../../components/studentcomponents/Footer";
import CreateCourseSteps from "../../../components/teacher/createCourseComponents/CreateCourseSteps";
import Modal from "../../../components/common/modal/Modal";
import AddLessonForm from "../../../components/teacher/createCourseComponents/AddLessonForm";
import AddQuizForm from "../../../components/teacher/createCourseComponents/AddQuizForm";

import { FiPlus, FiMenu, FiTrash } from "react-icons/fi";

const CreateCourseStep2 = () => {
  const navigate = useNavigate();

  const courseId = localStorage.getItem("currentCourseId");
  const token = localStorage.getItem("token");

  const [modules, setModules] = useState([]);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  /* ================= FETCH COURSE ================= */
  const fetchCourse = async () => {
    const res = await fetch(
      `http://localhost:5000/api/courses/${courseId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();
    if (data.success) setModules(data.course.modules || []);
  };

  useEffect(() => {
    if (!courseId) {
      navigate("/teacher/create-course/step-1");
      return;
    }
    fetchCourse();
  }, []);

  /* ================= ADD MODULE ================= */
  const addModule = async () => {
    const moduleTitle = `Module ${modules.length + 1}`;

    const res = await fetch(
      `http://localhost:5000/api/courses/${courseId}/add-module`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ moduleTitle }),
      }
    );

    const data = await res.json();
    if (data.success) setModules(data.modules);
  };

  /* ================= DELETE MODULE ================= */
  const deleteModule = async (moduleId) => {
    const updatedModules = modules.filter(
      (module) => module._id !== moduleId
    );

    await fetch(
      `http://localhost:5000/api/courses/${courseId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ modules: updatedModules }),
      }
    );

    fetchCourse();
  };

  /* ================= ADD LESSON ================= */
  const addLessonToModule = async (lesson) => {
    const moduleId = modules[activeModuleIndex]._id;

    const res = await fetch(
      `http://localhost:5000/api/courses/${courseId}/${moduleId}/add-lesson`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(lesson),
      }
    );

    const data = await res.json();
    if (data.success) setModules(data.course.modules);
  };

  /* ================= DELETE LESSON ================= */
  const deleteLesson = async (moduleId, lessonIndex) => {
    const updatedModules = [...modules];
    const module = updatedModules.find((m) => m._id === moduleId);

    module.lessons.splice(lessonIndex, 1);

    await fetch(
      `http://localhost:5000/api/courses/${courseId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ modules: updatedModules }),
      }
    );

    fetchCourse();
  };

  /* ================= ADD QUIZ ================= */
  const addQuizToModule = async (quiz) => {
    const moduleId = modules[activeModuleIndex]._id;

    const res = await fetch(
      `http://localhost:5000/api/courses/${courseId}/${moduleId}/add-quiz`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(quiz),
      }
    );

    const data = await res.json();
    if (data.success) setModules(data.course.modules);
  };

  /* ================= DELETE QUIZ ================= */
  const deleteQuiz = async (moduleId, quizId) => {
    await fetch(
      `http://localhost:5000/api/courses/${courseId}/${moduleId}/${quizId}/delete-quiz`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchCourse();
  };

  return (
    <div className="min-h-screen bg-white">
      <TeacherNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">

          <div className="hidden md:block">
            <CreateCourseSteps currentStep={2} />
          </div>

          <div className="flex-1 max-w-full lg:max-w-[820px]">
            <h1 className="text-2xl font-semibold text-black">
              Curriculum Builder
            </h1>

            <p className="text-gray-500 mt-2 mb-8 text-sm max-w-[520px]">
              Structure your course by creating modules, lessons, and quizzes.
            </p>

            <button
              onClick={addModule}
              className="flex items-center gap-2 border border-gray-300 px-5 py-2 rounded-md text-sm"
            >
              <FiPlus />
              Add Module
            </button>

            <div className="mt-8 border border-gray-200 rounded-md overflow-hidden bg-gray-50">
              {modules.map((module, mIndex) => (
                <div key={module._id}>

                  {/* MODULE HEADER */}
                  <div className="px-6 py-3 bg-gray-100 text-sm font-semibold text-gray-800 border-b border-b-gray-200 flex justify-between items-center">
                    {module.title}
                    <FiTrash
                      className="cursor-pointer text-gray-400 hover:text-red-500"
                      onClick={() => deleteModule(module._id)}
                    />
                  </div>

                  {/* LESSONS */}
                  {module.lessons?.map((lesson, lIndex) => (
                    <div
                      key={lIndex}
                      className="bg-white px-6 py-4 flex items-center justify-between border-b border-b-gray-200"
                    >
                      <div className="flex items-start gap-4">
                        <FiMenu className="text-gray-400 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {lesson.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Video · {lesson.duration}
                          </p>
                        </div>
                      </div>
                      <FiTrash
                        className="text-gray-400 cursor-pointer hover:text-red-500"
                        onClick={() =>
                          deleteLesson(module._id, lIndex)
                        }
                      />
                    </div>
                  ))}

                  {/* QUIZZES */}
                  {module.quizzes?.map((quiz, qIndex) => (
                    <div
                      key={quiz._id}
                      className="bg-white px-6 py-4 flex justify-between border-b border-b-gray-200"
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {quiz.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {quiz.questions?.length || 0} Questions
                        </p>
                      </div>
                      <FiTrash
                        className="text-gray-400 cursor-pointer hover:text-red-500"
                        onClick={() =>
                          deleteQuiz(module._id, quiz._id)
                        }
                      />
                    </div>
                  ))}

                  {/* ACTIONS */}
                  <div className="grid grid-cols-2 text-sm">
                    <button
                      onClick={() => {
                        setActiveModuleIndex(mIndex);
                        setIsLessonModalOpen(true);
                      }}
                      className="py-3 flex items-center justify-center gap-2 bg-white border-r border-r-gray-200"
                    >
                      <FiPlus />
                      Add Lesson
                    </button>

                    <button
                      onClick={() => {
                        setActiveModuleIndex(mIndex);
                        setIsQuizModalOpen(true);
                      }}
                      className="py-3 flex items-center justify-center gap-2 bg-white"
                    >
                      <FiPlus />
                      Add Quiz
                    </button>
                  </div>

                </div>
              ))}
            </div>

            <div className="flex justify-end gap-4 mt-12">
              <button
                onClick={() => navigate("/teacher/create-course/step-3")}
                className="bg-yellow-400 px-7 py-2 rounded-lg text-sm font-medium"
              >
                Continue
              </button>
            </div>

          </div>
        </div>
      </div>

      <Modal
        isOpen={isLessonModalOpen}
        onClose={() => setIsLessonModalOpen(false)}
        title="Lesson"
      >
        <AddLessonForm
          onClose={() => setIsLessonModalOpen(false)}
          onSave={addLessonToModule}
        />
      </Modal>

      <Modal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        title="Quiz"
      >
        <AddQuizForm
          onClose={() => setIsQuizModalOpen(false)}
          onSave={addQuizToModule}
        />
      </Modal>

      <Footer />
    </div>
  );
};

export default CreateCourseStep2;
