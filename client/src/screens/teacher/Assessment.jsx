import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeacherNavbar from "../../components/teacher/TeacherNavbar";
import Footer from "../../components/studentcomponents/Footer";
import { FiTrash2 } from "react-icons/fi";

const Assessment = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);

  const fetchAssessments = async () => {
    const res = await fetch("http://localhost:5000/api/assessment");
    const data = await res.json();
    if (data.success) setAssessments(data.assessments);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/assessment/${id}`, {
      method: "DELETE",
    });
    fetchAssessments();
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TeacherNavbar />

      <main className="flex-1 px-12 py-12">
        <div className="flex justify-between mb-10">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Assessment
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Manage course-based evaluations
            </p>
          </div>

          <button
            onClick={() => navigate("/teacher/assessment/create")}
            className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-lg font-medium transition"
          >
            + Create Assessment
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-8 py-5 text-left">Title</th>
                <th className="px-8 py-5 text-left">Module</th>
                <th className="px-8 py-5 text-left">Questions</th>
                <th className="px-8 py-5 text-left">Total Marks</th>
                <th className="px-8 py-5 text-left">Status</th>
                <th className="px-8 py-5 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {assessments.map((a) => (
                <tr key={a._id}>
                  <td className="px-8 py-6 font-medium text-gray-900">
                    {a.title}
                  </td>
                  <td className="px-8 py-6 text-gray-600">{a.module}</td>
                  <td className="px-8 py-6">{a.questions.length}</td>
                  <td className="px-8 py-6">{a.totalMarks}</td>
                  <td className="px-8 py-6">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        a.isPublished
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {a.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <FiTrash2
                      onClick={() => handleDelete(a._id)}
                      className="text-gray-400 hover:text-red-500 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Assessment;
