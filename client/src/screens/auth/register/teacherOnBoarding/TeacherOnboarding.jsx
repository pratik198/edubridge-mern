// import React from "react";
// import assets from "../../../../assets/assets";

// const TeacherOnboarding = () => {
//   return (
//     <div className="min-h-screen w-full bg-white flex flex-col md:flex-row">
//       {/* LEFT SECTION */}
//        <div className="md:w-1/2 w-full bg-[#FFD600] flex items-center justify-center p-0">
//   <img
//     src={assets.registerInstructor}
//     alt="Illustration"
//     className="w-full h-full object-contain max-h-screen"
//   />
// </div>


//       {/* RIGHT SECTION */}
//       <div className="md:w-1/2 w-full flex items-center justify-center p-6">
//         <div className="w-full max-w-lg">

//           <h1 className="text-2xl md:text-3xl font-bold mb-6">
//             Personal & Professional Info
//           </h1>

//           <div className="space-y-5">

//             {/* Country */}
//             <div>
//               <label className="text-sm font-semibold">Country</label>
//               <select className="w-full border rounded-lg p-3 mt-1 focus:outline-none">
//                 <option>Country</option>
//               </select>
//             </div>

//             {/* Profession */}
//             <div>
//               <label className="text-sm font-semibold">Profession / Title</label>
//               <input
//                 type="text"
//                 placeholder="e.g., UX Designer, Data Scientist"
//                 className="w-full border rounded-lg p-3 mt-1 focus:outline-none"
//               />
//             </div>

//             {/* Years Experience */}
//             <div>
//               <label className="text-sm font-semibold">Years of Experience</label>
//               <select className="w-full border rounded-lg p-3 mt-1 focus:outline-none">
//                 <option>Years of Experience</option>
//               </select>
//             </div>

//             {/* Expertise */}
//             <div>
//               <label className="text-sm font-semibold">Area of Expertise</label>
//               <div className="flex items-center border rounded-lg mt-1">
//                 <input
//                   type="text"
//                   placeholder="Find an interest"
//                   className="w-full p-3 focus:outline-none"
//                 />
//                 <button className="px-4">
//                   🔍
//                 </button>
//               </div>
//             </div>

//             {/* Button */}
//             <button className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg">
//               Next
//             </button>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherOnboarding;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../../../assets/assets";

const TeacherOnboarding = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    country: "",
    profession: "",
    experience: "",
    expertise: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    // You can also validate here
    navigate("/teaching-preferences");
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col md:flex-row">

      {/* LEFT SECTION */}
      <div className="md:w-1/2 w-full bg-[#FFD600] flex items-center justify-center p-0">
        <img
          src={assets.registerInstructor}
          alt="Illustration"
          className="w-full h-full object-contain max-h-screen"
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-6">
        <div className="w-full max-w-lg">

          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Personal & Professional Info
          </h1>

          <div className="space-y-5">

            {/* Country */}
            <div>
              <label className="text-sm font-semibold">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1"
              >
                <option value="">Select country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
              </select>
            </div>

            {/* Profession */}
            <div>
              <label className="text-sm font-semibold">Profession / Title</label>
              <input
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                type="text"
                placeholder="e.g., UX Designer, Data Scientist"
                className="w-full border rounded-lg p-3 mt-1"
              />
            </div>

            {/* Years Experience */}
            <div>
              <label className="text-sm font-semibold">Years of Experience</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1"
              >
                <option value="">Select experience</option>
                <option value="0-1">0–1 years</option>
                <option value="1-3">1–3 years</option>
                <option value="3-5">3–5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>

            {/* Expertise */}
            <div>
              <label className="text-sm font-semibold">Area of Expertise</label>
              <input
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                type="text"
                placeholder="Find an interest"
                className="w-full border rounded-lg p-3 mt-1"
              />
            </div>

            {/* Button */}
            <button
              onClick={handleNext}
              className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg"
            >
              Next
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherOnboarding;
