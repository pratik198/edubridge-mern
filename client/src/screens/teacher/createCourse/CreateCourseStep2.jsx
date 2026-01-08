import { useState } from "react";
import TeacherNavbar from "../../../components/teacher/TeacherNavbar";
import Footer from "../../../components/studentcomponents/Footer";
import CreateCourseSteps from "../../../components/teacher/createCourseComponents/CreateCourseSteps";

import Modal from "../../../components/common/modal/Modal";
import AddLessonForm from "../../../components/teacher/createCourseComponents/AddLessonForm";
import AddQuizForm from "../../../components/teacher/createCourseComponents/AddQuizForm";

import { FiPlus, FiMoreVertical, FiMenu } from "react-icons/fi";

export default function CreateCourseStep2() {
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <TeacherNavbar />

      {/* PAGE CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
          {/* ===== STEPS ===== */}
          <div className="block md:hidden">
            <CreateCourseSteps currentStep={2} orientation="horizontal" />
          </div>

          <div className="hidden md:block">
            <CreateCourseSteps currentStep={2} orientation="vertical" />
          </div>

          {/* ===== MAIN CONTENT ===== */}
          <div className="flex-1 max-w-full lg:max-w-[820px]">
            {/* TITLE */}
            <h1 className="text-2xl font-semibold text-black">
              Curriculum Builder
            </h1>
            <p className="text-gray-500 mt-2 mb-8 text-sm max-w-[520px]">
              Structure your course by creating modules, lessons, and quizzes.
            </p>

            {/* PREVIEW + ADD MODULE */}
            <div className="flex flex-col items-start gap-6 mb-6">
              <button className="text-sm text-blue-600 font-medium">
                Preview
              </button>

              <button className="flex items-center gap-2 border border-gray-300 px-5 py-2 rounded-md text-sm hover:border-yellow-400 transition">
                <FiPlus />
                Add Module
              </button>
            </div>

            {/* ===== MODULE PANEL ===== */}
            <div className="border border-gray-200 rounded-md overflow-hidden bg-gray-50">
              {/* MODULE HEADER */}
              <div className="px-6 py-3 bg-gray-100 text-sm font-semibold text-gray-800 border-b border-b-gray-200">
                Module 1
              </div>

              {/* LESSON ROW */}
              <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-b-gray-200">
                <div className="flex items-start gap-4">
                  <FiMenu className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Lesson 1: Getting Started
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Video · 5 min
                    </p>
                  </div>
                </div>
                <FiMoreVertical className="text-gray-400 cursor-pointer" />
              </div>

              {/* QUIZ ROW */}
              <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-b-gray-200">
                <div className="flex items-start gap-4">
                  <FiMenu className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Quiz 1: Lesson 1
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Quiz · 10 min
                    </p>
                  </div>
                </div>
                <FiMoreVertical className="text-gray-400 cursor-pointer" />
              </div>

              {/* ADD ACTIONS */}
              <div className="grid grid-cols-2 text-sm">
                <button
                  onClick={() => setIsLessonModalOpen(true)}
                  className="py-3 flex items-center justify-center gap-2 bg-white border-r border-r-gray-200 hover:bg-gray-300 transition"
                >
                  <FiPlus />
                  Add Lesson
                </button>

                <button
                  onClick={() => setIsQuizModalOpen(true)}
                  className="py-3 flex items-center justify-center gap-2 bg-white hover:bg-gray-300 transition"
                >
                  <FiPlus />
                  Add Quiz
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-12">
              <button className="border border-gray-300 px-6 py-2 rounded-lg text-sm">
                Save as Draft
              </button>
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

      {/* ===== ADD LESSON MODAL ===== */}
      <Modal
        isOpen={isLessonModalOpen}
        onClose={() => setIsLessonModalOpen(false)}
        title="Lesson"
      >
        <AddLessonForm onClose={() => setIsLessonModalOpen(false)} />
      </Modal>

      {/* ===== ADD QUIZ MODAL ===== */}
      <Modal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        title="Quiz"
        maxWidth="max-w-lg"
      >
        <AddQuizForm onClose={() => setIsQuizModalOpen(false)} />
      </Modal>

      <Footer />
    </div>
  );
}

// import TeacherNavbar from "../../../components/teacher/TeacherNavbar";
// import Footer from "../../../components/studentcomponents/Footer";
// import CreateCourseSteps from "../../../components/teacher/createCourseComponents/CreateCourseSteps";
// import { FiPlus, FiMoreVertical, FiMenu } from "react-icons/fi";

// export default function CreateCourseStep2() {
//   return (
//     <div className="min-h-screen bg-white">
//       <TeacherNavbar />

//       {/* PAGE CONTENT */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
//         <div className="flex flex-col md:flex-row gap-10 md:gap-20">
//           {/* ===== STEPS ===== */}
//           <div className="block md:hidden">
//             <CreateCourseSteps currentStep={2} orientation="horizontal" />
//           </div>

//           <div className="hidden md:block">
//             <CreateCourseSteps currentStep={2} orientation="vertical" />
//           </div>

//           {/* ===== MAIN CONTENT ===== */}
//           <div className="flex-1 max-w-full lg:max-w-[820px]">
//             {/* TITLE */}
//             <h1 className="text-2xl font-semibold text-black">
//               Curriculum Builder
//             </h1>
//             <p className="text-gray-500 mt-2 mb-8 text-sm max-w-[520px]">
//               Structure your course by creating modules, lessons, and quizzes.
//             </p>

//             {/* PREVIEW + ADD MODULE */}
//             <div className="flex flex-col items-start gap-6 mb-6">
//               <button className="text-sm text-blue-600 font-medium">
//                 Preview
//               </button>

//               <button className="flex items-center gap-2 border border-gray-300 px-5 py-2 rounded-md text-sm hover:border-yellow-400 transition">
//                 <FiPlus />
//                 Add Module
//               </button>
//             </div>

//             {/* ===== MODULE PANEL ===== */}
//             <div className="border border-gray-200 rounded-md overflow-hidden bg-gray-50">
//               {/* MODULE HEADER */}
//               <div className="px-6 py-3 bg-gray-100 text-sm font-semibold text-gray-800 border-b border-b-gray-200">
//                 Module 1
//               </div>

//               {/* LESSON ROW */}
//               <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-b-gray-200">
//                 <div className="flex items-start gap-4">
//                   <FiMenu className="text-gray-400 mt-1" />
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">
//                       Lesson 1: Getting Started
//                     </p>
//                     <p className="text-xs text-gray-400 mt-0.5">
//                       Video · 5 min
//                     </p>
//                   </div>
//                 </div>
//                 <FiMoreVertical className="text-gray-400 cursor-pointer" />
//               </div>

//               {/* QUIZ ROW */}
//               <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-b-gray-200">
//                 <div className="flex items-start gap-4">
//                   <FiMenu className="text-gray-400 mt-1" />
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">
//                       Quiz 1: Lesson 1
//                     </p>
//                     <p className="text-xs text-gray-400 mt-0.5">
//                       Quiz · 10 min
//                     </p>
//                   </div>
//                 </div>
//                 <FiMoreVertical className="text-gray-400 cursor-pointer" />
//               </div>

//               {/* ADD ACTIONS */}
//               <div className="grid grid-cols-2 text-sm">
//                 <button className="py-3 flex items-center justify-center gap-2 bg-white border-r border-r-gray-200 hover:bg-gray-300 transition">
//                   <FiPlus />
//                   Add Lesson
//                 </button>
//                 <button className="py-3 flex items-center justify-center gap-2 bg-white hover:bg-gray-300 transition">
//                   <FiPlus />
//                   Add Quiz
//                 </button>
//               </div>
//             </div>

//             {/* ACTION BUTTONS */}
//             <div className="flex flex-col sm:flex-row justify-end gap-4 mt-12">
//               <button className="border border-gray-300 px-6 py-2 rounded-lg text-sm">
//                 Save as Draft
//               </button>
//               <button className="bg-yellow-400 px-7 py-2 rounded-lg text-sm font-medium">
//                 Continue
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }
