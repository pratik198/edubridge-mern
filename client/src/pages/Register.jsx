import { useState } from "react";
import Background from "../components/Background";
import { Link } from "react-router-dom";

export default function Register() {
  const [role, setRole] = useState("student");

  return (
    <Background>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <div className="px-6 pt-6">
            <h1 className="text-2xl font-semibold text-white tracking-tight">
              Create an account
            </h1>
            <p className="mt-1 text-sm text-neutral-400">
              Start your learning journey with EduBridge
            </p>
          </div>

          {/* Form */}
          <div className="px-6 py-6 space-y-4">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-sm text-neutral-300">Full name</label>
              <input
                type="text"
                placeholder="Bushra Zia"
                className="w-full rounded-lg border border-neutral-800 bg-black px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm text-neutral-300">Email</label>
              <input
                type="email"
                placeholder="name@email.com"
                className="w-full rounded-lg border border-neutral-800 bg-black px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm text-neutral-300">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-neutral-800 bg-black px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Account type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`rounded-lg px-4 py-2 text-sm transition-all
                    ${
                      role === "student"
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                        : "border border-neutral-800 text-neutral-400 hover:border-neutral-700"
                    }`}
                >
                  Student
                </button>

                <button
                  type="button"
                  onClick={() => setRole("educator")}
                  className={`rounded-lg px-4 py-2 text-sm transition-all
                    ${
                      role === "educator"
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                        : "border border-neutral-800 text-neutral-400 hover:border-neutral-700"
                    }`}
                >
                  Educator
                </button>
              </div>
            </div>

            {/* Submit */}
            <button className="mt-4 w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-black hover:bg-neutral-200 transition">
              Create account
            </button>

            {/* Footer */}
            <p className="pt-2 text-center text-xs text-neutral-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-white hover:underline cursor-pointer"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Background>
  );
}
