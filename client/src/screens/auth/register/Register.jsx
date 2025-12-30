import { useState } from "react";
import { Link } from "react-router-dom";
import assets from "../../../assets/assets";

import { MdOutlineMailOutline, MdOutlineLock } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";

import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student",
  });
  const [role, setRole] = useState("student");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
 
  

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 font-['Inter']">
      {/* LEFT IMAGE – DESKTOP ONLY */}
      <div className="hidden lg:block w-full bg-[#FFD900]">
        <div
          className="h-full w-full bg-center bg-no-repeat bg-contain transition-all duration-500"
          style={{
            backgroundImage: `url(${
              role === "student"
                ? assets.registerStudent
                : assets.registerInstructor
            })`,
          }}
        />
      </div>

      {/* RIGHT FORM */}
      <div className="relative w-full overflow-y-auto px-5 sm:px-8 md:px-14 lg:px-20 py-10">
        {/* LOGO */}
        <h1 className="text-2xl text-yellow-500 font-['Pacifico']! mb-6">
          EduBridge
        </h1>

        <div className="max-w-md mx-auto">
          {/* TITLE */}
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
            Create Your Account
          </h2>

          {/* ROLE SWITCH */}
          <div className="relative flex bg-yellow-100 rounded-full p-1 mb-8">
            <div
              className={`absolute top-1 left-1 h-9.5 w-1/2 bg-yellow-400 rounded-full transition-transform duration-300 ${
                role === "instructor" ? "translate-x-full" : ""
              }`}
            />

            <button
              onClick={() => setRole("student")}
              className={`relative w-1/2 py-2 text-sm font-medium z-10 ${
                role === "student" ? "text-black" : "text-gray-600"
              }`}
            >
              Student
            </button>

            <button
              onClick={() => setRole("instructor")}
              className={`relative w-1/2 py-2 text-sm font-medium z-10 ${
                role === "instructor" ? "text-black" : "text-gray-600"
              }`}
            >
              Instructor
            </button>
          </div>

          {/* FULL NAME */}
          <label className="text-sm text-gray-600">Full name</label>
          <div className="mt-1 mb-4 relative">
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full border border-gray-300 rounded-lg px-10 py-3 text-sm focus:outline-none"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaRegUser size={18} />
            </span>
          </div>

          {/* EMAIL */}
          <label className="text-sm text-gray-600">Email</label>
          <div className="mt-1 mb-4 relative">
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full border border-gray-300 rounded-lg px-10 py-3 text-sm focus:outline-none"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <MdOutlineMailOutline size={18} />
            </span>
          </div>

          {/* PASSWORD */}
          <label className="text-sm text-gray-600">Password</label>
          <div className="mt-1 mb-4 relative">
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full border border-gray-300 rounded-lg px-10 py-3 text-sm focus:outline-none"
            />

            {/* Lock Icon */}
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <MdOutlineLock size={18} />
            </span>

            {/* Eye Icon */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition">
              <AiOutlineEye size={18} />
            </div>
          </div>

          {/* TERMS */}
          <label className="flex items-start gap-2 text-sm text-gray-600 mb-6">
            <input type="checkbox" className="mt-1 accent-yellow-400" />I agree
            to the Terms of Service & Privacy Policy
          </label>

          {/* BUTTON */}
          <Link to = "/teacher-onboarding" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 rounded-lg transition">
            Create Account
          </Link>

          {/* DIVIDER */}
          <div className="my-6 text-center text-gray-400 text-sm">
            or continue with
          </div>

          {/* SOCIAL */}
          <div className="flex justify-center gap-4 mb-6">
            <button className="border border-[#EBEBEB] p-3 rounded-full h-12.5 w-12.5">
              <img src={assets.google} className="h-full w-full" alt="" />
            </button>
          </div>

          {/* LOGIN */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?
            <Link to="/login" className="text-blue-600 ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

