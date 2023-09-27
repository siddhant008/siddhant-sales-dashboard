import { Line } from "react-chartjs-2";

function LineChart({ chartData, title, options }: any) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>{title}</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: title,
            },
            legend: {
              display: false,
            },
          },
          ...options
        }}
      />
    </div>
  );
}
export default LineChart;
