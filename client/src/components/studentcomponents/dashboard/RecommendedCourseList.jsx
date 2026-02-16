import { useState } from "react";
import RecommendedCourseCard from "./RecommendedCourseCard";
import { sampleRecommendedCourses } from "../../../data/sampleRecommendedCourses";

const RecommendedCourseList = () => {
  const INITIAL_COUNT = 4;

  const [visible, setVisible] = useState(INITIAL_COUNT);

  const showMore = () => setVisible((prev) => prev + 2);
  const showLess = () => setVisible(INITIAL_COUNT);

  const courses = sampleRecommendedCourses || [];
  const allVisible = visible >= courses.length;

  return (
    <div className="bg-gray-50 px-8 py-10">
      <h2 className="text-2xl font-bold text-gray-900">Recommended Courses</h2>

      <p className="text-gray-500 mt-2 mb-8">
        Courses handpicked for you, John.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.slice(0, visible).map((course) => (
          <RecommendedCourseCard key={course.id} course={course} />
        ))}
      </div>

      {!allVisible && (
        <button
          onClick={showMore}
          className="
            mt-6
            border border-yellow-400
            px-5 py-2
            rounded-md
            text-sm
            hover:bg-yellow-50
          "
        >
          See more
        </button>
      )}

      {allVisible && visible > INITIAL_COUNT && (
        <button
          onClick={showLess}
          className="
            mt-6
            border border-yellow-400
            px-5 py-2
            rounded-md
            text-sm
            hover:bg-yellow-50
          "
        >
          Show less
        </button>
      )}
    </div>
  );
};

export default RecommendedCourseList;
