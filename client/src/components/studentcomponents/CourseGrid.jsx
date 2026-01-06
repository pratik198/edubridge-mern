
import { useState } from "react";
import CourseCard from "./CourseCard";

const dummyCourses = [
  {
    image: "https://picsum.photos/seed/a/400/300",
    author: "Amina Yusuf",
    title: "UI/UX Design Fundamentals",
    rating: "4.8",
    duration: "5h 30m",
    level: "Beginner"
  },
  {
    image: "https://picsum.photos/seed/b/400/300",
    author: "Sarah Thompson",
    title: "Build AI Chatbots with Python",
    rating: "4.6",
    duration: "8h 10m",
    level: "Intermediate"
  },
  {
    image: "https://picsum.photos/seed/c/400/300",
    author: "Daniel Assefa",
    title: "Data Science Masterclass",
    rating: "4.9",
    duration: "10h 20m",
    level: "Intermediate"
  },
  {
    image: "https://picsum.photos/seed/d/400/300",
    author: "Leila Habte",
    title: "Responsive Web Design",
    rating: "4.7",
    duration: "3h 45m",
    level: "Beginner"
  },
  {
    image: "https://picsum.photos/seed/e/400/300",
    author: "Marcus Lee",
    title: "Mobile App UI Design",
    rating: "4.8",
    duration: "6h 20m",
    level: "Beginner"
  },
  {
    image: "https://picsum.photos/seed/f/400/300",
    author: "Emily Carter",
    title: "Full-Stack Web Dev",
    rating: "4.7",
    duration: "12h 30m",
    level: "Advanced"
  }
];

export default function CourseGrid({ courses = dummyCourses }) {

  const INITIAL_COUNT = 4;
  const [visible, setVisible] = useState(INITIAL_COUNT);

  const showMore = () => setVisible(v => v + 4);
  const showLess = () => setVisible(INITIAL_COUNT);

  const allVisible = visible >= courses.length;

  return (
    <>
      {/* GRID */}
      <div className="max-w-7xl mx-auto px-6 mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {courses.slice(0, visible).map((item, i) => (
          <div
            key={`${item.title}-${i}`}   // UNIQUE KEY!
            style={{ animationDelay: `${i * 60}ms` }}
            className="animate-[fadeUp_0.4s_ease-out]"
          >
            <CourseCard {...item} />
          </div>
        ))}

      </div>

      {/* BUTTONS */}
      <div className="max-w-7xl mx-auto px-6 flex gap-3">

        {!allVisible && (
          <button
            onClick={showMore}
            className="
              border border-yellow-400 
              text-gray-800 
              px-5 py-2 rounded-lg
              mt-6
              hover:bg-yellow-50
              transition-all duration-300
              text-sm
            "
          >
            See more
          </button>
        )}

        {allVisible && visible > INITIAL_COUNT && (
          <button
            onClick={showLess}
            className="
              border border-yellow-400 
              text-gray-800 
              px-5 py-2 rounded-lg
              mt-6
              hover:bg-yellow-50
              transition-all duration-300
              text-sm
            "
          >
            Show less
          </button>
        )}

      </div>
    </>
  );
}
