import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import assets from "../../../assets/assets";
import { loginUser } from "../../../apis/authApi";
import { MdOutlineMailOutline, MdOutlineLock } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await loginUser(form);

      if (response?.success) {
        if (response.user?.role === "educator") {
          navigate("/teacher-dashboard");
        } else if (response.user?.role === "student") {
          navigate("/student-dashboard");
        }
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 font-['Inter']">
      {/* LEFT SECTION */}
      <div className="flex flex-col justify-center px-6 sm:px-10 md:px-20">
        {/* Logo */}
        <h1 className="absolute top-6 left-6 text-2xl text-yellow-500 font-['Pacifico']!">
          EduBridge
        </h1>

        <div className="max-w-xl w-full mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">Login</h2>

          {/* Email */}
          <label className="text-sm text-gray-600">Email</label>
          <div className="mt-1 mb-4 relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full border border-gray-300 rounded-lg px-10 py-3.5 text-sm focus:outline-none focus:border-gray-500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <MdOutlineMailOutline size={18} />
            </span>
          </div>

          {/* Password */}
          <label className="text-sm text-gray-600">Password</label>
          <div className="mt-1 mb-4 relative">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full border border-gray-300 rounded-lg px-10 py-3.5 text-sm focus:outline-none focus:border-gray-500"
            />

            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <MdOutlineLock size={18} />
            </span>

            <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition">
              <AiOutlineEye size={18} />
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm mb-6">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="accent-yellow-400" />
              Remember Me
            </label>
            <button className="text-red-500 hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 rounded-lg transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Divider */}
          <div className="my-6 text-center text-gray-400 text-sm">
            or continue with
          </div>

          {/* Social Login */}
          <div className="flex justify-center gap-4 mb-6">
            <button className="border border-[#EBEBEB] p-3 rounded-full h-12.5 w-12.5">
              <img src={assets.google} className="h-full w-full" alt="" />
            </button>
          </div>

          {/* Signup */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?
            <Link to="/register" className="text-blue-600 ml-1">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="hidden lg:flex h-screen bg-[#FFD900] items-center justify-center">
        <div
          className="w-full h-full bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: `url(${assets.login})` }}
        />
      </div>
    </div>
  );
};

export default Login;
