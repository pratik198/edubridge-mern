import { AiFillStar } from "react-icons/ai";

export default function TestimonialCard() {
  return (
    <div className="border rounded-xl p-6 shadow-sm">
      <p className="text-sm text-gray-600 leading-6">
        “This platform changed how I learn. Recommended!”
      </p>

      <div className="flex gap-1 text-yellow-400 mt-3">
        {[1,2,3,4,5].map(i => <AiFillStar key={i}/>)}
      </div>

      <div className="flex items-center gap-3 mt-5">
        <img className="w-10 h-10 rounded-full" src="https://i.pravatar.cc/100" />
        <div>
          <p className="font-medium text-sm">Marcus W.</p>
          <p className="text-xs text-gray-500">Student</p>
        </div>
      </div>
    </div>
  );
}
