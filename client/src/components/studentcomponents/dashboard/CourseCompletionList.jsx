import { useState } from "react";
import CourseCompletionCard from "./CourseCompletionCard";
import { sampleCompletedCourses } from "../../../data/sampleCompletedCourses";

const CourseCompletionList = () => {
  const INITIAL_COUNT = 4;

  const [visible, setVisible] = useState(INITIAL_COUNT);

  const showMore = () => setVisible((prev) => prev + 2);
  const showLess = () => setVisible(INITIAL_COUNT);

  const courses = sampleCompletedCourses || [];

  const allVisible = visible >= courses.length;

  return (
    <div className="bg-gray-50 px-8 py-10">
      <h2 className="text-2xl font-bold text-gray-900">Completed Courses</h2>

      <p className="text-gray-500 mt-2 mb-8">
        You've finished these. Great job!
      </p>

      {courses.length === 0 ? (
        <p className="text-gray-500">No completed courses yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.slice(0, visible).map((course) => (
              <CourseCompletionCard key={course.id} course={course} />
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            {!allVisible && (
              <button
                onClick={showMore}
                className="border border-yellow-400 px-5 py-2 rounded-md text-sm hover:bg-yellow-50"
              >
                See more
              </button>
            )}

            {allVisible && visible > INITIAL_COUNT && (
              <button
                onClick={showLess}
                className="border border-yellow-400 px-5 py-2 rounded-md text-sm hover:bg-yellow-50"
              >
                Show less
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CourseCompletionList;
