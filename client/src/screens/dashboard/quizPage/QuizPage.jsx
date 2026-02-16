import { useParams, Link } from "react-router-dom";
import Navbar from "../../../components/studentcomponents/Navbar";
import Footer from "../../../components/studentcomponents/Footer";
import { courses } from "../../../data/courses";

const QuizPage = () => {
  const { courseId, moduleId, lessonId } = useParams();
  const storageKey = `quiz-score-${courseId}-${moduleId}-${lessonId}`;
  const savedScore = localStorage.getItem(storageKey);

  const course = courses.find((c) => c.id === Number(courseId));
  const module = course?.modules.find((m) => m.id === Number(moduleId));
  const lesson = module?.lessons.find((l) => l.id === Number(lessonId));

  if (!course || !module || !lesson)
    return <div className="pt-24 px-10">Quiz not found</div>;

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      <div className="bg-white min-h-screen pt-24 flex flex-col">
        <div className="flex flex-1 px-8 lg:px-16 py-10 gap-12">
          {/* ================= SIDEBAR ================= */}
          <div className="hidden md:block w-72">
            <div className="bg-white border border-gray-200 rounded-xl p-5 max-h-[80vh] overflow-y-auto custom-scrollbar">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                {course.title}
              </h2>

              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Module {module.id}</p>
                <h3 className="text-sm font-medium text-gray-800">
                  {module.title}
                </h3>
              </div>

              <div className="mt-4 space-y-3">
                {module.lessons.map((l) => (
                  <Link
                    key={l.id}
                    to={
                      l.type === "quiz"
                        ? `/student-course/${course.id}/${module.id}/${l.id}/quiz`
                        : `/student-course/${course.id}/${module.id}/${l.id}/learn`
                    }
                    className={`block rounded-lg p-4 border transition-all ${
                      l.id === lesson.id
                        ? "bg-gray-200 border-gray-300"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 flex items-center justify-center border border-gray-400 rounded">
                        {l.type === "video" ? "▶" : "≡"}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {l.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {l.duration} min
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">Grades</p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex-1">
            <div className="mb-8 border-b border-gray-200 pb-4 flex justify-between items-center">
              <h1 className="text-2xl font-semibold">{lesson.title}</h1>

              <div className="flex gap-6 text-sm">
                <Link className="text-gray-500 hover:text-gray-700">
                  ← Previous
                </Link>
                <Link className="text-yellow-500 hover:text-yellow-600 font-medium">
                  Next →
                </Link>
              </div>
            </div>

            {/* ===== QUIZ INFO CARD (DESIGN SAME) ===== */}
            <div className="bg-white border border-yellow-400 rounded-xl p-6 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{lesson.title}</h2>
                <p className="text-sm text-gray-500 mt-2">
                  10 Questions • 20 minutes • 10 points
                </p>
              </div>

              {/* ONLY CHANGE: Link instead of state */}
              <Link
                to={`/student-course/${course.id}/${module.id}/${lesson.id}/quiz/attempt`}
                className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-md font-medium"
              >
                Start
              </Link>
            </div>

            {/* ===== GRADE CARD (UNCHANGED) ===== */}
            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-medium">Your grade</h3>

              {savedScore !== null ? (
                <p className="text-sm text-gray-700 mt-2">
                  You scored <span className="font-semibold">{savedScore}</span>{" "}
                  out of 4
                </p>
              ) : (
                <p className="text-sm text-gray-500 mt-2">
                  You haven't submitted this yet. We keep your highest score.
                </p>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default QuizPage;
