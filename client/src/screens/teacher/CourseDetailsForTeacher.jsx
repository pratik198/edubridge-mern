import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TeacherNavbar from "../../components/teacher/TeacherNavbar";
import Footer from "../../components/studentcomponents/Footer";
import { FiChevronDown, FiBookOpen, FiHelpCircle } from "react-icons/fi";

const CourseDetailsForTeacher = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModule, setOpenModule] = useState(null);

  const fetchCourse = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/courses/${courseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      if (data.success) setCourse(data.course);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchCourse();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading course...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Course not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TeacherNavbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-10 space-y-14">

        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <div className="flex flex-col md:flex-row gap-8 justify-between">

            <div className="flex gap-6 flex-col sm:flex-row">
              {course.thumbnail && (
                <img
                  src={course.thumbnail}
                  alt="thumbnail"
                  className="w-full sm:w-56 h-36 object-cover rounded-2xl"
                />
              )}

              <div className="space-y-4">
                <h1 className="text-3xl font-semibold text-gray-900">
                  {course.title}
                </h1>

                <p className="text-gray-500 max-w-2xl">
                  {course.shortDescription}
                </p>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                  <span><strong>Category:</strong> {course.category || "-"}</span>
                  <span><strong>Level:</strong> {course.level || "-"}</span>
                  <span><strong>Duration:</strong> {course.duration || "-"}</span>
                </div>
              </div>
            </div>

            <div>
              <span
                className={`px-5 py-2 rounded-full text-xs font-semibold ${
                  course.isPublished
                    ? "bg-green-50 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {course.isPublished ? "Published" : "Draft"}
              </span>
            </div>

          </div>
        </div>

        {/* ================= MODULES ================= */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Course Modules
          </h2>

          {course.modules.map((module, moduleIndex) => {
            const isOpen = openModule === module._id;

            // ✅ FIX: Avoid duplicate naming
            const moduleTitle = module.title?.toLowerCase().includes("module")
              ? module.title
              : `Module ${moduleIndex + 1}: ${module.title}`;

            return (
              <div
                key={module._id}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
              >
                {/* MODULE HEADER */}
                <div
                  onClick={() =>
                    setOpenModule(isOpen ? null : module._id)
                  }
                  className="flex justify-between items-center px-6 py-5 cursor-pointer hover:bg-gray-50 transition"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {moduleTitle}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {module.lessons?.length || 0} Lessons ·{" "}
                      {module.quizzes?.length || 0} Quizzes
                    </p>
                  </div>

                  <FiChevronDown
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* MODULE BODY */}
                {isOpen && (
                  <div className="px-6 pb-8 space-y-10 border-t border-gray-100">

                    {/* LESSONS */}
                    <div className="pt-6 space-y-5">
                      <h4 className="text-xs uppercase text-gray-400 font-semibold tracking-wider">
                        Lessons
                      </h4>

                      {module.lessons?.length > 0 ? (
                        module.lessons.map((lesson, i) => (
                          <div
                            key={lesson._id}
                            className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100"
                          >
                            <FiBookOpen className="text-yellow-500 mt-1" />

                            <div>
                              <p className="font-medium text-gray-900">
                                {i + 1}. {lesson.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Duration: {lesson.duration || "-"}
                              </p>
                              {lesson.description && (
                                <p className="text-xs text-gray-400 mt-2">
                                  {lesson.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400 text-sm">
                          No lessons in this module.
                        </p>
                      )}
                    </div>

                    {/* QUIZZES */}
                    <div className="space-y-6">
                      <h4 className="text-xs uppercase text-gray-400 font-semibold tracking-wider">
                        Quizzes
                      </h4>

                      {module.quizzes?.length > 0 ? (
                        module.quizzes.map((quiz, qi) => (
                          <div
                            key={quiz._id}
                            className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100 space-y-6"
                          >
                            <div className="flex items-center gap-3">
                              <FiHelpCircle className="text-yellow-600" />
                              <h5 className="font-semibold text-gray-900">
                                {qi + 1}. {quiz.title}
                              </h5>
                            </div>

                            <div className="space-y-5">
                              {quiz.questions?.map((q, qIndex) => (
                                <div
                                  key={qIndex}
                                  className="bg-white p-5 rounded-xl border border-yellow-100"
                                >
                                  <p className="font-medium text-gray-800">
                                    Q{qIndex + 1}. {q.question}
                                  </p>

                                  <p className="text-xs text-gray-500 mt-2">
                                    Type: {q.type?.toUpperCase()} | Marks: {q.marks || 1}
                                  </p>

                                  {/* MCQ OPTIONS */}
                                  {q.type === "mcq" && (
                                    <div className="mt-4 space-y-2">
                                      {q.options?.map((opt, oi) => {
                                        const isCorrect =
                                          opt === q.correctAnswer;

                                        return (
                                          <div
                                            key={oi}
                                            className={`px-4 py-2 rounded-lg border text-sm ${
                                              isCorrect
                                                ? "bg-green-50 border-green-200 text-green-700 font-medium"
                                                : "bg-gray-50 border-gray-100 text-gray-600"
                                            }`}
                                          >
                                            {opt}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}

                                  {/* TYPE ANSWER */}
                                  {q.type === "type" && (
                                    <div className="mt-3 text-sm text-green-600 font-medium">
                                      Correct Answer: {q.correctAnswer}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400 text-sm">
                          No quizzes in this module.
                        </p>
                      )}
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default CourseDetailsForTeacher;
