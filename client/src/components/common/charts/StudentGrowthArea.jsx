import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

const FULL_DATA = [
  { label: "Jan", value: 150 },
  { label: "Feb", value: 170 },
  { label: "Mar", value: 380 },
  { label: "Apr", value: 270 },
  { label: "May", value: 350 },
  { label: "Jun", value: 260 },
  { label: "Jul", value: 450 },
  { label: "Aug", value: 300 },
  { label: "Sep", value: 330 },
  { label: "Oct", value: 360 },
  { label: "Nov", value: 430 },
  { label: "Dec", value: 400 },
];

const avg = (arr) => Math.round(arr.reduce((s, v) => s + v, 0) / arr.length);

const StudentGrowthArea = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;

      if (w < 640) {
        setChartData([
          {
            label: "Jan",
            value: avg(FULL_DATA.slice(0, 5).map((d) => d.value)),
          },
          {
            label: "Feb",
            value: avg(FULL_DATA.slice(5, 9).map((d) => d.value)),
          },
          { label: "Mar", value: avg(FULL_DATA.slice(9).map((d) => d.value)) },
        ]);
      } else {
        setChartData(FULL_DATA);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const data = {
    labels: chartData.map((d) => d.label),
    datasets: [
      {
        data: chartData.map((d) => d.value),
        borderColor: "#FFD700",
        backgroundColor: "rgba(255,215,0,0.25)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    // 🔑 critical containment padding
    layout: {
      padding: {
        top: 12,
        bottom: 8,
        left: 12,
        right: 12,
      },
    },

    plugins: {
      legend: { display: false },
    },

    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#6B7280",
          padding: 6,
        },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#6B7280" },
        grid: {
          color: "#E5E7EB",
          borderDash: [4, 4],
        },
      },
    },
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 h-[320px] overflow-hidden">
      <h3 className="font-semibold mb-4">Student Growth</h3>

      {/* inner wrapper locks canvas */}
      <div className="relative h-[240px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default StudentGrowthArea;

// import { Line } from "react-chartjs-2";
// import { useEffect, useState } from "react";

// const FULL_DATA = [
//   { label: "Jan", value: 150 },
//   { label: "Jan", value: 170 },
//   { label: "Jan", value: 380 },
//   { label: "Jan", value: 270 },
//   { label: "Jan", value: 350 },
//   { label: "Feb", value: 260 },
//   { label: "Feb", value: 450 },
//   { label: "Feb", value: 300 },
//   { label: "Feb", value: 330 },
//   { label: "Mar", value: 360 },
//   { label: "Mar", value: 430 },
//   { label: "Mar", value: 400 },
// ];

// const average = (arr) =>
//   Math.round(arr.reduce((s, v) => s + v, 0) / arr.length);

// const StudentGrowthArea = () => {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     const update = () => {
//       const w = window.innerWidth;

//       if (w < 640) {
//         // 📱 mobile → 3 points (Jan / Feb / Mar avg)
//         setChartData([
//           {
//             label: "Jan",
//             value: average(FULL_DATA.slice(0, 5).map((d) => d.value)),
//           },
//           {
//             label: "Feb",
//             value: average(FULL_DATA.slice(5, 9).map((d) => d.value)),
//           },
//           {
//             label: "Mar",
//             value: average(FULL_DATA.slice(9).map((d) => d.value)),
//           },
//         ]);
//       } else {
//         // 🖥 desktop → full detail
//         setChartData(FULL_DATA);
//       }
//     };

//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   const data = {
//     labels: chartData.map((d) => d.label),
//     datasets: [
//       {
//         data: chartData.map((d) => d.value),
//         borderColor: "#FFD700",
//         backgroundColor: "rgba(255,215,0,0.25)",
//         fill: true,
//         tension: 0.4,
//         pointRadius: 0,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     layout: {
//       padding: { top: 10, left: 10, right: 10, bottom: 8 },
//     },
//     plugins: { legend: { display: false } },
//     scales: {
//       x: {
//         grid: { display: false },
//         ticks: { color: "#6B7280" },
//       },
//       y: {
//         beginAtZero: true,
//         ticks: { color: "#6B7280" },
//         grid: {
//           color: "#E5E7EB",
//           borderDash: [4, 4],
//         },
//       },
//     },
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-xl p-6 h-[320px]">
//       <h3 className="font-semibold mb-4">Student Growth</h3>
//       <Line data={data} options={options} />
//     </div>
//   );
// };

// export default StudentGrowthArea;
