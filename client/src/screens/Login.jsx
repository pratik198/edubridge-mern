import { Link } from "react-router-dom";
import Background from "../components/Background";

export default function Login() {
  return (
    <Background>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <div className="px-6 pt-6">
            <h1 className="text-2xl font-semibold text-white tracking-tight">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-neutral-400">
              Login to continue learning with EduBridge
            </p>
          </div>

          {/* Form */}
          <div className="px-6 py-6 space-y-4">
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

            {/* Forgot Password */}
            <div className="flex justify-end">
              <span className="text-xs text-neutral-400 hover:text-white cursor-pointer">
                Forgot password?
              </span>
            </div>

            {/* Submit */}
            <button className="mt-2 w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-black hover:bg-neutral-200 transition">
              Sign in
            </button>

            {/* Footer */}
            <p className="pt-2 text-center text-xs text-neutral-500">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-white hover:underline cursor-pointer"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Background>
  );
}
