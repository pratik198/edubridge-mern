import TeacherNavbar from "../../../components/teacher/TeacherNavbar";
import Footer from "../../../components/studentcomponents/Footer";
import CreateCourseSteps from "../../../components/teacher/createCourseComponents/CreateCourseSteps";

const CreateCourseStep3 = () => {
  return (
    <div className="min-h-screen bg-white">
      <TeacherNavbar />

      {/* PAGE CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
          {/* STEPS */}
          <div className="block md:hidden">
            <CreateCourseSteps currentStep={3} orientation="horizontal" />
          </div>

          <div className="hidden md:block">
            <CreateCourseSteps currentStep={3} orientation="vertical" />
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 max-w-full lg:max-w-[820px]">
            <h1 className="text-2xl font-semibold text-black">
              Confirm & Publish
            </h1>

            <p className="text-gray-500 mt-2 mb-10 text-sm max-w-[520px]">
              Review your course details before publishing.
            </p>

            {/* PREVIEW CARD */}
            <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50 mb-12">
              <div className="h-56 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                Course Preview Image / Summary
              </div>

              <div className="mt-6 space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">
                    Course Title:
                  </span>{" "}
                  Your Course Title
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">
                    Total Modules:
                  </span>{" "}
                  3
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">
                    Lessons & Quizzes:
                  </span>{" "}
                  12 items
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <button className="border border-gray-300 px-6 py-2 rounded-lg text-sm">
                Save as Draft
              </button>

              <button className="bg-yellow-400 px-7 py-2 rounded-lg text-sm font-medium">
                Publish Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateCourseStep3;
