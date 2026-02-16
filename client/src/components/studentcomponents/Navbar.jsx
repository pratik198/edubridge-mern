// import { useEffect, useRef, useState } from "react";
// import assets from "../assets/assets";
// import { FiBell, FiChevronDown, FiArrowRight, FiMenu, FiX } from "react-icons/fi";

// export default function Navbar() {

//   const [open, setOpen] = useState(false);
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     function handle(e) {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     }
//     window.addEventListener("mousedown", handle);
//     return () => window.removeEventListener("mousedown", handle);
//   }, []);

//   return (
//     <header className="bg-white sticky top-0 z-50 shadow-sm">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

//         {/* LOGO */}
//         <img src={assets.logo} alt="EdA" className="w-20" />

//         {/* SEARCH — ONLY DESKTOP */}
//         <div className="hidden lg:flex flex-1 justify-center">
//           <div className="flex items-center w-[60%] shadow-sm rounded-full px-5 py-2 bg-white">
//             <input
//               placeholder="What do you want to learn"
//               className="flex-1 outline-none text-sm"
//             />
//             <button className="bg-yellow-400 p-2 rounded-full">
//               <FiArrowRight size={18} />
//             </button>
//           </div>
//         </div>

//         {/* RIGHT SECTION */}
//         <div className="hidden md:flex items-center gap-8">

//           <nav className="flex items-center gap-6">
//             <span className="font-bold text-[15px] text-black cursor-pointer">Home</span>
//             <span className="font-bold text-[15px] text-gray-500 cursor-pointer">Dashboard</span>
//             <span className="font-bold text-[15px] text-gray-500 cursor-pointer">My Courses</span>
//           </nav>

//           <FiBell size={22} className="text-gray-500 cursor-pointer" />

//           {/* PROFILE */}
//           <div ref={menuRef} className="relative">
//             <div
//               className="flex items-center gap-2 cursor-pointer"
//               onClick={() => setOpen(!open)}
//             >
//               <img src="https://i.pravatar.cc/100" className="w-9 h-9 rounded-full border" />
//               <FiChevronDown className={`${open ? "rotate-180" : ""} transition`} />
//             </div>

//             {open && (
//               <div className="absolute right-0 mt-3 bg-white shadow-2xl rounded-2xl w-48 animate-[fadeIn_.25s_ease]">
//                 <ul className="p-2 text-sm">
//                   <li className="px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">My Profile</li>
//                   <li className="px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">Settings</li>
//                   <hr className="my-1" />
//                   <li className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer">Logout</li>
//                 </ul>
//               </div>
//             )}
//           </div>

//         </div>

//         {/* MOBILE MENU BUTTON */}
//         <button
//           className="md:hidden p-2 rounded-lg bg-gray-100"
//           onClick={() => setMobileMenu(true)}
//         >
//           <FiMenu size={20} />
//         </button>

//       </div>

//       {/* MOBILE MENU */}
//      {/* MOBILE MENU */}
// {mobileMenu && (
//   <div
//     className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
//     onClick={() => setMobileMenu(false)}
//   >

//     <div
//       className="
//         bg-white
//         w-[85%]
//         max-w-sm
//         h-full
//         shadow-2xl
//         p-6
//         rounded-r-3xl
//         animate-[slideIn_.35s_ease]
//         flex
//         flex-col
//       "
//       onClick={e => e.stopPropagation()}
//     >
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <img src={assets.logo} className="w-20" />
//         <FiX size={22} className="cursor-pointer" onClick={() => setMobileMenu(false)} />
//       </div>

//       {/* MENU */}
//       <ul className="space-y-5 text-[15px] font-semibold text-gray-700">
//         <li className="hover:text-yellow-500 transition">Home</li>
//         <li className="hover:text-yellow-500 transition">Dashboard</li>
//         <li className="hover:text-yellow-500 transition">My Courses</li>
//       </ul>

//       {/* DIVIDER */}
//       <div className="mt-6 border-t pt-5" />

//       {/* USER */}
//       <div className="flex items-center gap-3">
//         <img
//           src="https://i.pravatar.cc/100"
//           className="w-10 h-10 rounded-full border"
//         />
//         <span className="font-medium">John Doe</span>
//       </div>

//       {/* PUSH FOOTER DOWN IF NEEDED */}
//       <div className="mt-auto" />

//     </div>
//   </div>
// )}

//     </header>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import assets from "../../assets/assets";
import {
  FiBell,
  FiChevronDown,
  FiArrowRight,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const menuRef = useRef(null);

  // close profile dropdown on outside click
  useEffect(() => {
    function handle(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    window.addEventListener("mousedown", handle);
    return () => window.removeEventListener("mousedown", handle);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <header className="w-full bg-white px-6 md:px-10 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/student-home">
          <h1 className="text-2xl text-yellow-500 font-['Pacifico']!">
            EduBridge
          </h1>
        </Link>

        {/* SEARCH — ONLY DESKTOP */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="flex items-center w-[60%] rounded-full px-5 py-2 bg-white border border-yellow-300">
            <input
              placeholder="What do you want to learn"
              className="flex-1 outline-none text-sm"
            />
            <button className="bg-yellow-400 p-2 rounded-full">
              <FiArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* RIGHT SIDE (DESKTOP) */}
        <div className="hidden md:flex items-center gap-10">
          {/* NAVIGATION */}
          <nav className="flex gap-8 text-sm text-gray-500">
            <NavLink
              to="/student-home"
              className={({ isActive }) =>
                `cursor-pointer ${isActive ? "text-black font-medium" : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/student-dashboard"
              className={({ isActive }) =>
                `cursor-pointer ${isActive ? "text-black font-medium" : ""}`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/s-enrolled-courses"
              className={({ isActive }) =>
                `cursor-pointer ${isActive ? "text-black font-medium" : ""}`
              }
            >
              My Courses
            </NavLink>
          </nav>

          <FiBell className="text-lg cursor-pointer" />

          {/* PROFILE DROPDOWN */}
          <div ref={menuRef} className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <img
                src="https://i.pravatar.cc/100"
                className="w-9 h-9 rounded-full cursor-pointer"
                alt="profile"
              />
              <FiChevronDown
                className={`transition ${open ? "rotate-180" : ""}`}
              />
            </div>

            {open && (
              <div className="absolute right-0 mt-3 bg-white shadow-2xl rounded-2xl w-48">
                <ul className="p-2 text-sm">
                  <li>
                    <Link
                      to="/student-profile"
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2 hover:bg-gray-100 rounded-lg"
                    >
                      My Profile
                    </Link>
                  </li>

                  {/* <li className="px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                    Settings
                  </li> */}

                  <hr className="my-1" />

                  <li className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <FiMenu
          className="text-2xl cursor-pointer md:hidden"
          onClick={() => setMobileMenu(true)}
        />
      </header>

      {/* MOBILE OVERLAY */}
      {mobileMenu && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity md:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[320px] bg-white z-50
        rounded-l-3xl shadow-xl
        transform transition-transform duration-300 ease-in-out md:hidden
        ${mobileMenu ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex justify-between items-center px-6 py-5">
          <h1 className="text-2xl font-['Pacifico'] text-yellow-400">
            EduBridge
          </h1>
          <FiX
            className="text-2xl cursor-pointer text-gray-700"
            onClick={() => setMobileMenu(false)}
          />
        </div>

        {/* MOBILE NAV */}
        <nav className="flex flex-col gap-5 px-6 py-6 text-gray-700 text-[15px] font-medium">
          <NavLink to="/student-home" onClick={() => setMobileMenu(false)}>
            Home
          </NavLink>

          <NavLink to="/student-dashboard" onClick={() => setMobileMenu(false)}>
            Dashboard
          </NavLink>

          <NavLink to="/t-my-courses" onClick={() => setMobileMenu(false)}>
            My Courses
          </NavLink>
        </nav>
      </div>
    </>
  );
}

// --- OLD ---

// import { useEffect, useRef, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import assets from "../../assets/assets";
// import {
//   FiBell,
//   FiChevronDown,
//   FiArrowRight,
//   FiMenu,
//   FiX,
// } from "react-icons/fi";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const menuRef = useRef(null);

//   // close profile dropdown on outside click
//   useEffect(() => {
//     function handle(e) {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     }
//     window.addEventListener("mousedown", handle);
//     return () => window.removeEventListener("mousedown", handle);
//   }, []);

//   return (
//     <header className="bg-white sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
//         {/* LOGO */}
//         <Link to="/student-home">
//           <h1 className="text-2xl text-yellow-500 font-['Pacifico']">
//             EduBridge
//           </h1>
//         </Link>

//         {/* SEARCH — ONLY DESKTOP */}
//         <div className="hidden lg:flex flex-1 justify-center">
//           <div className="flex items-center w-[60%] rounded-full px-5 py-2 bg-white border border-yellow-300">
//             <input
//               placeholder="What do you want to learn"
//               className="flex-1 outline-none text-sm"
//             />
//             <button className="bg-yellow-400 p-2 rounded-full">
//               <FiArrowRight size={18} />
//             </button>
//           </div>
//         </div>

//         {/* RIGHT SIDE (DESKTOP) */}
//         <div className="hidden md:flex items-center gap-8">
//           {/* NAVIGATION */}
//           <nav className="flex items-center gap-6">
//             <NavLink
//               to="/student-home"
//               className={({ isActive }) =>
//                 `font-bold text-[15px] cursor-pointer ${
//                   isActive ? "text-black" : "text-gray-500"
//                 }`
//               }
//             >
//               Home
//             </NavLink>

//             <NavLink
//               to="/student-dashboard"
//               className={({ isActive }) =>
//                 `font-bold text-[15px] cursor-pointer ${
//                   isActive ? "text-black" : "text-gray-500"
//                 }`
//               }
//             >
//               Dashboard
//             </NavLink>

//             <NavLink
//               to="/t-my-courses"
//               className={({ isActive }) =>
//                 `font-bold text-[15px] cursor-pointer ${
//                   isActive ? "text-black" : "text-gray-500"
//                 }`
//               }
//             >
//               My Courses
//             </NavLink>
//           </nav>

//           <FiBell size={22} className="text-gray-500 cursor-pointer" />

//           {/* PROFILE DROPDOWN */}
//           <div ref={menuRef} className="relative">
//             <div
//               className="flex items-center gap-2 cursor-pointer"
//               onClick={() => setOpen(!open)}
//             >
//               <img
//                 src="https://i.pravatar.cc/100"
//                 className="w-9 h-9 rounded-full border"
//                 alt="profile"
//               />
//               <FiChevronDown
//                 className={`transition ${open ? "rotate-180" : ""}`}
//               />
//             </div>

//             {open && (
//               <div className="absolute right-0 mt-3 bg-white shadow-2xl rounded-2xl w-48">
//                 <ul className="p-2 text-sm">
//                   <li className="px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
//                     My Profile
//                   </li>
//                   <li className="px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
//                     Settings
//                   </li>

//                   <hr className="my-1" />

//                   <li className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer">
//                     Logout
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* MOBILE MENU BUTTON */}
//         <button
//           className="md:hidden p-2 rounded-lg bg-gray-100"
//           onClick={() => setMobileMenu(true)}
//         >
//           <FiMenu size={20} />
//         </button>
//       </div>

//       {/* MOBILE DRAWER */}
//       {mobileMenu && (
//         <div
//           className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
//           onClick={() => setMobileMenu(false)}
//         >
//           <div
//             className="bg-white w-[85%] max-w-sm h-full shadow-2xl p-6 rounded-r-3xl flex flex-col"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* HEADER */}
//             <div className="flex justify-between items-center mb-6">
//               <img src={assets.logo} className="w-20" alt="logo" />
//               <FiX
//                 size={22}
//                 className="cursor-pointer"
//                 onClick={() => setMobileMenu(false)}
//               />
//             </div>

//             {/* MOBILE NAV */}
//             <ul className="space-y-5 text-[15px] font-semibold text-gray-700">
//               <li>
//                 <NavLink
//                   to="/student-home"
//                   onClick={() => setMobileMenu(false)}
//                   className={({ isActive }) =>
//                     isActive ? "text-black" : "text-gray-500"
//                   }
//                 >
//                   Home
//                 </NavLink>
//               </li>

//               <li>
//                 <NavLink
//                   to="/student-dashboard"
//                   onClick={() => setMobileMenu(false)}
//                   className={({ isActive }) =>
//                     isActive ? "text-black" : "text-gray-500"
//                   }
//                 >
//                   Dashboard
//                 </NavLink>
//               </li>

//               <li>
//                 <NavLink
//                   to="/t-my-courses"
//                   onClick={() => setMobileMenu(false)}
//                   className={({ isActive }) =>
//                     isActive ? "text-black" : "text-gray-500"
//                   }
//                 >
//                   My Courses
//                 </NavLink>
//               </li>
//             </ul>

//             <div className="mt-auto" />
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }
