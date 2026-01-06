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
  }
];

export default function CourseGrid({ courses = dummyCourses }) {
  return (
    <div className="
      max-w-7xl 
      mx-auto 
      px-6 
      mt-8 
      grid 
      sm:grid-cols-2 
      lg:grid-cols-4 
      gap-8
    ">
      {courses.map((item, i) => (
        <CourseCard key={i} {...item} />
      ))}
    </div>
  );
}
