
import Navbar from "../../../components/studentcomponents/Navbar";
import Hero from "../../../components/studentcomponents/Hero";
import SectionTitle from "../../../components/studentcomponents/SectionTitle";
import CourseGrid from "../../../components/studentcomponents/CourseGrid";
import CategoryCard from "../../../components/studentcomponents/CategoryCard";
import TestimonialCard from "../../../components/studentcomponents/TestimonialCard";
import Footer from "../../../components/studentcomponents/Footer";
import SeeMoreButton from "../../../components/studentcomponents/SeeMoreButton";

export default function StudentDashboard() {
  return (
    <>
      <Navbar />
      <Hero />

      {/* Recommended */}
      <SectionTitle 
        title="Recommended Courses" 
        subtitle="Courses handpicked for you, John"
      />

      <CourseGrid />

   


      {/* Trending */}
      <SectionTitle 
        title="Trending Now"
        subtitle="Start learning what's popular today"
      />

      <CourseGrid />

    

      {/* Categories */}
      <SectionTitle 
        title="Category Explorer"
        subtitle="Browse courses by learning area"
      />

      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {[
          {title:"UI/UX Design"},
          {title:"Web Development"},
          {title:"AI & Machine Learning"},
          {title:"Business & Marketing"},
          {title:"Finance"},
          {title:"Personal Development"},
          {title:"Languages"},
          {title:"Education & Teaching"},
        ].map(c => <CategoryCard key={c.title} {...c} />)}
      </div>


      {/* New */}
      <SectionTitle 
        title="New Courses"
        subtitle="Recently added — start exploring!"
      />

      <CourseGrid />

     


      {/* Testimonials */}
      <SectionTitle title="Testimonials" />

      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {[1,2,3].map(i => <TestimonialCard key={i} />)}
      </div>

      <Footer />
    </>
  );
}
