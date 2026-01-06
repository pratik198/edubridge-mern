import Navbar from "../components/Navbar";

import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import CourseGrid from "../components/CourseGrid";
import CategoryCard from "../components/CategoryCard";
import TestimonialCard from "../components/TestimonialCard";
import Footer from "../components/Footer";

export default function StudentDashboard() {
  return (
    <>
      <Navbar />
      <Hero />

      <SectionTitle title="Recommended Courses" />
      <CourseGrid />

      <SectionTitle title="Trending Now" />
      <CourseGrid />

      <SectionTitle title="Category Explorer" />
      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          "UI/UX Design","Web Development","AI & Machine Learning",
          "Business & Marketing","Finance","Personal Development"
        ].map(c => <CategoryCard key={c} title={c}/>)}
      </div>

      <SectionTitle title="New Courses" />
      <CourseGrid />

      <SectionTitle title="Testimonials" />
      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3].map(i => <TestimonialCard key={i}/>)}
      </div>

      <Footer />
    </>
  );
}
