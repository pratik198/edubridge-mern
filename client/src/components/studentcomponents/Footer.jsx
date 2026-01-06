export default function Footer() {
  return (
    <footer className="bg-[#0b0b20] text-white mt-20 py-14">

      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-3 gap-10 text-sm">

        <div>
          <p className="font-bold text-lg">EdA</p>
          <p className="text-gray-400 mt-3">
            Learn anywhere, anytime.
          </p>
        </div>

        <div>
          <p className="font-bold mb-3">Explore</p>
          <p className="text-gray-400">Courses</p>
          <p className="text-gray-400">Categories</p>
        </div>

        <div>
          <p className="font-bold mb-3">Support</p>
          <p className="text-gray-400">Help Center</p>
        </div>

      </div>

      <p className="text-center text-gray-500 text-xs mt-10">
        © 2026 EdA. All rights reserved.
      </p>

    </footer>
  );
}
