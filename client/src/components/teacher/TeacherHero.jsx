const stats = [
  { title: "Total Students", value: "450", change: "5% increase" },
  { title: "Courses Active", value: "12", change: "3% increase" },
  { title: "Assignments Graded", value: "120", change: "10% increase" },
  { title: "Feedback Received", value: "50", change: "2% increase" },
];

const TeacherHero = () => {
  return (
    <section className="px-10 pt-10">
      {/* HEADING */}
      <h1 className="text-3xl font-bold">
        Welcome, <span className="text-yellow-400">John!</span>
      </h1>

      <p className="text-gray-500 mt-1 text-sm">
        Here’s how your courses are performing today.
      </p>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        {stats.map((item) => (
          <div
            key={item.title}
            className="border border-gray-200 rounded-xl p-6 bg-white"
          >
            <p className="text-sm text-gray-700">{item.title}</p>

            <h2 className="text-3xl font-bold mt-3">{item.value}</h2>

            <p className="text-blue-500 text-xs mt-3">{item.change}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeacherHero;
