import CourseCard from "./CourseCard";

export default function CourseGrid() {
  return (
    <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

      <CourseCard title="UI/UX Design Fundamentals" author="James Liu" price="19.99" />
      <CourseCard title="Full-Stack Python" author="Emma Davis" price="25.99" />
      <CourseCard title="Responsive Web Design" author="John Smith" price="18.99" />
      <CourseCard title="Data Science Course" author="Sophia Clark" price="22.99" />

    </div>
  );
}
