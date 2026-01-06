import { useState } from "react";
import { FiMenu, FiX, FiBell } from "react-icons/fi";

const TeacherNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <header className="w-full bg-white px-6 md:px-10 py-4 flex items-center justify-between">
        {/* LOGO */}
        {/* <h1 className="text-2xl font-['Pacifico']!">EdA</h1> */}
        <h1 className="text-2xl text-yellow-500 font-['Pacifico']!">
          EduBridge
        </h1>

        {/* RIGHT SECTION – visible from 768px */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex gap-8 text-sm text-gray-500">
            <span className="text-black font-medium cursor-pointer">
              Dashboard
            </span>
            <span className="cursor-pointer">My Courses</span>
            <span className="cursor-pointer">Students</span>
            <span className="cursor-pointer">Assessment</span>
          </nav>

          <FiBell className="text-lg cursor-pointer" />

          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-9 h-9 rounded-full cursor-pointer"
          />
        </div>

        {/* HAMBURGER – visible below 768px */}
        <FiMenu
          className="text-2xl cursor-pointer md:hidden"
          onClick={() => setOpen(true)}
        />
      </header>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[320px] bg-white z-50
        rounded-l-3xl shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex justify-between items-center px-6 py-5">
          <h1 className="text-2xl font-['Pacifico'] text-yellow-400">EdA</h1>
          <FiX
            className="text-2xl cursor-pointer text-gray-700"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-5 px-6 py-6 text-gray-700 text-[15px] font-medium">
          <span className="cursor-pointer">Dashboard</span>
          <span className="cursor-pointer">My Courses</span>
          <span className="cursor-pointer">Students</span>
          <span className="cursor-pointer">Assessment</span>
        </nav>
      </div>
    </>
  );
};

export default TeacherNavbar;

// import { useState } from "react";
// import { FiMenu, FiX, FiBell } from "react-icons/fi";

// const TeacherNavbar = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* NAVBAR */}
//       <header className="w-full bg-white px-10 py-4 flex items-center justify-between">
//         {/* LOGO */}
//         <h1 className="text-2xl font-['Pacifico']">EdA</h1>

//         {/* RIGHT SECTION */}
//         <div className="hidden lg:flex items-center gap-10">
//           <nav className="flex gap-8 text-sm text-gray-500">
//             <span className="text-black font-medium cursor-pointer">
//               Dashboard
//             </span>
//             <span className="cursor-pointer">My Courses</span>
//             <span className="cursor-pointer">Students</span>
//             <span className="cursor-pointer">Assessment</span>
//           </nav>

//           <FiBell className="text-lg cursor-pointer" />

//           <img
//             src="https://i.pravatar.cc/40"
//             alt="profile"
//             className="w-9 h-9 rounded-full cursor-pointer"
//           />
//         </div>

//         {/* MOBILE ICON */}
//         <FiMenu
//           className="text-2xl cursor-pointer lg:hidden"
//           onClick={() => setOpen(true)}
//         />
//       </header>

//       {/* MOBILE SIDEBAR */}
//       <div
//         className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ${
//           open ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex justify-between items-center px-4 py-4 border-b">
//           <h1 className="text-xl font-['Pacifico']">EdA</h1>
//           <FiX
//             className="text-xl cursor-pointer"
//             onClick={() => setOpen(false)}
//           />
//         </div>

//         <nav className="flex flex-col gap-5 px-6 py-6 text-gray-600 text-sm">
//           <span className="text-black font-medium">Dashboard</span>
//           <span>My Courses</span>
//           <span>Students</span>
//           <span>Assessment</span>
//         </nav>
//       </div>

//       {open && (
//         <div
//           className="fixed inset-0 bg-black/20 z-40"
//           onClick={() => setOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default TeacherNavbar;
