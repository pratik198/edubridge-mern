import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

const courses = [
  { title: "UI Design Basics", enrollments: 340 },
  { title: "Data Science Course", enrollments: 275 },
  { title: "Digital Illustration", enrollments: 50 },
  { title: "Advanced Excel", enrollments: 410 },
  { title: "React Fundamentals", enrollments: 380 },
  { title: "Node.js Essentials", enrollments: 290 },
  { title: "UI Animation Mastery", enrollments: 180 },
];

const INITIAL_COUNT = 4;

export default function LatestCourses() {
  const [expanded, setExpanded] = useState(false);

  const visibleCourses = expanded ? courses : courses.slice(0, INITIAL_COUNT);

  return (
    <div className="space-y-6">
      {/* TITLE */}
      <h2 className="text-xl font-semibold">Latest Courses</h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleCourses.map((course, index) => (
          <div
            key={index}
            className="
              flex items-center justify-between
              bg-white
              border border-gray-200
              rounded-xl
              px-5 py-4
              hover:shadow-sm
              transition
            "
          >
            <div>
              <p className="font-medium text-gray-900">{course.title}</p>
              <p className="text-sm text-gray-500 mt-1">
                Enrollments: {course.enrollments}
              </p>
            </div>

            <HiOutlineDotsVertical className="text-gray-400 cursor-pointer" />
          </div>
        ))}
      </div>

      {/* BUTTON */}
      {courses.length > INITIAL_COUNT && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="
            border border-yellow-400
            px-6 py-2
            rounded-lg
            text-sm
            hover:bg-yellow-50
            transition
          "
        >
          {expanded ? "Show less" : "See more"}
        </button>
      )}
    </div>
  );
}
