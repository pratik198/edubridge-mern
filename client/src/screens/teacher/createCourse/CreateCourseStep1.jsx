import TeacherNavbar from "../../../components/teacher/TeacherNavbar";
import Footer from "../../../components/studentcomponents/Footer";
import CreateCourseSteps from "../../../components/teacher/createCourseComponents/CreateCourseSteps";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function CreateCourseStep1() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <TeacherNavbar />

      {/* PAGE CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
          {/* ===== STEPS ===== */}
          {/* Mobile / Tablet → TOP */}
          <div className="block md:hidden">
            <CreateCourseSteps currentStep={1} orientation="horizontal" />
          </div>

          {/* Desktop → LEFT */}
          <div className="hidden md:block">
            <CreateCourseSteps currentStep={1} orientation="vertical" />
          </div>

          {/* ===== FORM ===== */}
          <div className="flex-1 max-w-full lg:max-w-[820px]">
            {/* TITLE */}
            <h1 className="text-2xl font-semibold text-black">Basic Info</h1>
            <p className="text-gray-500 mt-2 mb-8 text-sm max-w-full lg:max-w-[520px]">
              Add the course title, description, category, and a thumbnail to
              introduce your course.
            </p>

            {/* FORM */}
            <div className="space-y-8">
              {/* ROW 1 — INPUTS + THUMBNAIL */}
              <div className="flex flex-col lg:flex-row gap-6">
                {/* INPUTS */}
                <div className="flex-1 space-y-4">
                  <input
                    type="text"
                    placeholder="Course Title"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Short Description"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
                  />
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-600">
                    <option>Category</option>
                  </select>
                </div>

                {/* THUMBNAIL */}
                <label
                  htmlFor="thumbnail"
                  className="
                    w-full lg:w-[260px] h-[180px]
                    border border-dashed border-gray-300 rounded-lg
                    flex flex-col items-center justify-center
                    text-gray-400 text-sm cursor-pointer
                    hover:border-yellow-400 transition
                  "
                >
                  <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center mb-3 text-lg">
                    <FiUpload />
                  </div>
                  Thumbnail Upload
                  <input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>

              {/* ROW 2 — OVERVIEW */}
              <textarea
                placeholder="Full Course Overview"
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-none"
              />

              {/* ROW 3 — LEVEL + DURATION */}
              <div className="flex flex-col sm:flex-row gap-6">
                <select className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-600">
                  <option>Level</option>
                </select>
                <select className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-600">
                  <option>Estimated Duration</option>
                </select>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-12">
              <button
                onClick={() => console.log("save btn clicked")}
                className="border border-gray-300 px-6 py-2 rounded-lg text-sm cursor-pointer"
              >
                Save as Draft
              </button>
              <button
                onClick={() => navigate("/teacher/create-course/step-2")}
                className="bg-yellow-400 px-7 py-2 rounded-lg text-sm font-medium"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// import TeacherNavbar from "../../../components/teacher/TeacherNavbar";
// import Footer from "../../../components/studentcomponents/Footer";
// import CreateCourseSteps from "../../../components/teacher/createCourseSteps/CreateCourseSteps";
// import { FiUpload } from "react-icons/fi";

// export default function CreateCourseStep1() {
//   return (
//     <div className="min-h-screen bg-white">
//       <TeacherNavbar />

//       {/* PAGE CONTENT */}
//       <div className="max-w-7xl mx-auto px-10 py-16">
//         <div className="flex gap-24">
//           {/* LEFT – STEPS (VERTICALLY CENTERED RELATIVE TO FORM) */}
//           <div className="flex justify-center">
//             <div className="mt-24">
//               <CreateCourseSteps currentStep={1} />
//             </div>
//           </div>

//           {/* RIGHT – FORM */}
//           <div className="flex-1 max-w-205">
//             {/* TITLE */}
//             <h1 className="text-2xl font-semibold text-black">Basic Info</h1>
//             <p className="text-gray-500 mt-2 mb-10 text-sm max-w-130">
//               Add the course title, description, category, and a thumbnail to
//               introduce your course.
//             </p>

//             {/* FORM */}
//             <div className="basic-form-input space-y-8">
//               {/* ROW 1 — INPUT STACK + THUMBNAIL */}
//               <div className="flex gap-10">
//                 {/* LEFT INPUTS */}
//                 <div className="flex-1 space-y-4">
//                   <input
//                     type="text"
//                     placeholder="Course Title"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
//                   />

//                   <input
//                     type="text"
//                     placeholder="Short Description"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
//                   />

//                   <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-600">
//                     <option>Category</option>
//                   </select>
//                 </div>

//                 {/* THUMBNAIL
//                 <div className="w-90 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 text-sm">
//                   <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center mb-3 text-lg">
//                     ↑
//                   </div>
//                   Thumbnail Upload
//                 </div> */}

//                 {/* THUMBNAIL */}
//                 <label
//                   htmlFor="thumbnail"
//                   className="w-90 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 text-sm cursor-pointer hover:border-yellow-400 transition"
//                 >
//                   <div
//                     className="w-10 h-10 border border-gray-300 rounded-full
//                   flex items-center justify-center mb-3 text-lg"
//                   >
//                     <FiUpload />
//                   </div>
//                   Thumbnail Upload
//                   <input
//                     id="thumbnail"
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                   />
//                 </label>
//               </div>

//               {/* ROW 2 — FULL COURSE OVERVIEW */}
//               <textarea
//                 placeholder="Full Course Overview"
//                 rows={5}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-none"
//               />

//               {/* ROW 3 — LEVEL + DURATION */}
//               <div className="flex gap-6">
//                 <select className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-600">
//                   <option>Level</option>
//                 </select>

//                 <select className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-600">
//                   <option>Estimated Duration</option>
//                 </select>
//               </div>
//             </div>

//             {/* ACTION BUTTONS */}
//             <div className="flex justify-end gap-4 mt-16">
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
