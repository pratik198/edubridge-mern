import { useState } from "react";
import Navbar from "../../../components/studentcomponents/Navbar";
import Footer from "../../../components/studentcomponents/Footer";

const StudentInfo = () => {
  // Dummy initial data (replace with API later)
  const [formData, setFormData] = useState({
    fullName: "John Cena",
    email: "johncena@gmail.com",
    role: "student",
    purpose: ["Career Growth"],
    interests: ["UI/UX Design", "Frontend"],
    currentRole: "Student",
    educationLevel: "Undergraduate",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleArrayChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value.split(",").map((item) => item.trim()),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      <div className="bg-white min-h-screen pt-24 flex flex-col">
        <div className="flex flex-1 px-8 lg:px-16 py-10 gap-12">
          {/* LEFT SIDE (Avatar Section) */}
          <div className="hidden md:block w-64">
            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                No Avatar
              </div>

              <h3 className="mt-4 font-semibold text-gray-900">
                {formData.fullName}
              </h3>

              <p className="text-sm text-gray-500">{formData.email}</p>

              <p className="text-xs text-gray-400 mt-1 capitalize">
                {formData.role}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1">
            <h1 className="text-2xl font-semibold mb-8">Profile Settings</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Info */}
              <div>
                <h2 className="font-medium mb-4">Account Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="border border-gray-300 rounded-md px-4 py-2"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border border-gray-300 rounded-md px-4 py-2"
                  />
                </div>
              </div>

              {/* Onboarding Info */}
              <div>
                <h2 className="font-medium mb-4">Learning Preferences</h2>

                <div className="space-y-6">
                  <input
                    type="text"
                    value={formData.purpose.join(", ")}
                    onChange={(e) =>
                      handleArrayChange("purpose", e.target.value)
                    }
                    placeholder="Purpose (comma separated)"
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                  />

                  <input
                    type="text"
                    value={formData.interests.join(", ")}
                    onChange={(e) =>
                      handleArrayChange("interests", e.target.value)
                    }
                    placeholder="Interests (comma separated)"
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                  />

                  <input
                    type="text"
                    name="currentRole"
                    value={formData.currentRole}
                    onChange={handleChange}
                    placeholder="Current Role"
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                  />

                  <input
                    type="text"
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    placeholder="Education Level"
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-md font-medium"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default StudentInfo;
