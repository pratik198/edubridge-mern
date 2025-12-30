import { useState } from "react";
import { Link } from "react-router-dom";
import assets from "../../../assets/assets";

const Register = () => {
  const [role, setRole] = useState("student");

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-['Inter']">
      {/* LEFT – ILLUSTRATION */}
      <div className="hidden lg:flex w-1/2 bg-[#FFD900] items-center justify-center">
        <div className="w-full h-full flex items-center justify-center">
          <div
            className="w-[90%] h-[90%] bg-center bg-no-repeat bg-cover transition-all duration-500"
            style={{
              backgroundImage:
                role === "student"
                  ? `url(${assets.registerStudent})`
                  : `url(${assets.registerInstructor})`,
            }}
          />
        </div>
      </div>

      {/* RIGHT – FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-10 md:px-20 relative">
        {/* Logo */}
        <h1 className="absolute top-6 left-6 text-2xl text-yellow-500 font-['Pacifico']">
          EduBridge
        </h1>

        <div className="w-full max-w-md sm:max-w-lg">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
            Create Your Account
          </h2>

          {/* ROLE TOGGLE */}
          <div className="flex bg-yellow-100 rounded-full p-1 mb-8">
            <button
              onClick={() => setRole("student")}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition
                ${
                  role === "student"
                    ? "bg-yellow-400 text-black"
                    : "text-gray-600"
                }
              `}
            >
              Student
            </button>
            <button
              onClick={() => setRole("instructor")}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition
                ${
                  role === "instructor"
                    ? "bg-yellow-400 text-black"
                    : "text-gray-600"
                }
              `}
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
              className="w-full border border-gray-300 rounded-lg px-10 py-3.5 text-sm focus:outline-none focus:border-gray-500"
            />
            <span className="absolute left-3 top-3 text-gray-400">👤</span>
          </div>

          {/* EMAIL */}
          <label className="text-sm text-gray-600">Email</label>
          <div className="mt-1 mb-4 relative">
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full border border-gray-300 rounded-lg px-10 py-3.5 text-sm focus:outline-none focus:border-gray-500"
            />
            <span className="absolute left-3 top-3 text-gray-400">✉️</span>
          </div>

          {/* PASSWORD */}
          <label className="text-sm text-gray-600">Password</label>
          <div className="mt-1 mb-4 relative">
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full border border-gray-300 rounded-lg px-10 py-3.5 text-sm focus:outline-none focus:border-gray-500"
            />
            <span className="absolute left-3 top-3 text-gray-400">🔒</span>
            <span className="absolute right-3 top-3 cursor-pointer">👁️</span>
          </div>

          {/* TERMS */}
          <label className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <input type="checkbox" />I agree to the Terms of Service & Privacy
            Policy
          </label>

          {/* CTA */}
          <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 rounded-lg transition">
            Create Account
          </button>

          {/* DIVIDER */}
          <div className="my-6 text-center text-gray-400 text-sm">
            or continue with
          </div>

          {/* SOCIAL */}
          <div className="flex justify-center gap-4 mb-6">
            <button className="border p-3 rounded-full">🌐</button>
            <button className="border p-3 rounded-full">🍎</button>
            <button className="border p-3 rounded-full">📘</button>
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
