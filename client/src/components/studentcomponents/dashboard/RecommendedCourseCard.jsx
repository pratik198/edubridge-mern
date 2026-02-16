const RecommendedCourseCard = ({ course }) => {
  if (!course) return null;

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
      {/* Image */}
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-44 object-cover rounded-lg"
      />

      {/* Content */}
      <div className="mt-4">
        {/* Instructor */}
        <p className="text-sm text-gray-500">{course.instructor}</p>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mt-1">{course.title}</h3>

        {/* Rating + Duration + Level */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <span className="text-yellow-500">★</span>
          <span>{course.rating}</span>
          <span>•</span>
          <span>{course.duration}</span>
          <span>•</span>
          <span>{course.level}</span>
        </div>
      </div>
    </div>
  );
};

export default RecommendedCourseCard;
