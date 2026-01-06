export default function CategoryCard({ title }) {
  return (
    <div
      className="
        border 
        rounded-xl 
        px-4 
        py-3 
        shadow-sm 
        bg-white
        text-gray-700 
        text-sm
        hover:shadow-md 
        transition
        cursor-pointer
      "
    >
      {title}
    </div>
  );
}
