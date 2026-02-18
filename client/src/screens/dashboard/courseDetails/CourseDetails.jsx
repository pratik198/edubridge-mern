import { useParams, Link } from "react-router-dom";
import Navbar from "../../../components/studentcomponents/Navbar";
import Footer from "../../../components/studentcomponents/Footer";
import { courses } from "../../../data/courses";

const CourseDetails = () => {
  const { courseId, moduleId, lessonId } = useParams();

  // ✅ Find course using _id (STRING)
  const course = courses.find((c) => c._id === courseId);
  if (!course) return <div className="pt-24 px-10">Course not found</div>;

  // ✅ Find module using _id
  const activeModule = course.modules.find((m) => m._id === moduleId);

  // ✅ Find lesson using _id
  const activeLesson = activeModule?.lessons.find((l) => l._id === lessonId);

  if (!activeModule || !activeLesson)
    return <div className="pt-24 px-10">Module or Lesson not found</div>;

  return (
    <>
      {/* NAVBAR (NO BORDER) */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white">
        <Navbar />
      </div>

      {/* PAGE — PURE WHITE */}
      <div className="bg-white min-h-screen pt-24 flex flex-col">
        <div className="flex flex-1 px-8 lg:px-16 py-10 gap-10">
          {/* ================= LEFT SIDEBAR ================= */}
          <div className="hidden md:block w-64">
            <div
              className="
                bg-white border border-gray-200 rounded-xl p-6
                max-h-[60vh]
                overflow-y-auto
              "
            >
              <h2 className="text-lg font-semibold mb-6">{course.title}</h2>

              <p className="text-sm text-gray-500 mb-4">Courses Material</p>

              <div className="space-y-3">
                {course.modules.map((module) => (
                  <Link
                    key={module._id}
                    to={`/student-course/${course._id}/${module._id}/${module.lessons[0]._id}`}
                    className={`block px-4 py-3 rounded-lg text-sm transition ${
                      moduleId === module._id
                        ? "bg-gray-200 font-medium"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {module.title}
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-sm text-gray-500">Grades</p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex-1">
            {/* Module Title */}
            <div className="mb-8">
              <h1 className="text-xl font-semibold">{activeModule.title}</h1>

              <p className="text-sm text-gray-500 mt-2">
                {activeModule.lessons.filter((l) => l.type === "video").length}{" "}
                Videos •{" "}
                {activeModule.lessons.reduce((acc, l) => acc + l.duration, 0)}{" "}
                minutes •{" "}
                {activeModule.lessons.filter((l) => l.type === "quiz").length}{" "}
                quiz
              </p>
            </div>

            {/* Lessons */}
            <div className="space-y-4">
              {activeModule.lessons.map((lesson) => (
                <div
                  key={lesson._id}
                  className="
                    flex justify-between items-center
                    bg-white border border-gray-200
                    rounded-xl px-6 py-4
                  "
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center border rounded-md text-sm">
                      {lesson.type === "video" ? "▶" : "≡"}
                    </div>

                    <div>
                      <p className="font-medium text-gray-900">
                        {lesson.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {lesson.type === "video" ? "Video" : "Quiz"} •{" "}
                        {lesson.duration} min
                      </p>
                    </div>
                  </div>

                  {/* YELLOW BUTTON */}
                  <Link
                    to={
                      lesson.type === "quiz"
                        ? `/student-course/${course._id}/${activeModule._id}/${lesson._id}/quiz`
                        : `/student-course/${course._id}/${activeModule._id}/${lesson._id}/learn`
                    }
                    className="
                      bg-yellow-400 hover:bg-yellow-500
                      px-6 py-2 rounded-md
                      text-sm font-medium
                    "
                  >
                    Open
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CourseDetails;
