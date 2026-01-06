export default function CategoryCard({ title, desc }) {
  return (
    <div className="
      border 
      rounded-2xl 
      p-6 
      shadow-sm 
      bg-white 
      hover:shadow-lg 
      transition
    ">
      <h3 className="font-semibold text-lg">{title}</h3>

      {desc && (
        <p className="text-gray-500 text-sm mt-2 leading-6">
          {desc}
        </p>
      )}
    </div>
  );
}
