// import React from "react";
// import assets from "../../../../assets/assets";

// const TeachingPreferences = () => {
//   return (
//     <div className="min-h-screen w-full bg-white flex flex-col md:flex-row">
      
//       {/* LEFT SIDE IMAGE */}
//        <div className="md:w-1/2 w-full bg-[#FFD600] flex items-center justify-center p-0">
//   <img
//     src={assets.registerInstructor}
//     alt="Illustration"
//     className="w-full h-full object-contain max-h-screen"
//   />
// </div>

//       {/* RIGHT SIDE FORM */}
//       <div className="md:w-1/2 w-full flex items-center justify-center p-6">
//         <div className="w-full max-w-xl">

//           <h1 className="text-3xl font-bold mb-8 text-center">
//             Teaching Preferences
//           </h1>

//           <div className="space-y-6">

//             {/* Default Language */}
//             <div>
//               <label className="text-sm font-semibold">
//                 Default language
//               </label>
//               <select className="w-full border rounded-lg p-3 mt-1 focus:outline-none">
//                 <option>Default language</option>
//               </select>
//             </div>

//             {/* Course Format */}
//             <div>
//               <label className="text-sm font-semibold">
//                 Preferred course format
//               </label>
//               <select className="w-full border rounded-lg p-3 mt-1 focus:outline-none">
//                 <option>Preferred course format</option>
//               </select>
//             </div>

//             {/* Audience */}
//             <div>
//               <label className="text-sm font-semibold">
//                 Intended audience
//               </label>
//               <select className="w-full border rounded-lg p-3 mt-1 focus:outline-none">
//                 <option>Intended audience</option>
//               </select>
//             </div>

//             {/* BUTTON */}
//             <button className="w-full bg-[#FFD600] text-black font-semibold py-3 rounded-lg">
//               Finished
//             </button>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeachingPreferences;


import React, { useState } from "react";
import assets from "../../../../assets/assets";

const TeachingPreferences = () => {

  const [preferences, setPreferences] = useState({
    language: "",
    format: "",
    audience: "",
  });

  const handleChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value,
    });
  };

  const handleFinish = () => {
    console.log(preferences);
    alert("Preferences saved successfully!");
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col md:flex-row">
      
      {/* LEFT SIDE IMAGE */}
      <div className="md:w-1/2 w-full bg-[#FFD600] flex items-center justify-center p-0">
        <img
          src={assets.registerInstructor}
          alt="Illustration"
          className="w-full h-full object-contain max-h-screen"
        />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-6">
        <div className="w-full max-w-xl">

          <h1 className="text-3xl font-bold mb-8 text-center">
            Teaching Preferences
          </h1>

          <div className="space-y-6">

            {/* Default Language */}
            <div>
              <label className="text-sm font-semibold">
                Default language
              </label>
              <select
                name="language"
                value={preferences.language}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1 focus:outline-none"
              >
                <option value="">Select your language</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
                <option value="Arabic">Arabic</option>
                <option value="French">French</option>
              </select>
            </div>

            {/* Course Format */}
            <div>
              <label className="text-sm font-semibold">
                Preferred course format
              </label>
              <select
                name="format"
                value={preferences.format}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1 focus:outline-none"
              >
                <option value="">Choose course format</option>
                <option value="Video Lectures">Video Lectures</option>
                <option value="Live Classes">Live Classes</option>
                <option value="Text & Notes">Text & Notes</option>
                <option value="Interactive / Quiz Based">
                  Interactive / Quiz Based
                </option>
              </select>
            </div>

            {/* Audience */}
            <div>
              <label className="text-sm font-semibold">
                Intended audience
              </label>
              <select
                name="audience"
                value={preferences.audience}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1 focus:outline-none"
              >
                <option value="">Select audience type</option>
                <option value="School Students">School Students</option>
                <option value="College Students">College Students</option>
                <option value="Working Professionals">Working Professionals</option>
                <option value="Beginners">Beginners</option>
                <option value="Advanced Learners">Advanced Learners</option>
              </select>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleFinish}
              className="w-full bg-[#FFD600] text-black font-semibold py-3 rounded-lg"
            >
              Finished
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachingPreferences;
