// src/components/CashbackChart.jsx
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CashbackChart = () => {
  const data = {
    labels: ["Groceries", "Utilities & Drugstores", "Other Local Spend"],
    datasets: [
      {
        label: "Cashback Rate",
        data: [4, 1, 0.3],
        backgroundColor: ["#E2B842", "#FFFFFF", "#A8C3BE"],
        borderColor: "#587C75",
        borderWidth: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#FFFFFF",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label || ""}: ${context.parsed || 0}%`,
        },
      },
    },
  };

  return (
    <section
      id="mechanics"
      className="mb-12 bg-black/20 p-6 rounded-2xl shadow-lg border border-white/10 backdrop-blur-sm animate-on-scroll"
    >
      <h2 className="text-2xl font-bold text-center mb-2">
        Understanding Your Cashback
      </h2>
      <p className="text-center text-gray-300 mb-6 max-w-2xl mx-auto">
        This card's highest rebate rates are focused on essential purchases like
        groceries.
      </p>
      <div className="chart-container">
        <Doughnut data={data} options={options} />
      </div>
    </section>
  );
};

export default CashbackChart;
