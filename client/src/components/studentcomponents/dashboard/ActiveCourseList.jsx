import { useState } from "react";
import ActiveCourseCard from "./ActiveCourseCard";
import { courses } from "../../../data/courses";

const ActiveCourseList = () => {
  const INITIAL_COUNT = 4;

  const [visible, setVisible] = useState(INITIAL_COUNT);

  const showMore = () => setVisible((v) => v + 4);
  const showLess = () => setVisible(INITIAL_COUNT);

  const allVisible = visible >= courses.length;

  return (
    <div className="bg-gray-50 px-8 py-10">
      <h2 className="text-2xl font-bold text-gray-900">My Active Courses</h2>

      <p className="text-gray-500 mt-2 mb-8">
        Here’s what you’re currently learning
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.slice(0, visible).map((course) => (
          <ActiveCourseCard key={course._id} course={course} />
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        {!allVisible && (
          <button
            onClick={showMore}
            className="border border-yellow-400 text-gray-800 px-5 py-2 rounded-lg hover:bg-yellow-50 transition-all duration-300 text-sm"
          >
            See more
          </button>
        )}

        {allVisible && visible > INITIAL_COUNT && (
          <button
            onClick={showLess}
            className="border border-yellow-400 text-gray-800 px-5 py-2 rounded-lg hover:bg-yellow-50 transition-all duration-300 text-sm"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
};

export default ActiveCourseList;

// import { useState } from "react";
// import ActiveCourseCard from "./ActiveCourseCard";
// import { courses } from "../../../data/courses";

// const ActiveCourseList = () => {
//   const INITIAL_COUNT = 4;

//   const [visible, setVisible] = useState(INITIAL_COUNT);

//   const showMore = () => setVisible((v) => v + 4);
//   const showLess = () => setVisible(INITIAL_COUNT);

//   const allVisible = visible >= courses.length;

//   return (
//     <div className="bg-gray-50 px-8 py-10">
//       {/* Title */}
//       <h2 className="text-2xl font-bold text-gray-900">My Active Courses</h2>

//       <p className="text-gray-500 mt-2 mb-8">
//         Here’s what you’re currently learning
//       </p>

//       {/* Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {courses.slice(0, visible).map((course) => (
//           <ActiveCourseCard key={course.id} course={course} />
//         ))}
//       </div>

//       {/* Buttons */}
//       <div className="flex gap-3 mt-6">
//         {!allVisible && (
//           <button
//             onClick={showMore}
//             className="
//               border border-yellow-400
//               text-gray-800
//               px-5 py-2
//               rounded-lg
//               hover:bg-yellow-50
//               transition-all duration-300
//               text-sm
//             "
//           >
//             See more
//           </button>
//         )}

//         {allVisible && visible > INITIAL_COUNT && (
//           <button
//             onClick={showLess}
//             className="
//               border border-yellow-400
//               text-gray-800
//               px-5 py-2
//               rounded-lg
//               hover:bg-yellow-50
//               transition-all duration-300
//               text-sm
//             "
//           >
//             Show less
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ActiveCourseList;
