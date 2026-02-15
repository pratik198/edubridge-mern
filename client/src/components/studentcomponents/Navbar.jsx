
import { useEffect, useRef, useState } from "react";
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
    <header className="bg-white sticky top-0 z-50">
      {/* WRAPPER */}
      <div
        className="max-w-7xl mx-auto px-6 py-4
      flex items-center justify-between gap-6"
      >
        {/* LOGO */}
        {/* <img src={assets.logo} alt="EdA" className="w-20" /> */}
        <h1 className="text-2xl text-yellow-500 font-['Pacifico']!">
          EduBridge
        </h1>

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
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <span className="font-bold text-[15px] cursor-pointer text-black">
              Home
            </span>
            <span className="font-bold text-[15px] cursor-pointer text-gray-500">
              Dashboard
            </span>
            <span className="font-bold text-[15px] cursor-pointer text-gray-500">
              My Courses
            </span>
          </nav>

          <FiBell size={22} className="text-gray-500 cursor-pointer" />

          {/* PROFILE DROPDOWN */}
          <div ref={menuRef} className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <img
                src="https://i.pravatar.cc/100"
                className="w-9 h-9 rounded-full border"
              />
              <FiChevronDown
                className={`transition ${open ? "rotate-180" : ""}`}
              />
            </div>

            {open && (
              <div className="absolute right-0 mt-3 bg-white shadow-2xl rounded-2xl w-48 animate-[fadeIn_.25s_ease]">
                <ul className="p-2 text-sm">
                  <li className="px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                    My Profile
                  </li>
                  <li className="px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                    Settings
                  </li>

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
        <button
          className="md:hidden p-2 rounded-lg bg-gray-100"
          onClick={() => setMobileMenu(true)}
        >
          <FiMenu size={20} />
        </button>
      </div>

      {/* ---------------- MOBILE DRAWER ---------------- */}
      {mobileMenu && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-60"
          onClick={() => setMobileMenu(false)}
        >
          <div
            className="
              bg-white
              w-[85%]
              max-w-sm
              h-full
              shadow-2xl
              p-6
              rounded-r-3xl
              animate-[slideIn_.35s_ease]
              flex flex-col
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <img src={assets.logo} className="w-20" />
              <FiX
                size={22}
                className="cursor-pointer"
                onClick={() => setMobileMenu(false)}
              />
            </div>

            {/* MENU */}
            <ul className="space-y-5 text-[15px] font-semibold text-gray-700">
              <li className="hover:text-yellow-500 transition">Home</li>
              <li className="hover:text-yellow-500 transition">Dashboard</li>
              <li className="hover:text-yellow-500 transition">My Courses</li>
            </ul>

            {/* DIVIDER */}
            <div className="mt-6 border-t pt-5" />

            {/* USER */}
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/100"
                className="w-10 h-10 rounded-full border"
              />
              <span className="font-medium">John Doe</span>
            </div>

            {/* PUSH FOOTER */}
            <div className="mt-auto" />
          </div>
        </div>
      )}
    </header>
  );
}
