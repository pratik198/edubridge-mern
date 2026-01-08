import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";

const FULL_DATA = [
  { label: "Jan", value: 70 },
  { label: "Feb", value: 78 },
  { label: "Mar", value: 48 },
  { label: "Apr", value: 85 },
  { label: "May", value: 110 },
  { label: "Jun", value: 78 },
  { label: "Jul", value: 98 },
  { label: "Aug", value: 90 },
  { label: "Sep", value: 120 },
  { label: "Oct", value: 74 },
  { label: "Nov", value: 95 },
  { label: "Dec", value: 78 },
];

// helpers
const average = (arr) =>
  Math.round(arr.reduce((s, v) => s + v, 0) / arr.length);

const group = (size) => {
  const result = [];
  for (let i = 0; i < FULL_DATA.length; i += size) {
    const slice = FULL_DATA.slice(i, i + size);
    result.push({
      label: slice.map((m) => m.label).join("–"),
      value: average(slice.map((m) => m.value)),
    });
  }
  return result;
};

const MonthlyEngagementBar = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const updateData = () => {
      const w = window.innerWidth;

      if (w <= 425) {
        // 📱 very small mobile → ONE bar
        setChartData([
          { label: "Year Avg", value: average(FULL_DATA.map((d) => d.value)) },
        ]);
      } else if (w < 768) {
        // 📱 mobile / small tablet → 4 bars
        setChartData(group(3));
      } else {
        // 🖥 desktop
        setChartData(FULL_DATA);
      }
    };

    updateData();
    window.addEventListener("resize", updateData);
    return () => window.removeEventListener("resize", updateData);
  }, []);

  const data = {
    labels: chartData.map((d) => d.label),
    datasets: [
      {
        data: chartData.map((d) => d.value),
        backgroundColor: "#FFD700",
        borderRadius: 6,
        categoryPercentage: 0.9,
        barPercentage: chartData.length === 1 ? 0.4 : 0.95,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 10, left: 10, right: 10, bottom: 12 },
    },
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6B7280" },
      },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 20, color: "#6B7280" },
        grid: {
          color: "#E5E7EB",
          borderDash: [4, 4],
        },
      },
    },
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 h-[340px]">
      <h3 className="font-semibold mb-4">Student Monthly Engagement</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlyEngagementBar;

// import { Bar } from "react-chartjs-2";

// const MonthlyEngagementBar = () => {
//   const data = {
//     labels: [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ],
//     datasets: [
//       {
//         data: [70, 78, 48, 85, 110, 78, 98, 90, 120, 74, 95, 78],
//         backgroundColor: "#FFD700",
//         borderRadius: 6,

//         // 🔑 THESE TWO LINES CONTROL BAR SPACING
//         categoryPercentage: 0.9, // almost full width per month
//         barPercentage: 0.95, // bars nearly touching
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,

//     // keeps axis + bars INSIDE the border
//     layout: {
//       padding: {
//         top: 10,
//         left: 10,
//         right: 10,
//         bottom: 12, // 👈 important for x-axis labels
//       },
//     },

//     plugins: {
//       legend: { display: false },
//     },

//     scales: {
//       x: {
//         grid: { display: false },
//         ticks: {
//           color: "#6B7280",
//           padding: 6, // 👈 space between bars & labels
//         },
//       },
//       y: {
//         beginAtZero: true,
//         ticks: {
//           stepSize: 20,
//           color: "#6B7280",
//         },
//         grid: {
//           color: "#E5E7EB",
//           borderDash: [4, 4],
//         },
//       },
//     },
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-xl p-6 h-[360px]">
//       <h3 className="font-semibold mb-4">Student Monthly Engagement</h3>

//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default MonthlyEngagementBar;
