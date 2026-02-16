const ActiveCourseCard = ({ course }) => {
  return (
    <div
      className="
        rounded-2xl
        p-4
        bg-white
        border
        border-gray-200
        shadow-[0_6px_24px_rgba(0,0,0,0.06)]
        hover:shadow-[0_12px_32px_rgba(0,0,0,0.10)]
        hover:-translate-y-1
        transition-all
        duration-300
        cursor-pointer
      "
    >
      {/* IMAGE */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover hover:scale-105 transition duration-500"
        />
      </div>

      {/* AUTHOR */}
      <p className="text-gray-500 text-sm mt-3">{course.instructor}</p>

      {/* TITLE */}
      <h3 className="font-semibold text-lg mt-1 text-gray-900 leading-snug">
        {course.title}
      </h3>

      {/* PROGRESS */}
      <p className="text-sm text-gray-600 mt-3">{course.progress}% Complete</p>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
        <div
          className="h-full bg-yellow-400 rounded-full transition-all duration-700"
          style={{ width: `${course.progress}%` }}
        />
      </div>

      <button className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-sm font-medium py-2 rounded-lg transition-all duration-300">
        Continue
      </button>
    </div>
  );
};

export default ActiveCourseCard;
