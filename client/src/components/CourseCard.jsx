import { AiFillStar } from "react-icons/ai";

export default function CourseCard({ title, author, price }) {
  return (
    <div className="border rounded-xl p-3 shadow-sm hover:shadow-md transition bg-white">

      <img
        className="rounded-lg"
        src="https://picsum.photos/300/200"
      />

      <p className="text-sm font-semibold mt-3">{title}</p>
      <p className="text-gray-500 text-xs mt-1">{author}</p>

      <div className="flex gap-1 mt-2 text-yellow-400 text-sm">
        {[1, 2, 3, 4, 5].map(i => <AiFillStar key={i} />)}
      </div>

      <p className="font-semibold mt-2 text-sm">${price}</p>
    </div>
  );
}
