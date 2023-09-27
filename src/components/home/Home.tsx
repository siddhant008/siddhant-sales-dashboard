import { useEffect } from "react";
import { FileContext } from "../../App";
import { useContext, useState } from "react";
import { arrayType } from "../types";
import { Box } from "@mui/material";
import Counter from "./Counter";
import LineChart from "../LineChart";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

const Home = () => {
  const { file } = useContext(FileContext);

  const [totalSales, setTotalSales] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalImpact, setTotalImpact] = useState(0);
  const [roi, setRoi] = useState(0);

  const [chartData, setChartData] = useState<any>({});

  const [chartData2, setChartData2] = useState<any>({});

  useEffect(() => {
    let sales = 0;
    let impact = 0;
    let spend = 0;

    file.forEach((x: arrayType) => {
      sales += +x["Total Sales"] || 0;
      spend += +x["Total Investment"] || 0;
      impact += +x["Impact"] || 0;
    });

    const tempMonthlyResults: Record<
      string,
      { totalSales: number; totalInvestment: number; roi: number }
    > = {};

    file.forEach((item) => {
      if (item.Date) {
        const dateParts = item.Date.split("-");
        const monthYear = `${dateParts[1]}-${dateParts[2]}`;

        if (!tempMonthlyResults[monthYear]) {
          tempMonthlyResults[monthYear] = {
            totalSales: 0,
            totalInvestment: 0,
            roi: 0,
          };
        }

        tempMonthlyResults[monthYear].totalSales += parseFloat(
          item["Total Sales"]
        );
        tempMonthlyResults[monthYear].totalInvestment += parseFloat(
          item["Total Investment"]
        );
      }
    });

    const x = [];
    for (const monthYear in tempMonthlyResults) {
      const { totalSales, totalInvestment } = tempMonthlyResults[monthYear];
      const roi = ((totalSales - totalInvestment) / totalInvestment) * 100;
      tempMonthlyResults[monthYear].roi = roi;
      x.push({
        year: monthYear,
        roi: roi,
        totalSales: totalSales,
        totalSpend: totalInvestment,
      });
    }

    setChartData({
      // ...chart data
      maintainAspectRatio: true,
      responsive: true,
      labels: x.map((data: any) => data.year),
      datasets: [
        {
          label: "ROI ",
          data: x.map((data: any) => data.roi),
          borderWidth: 1,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
        },
      ],
    });

    setChartData2({
      // ...chart data
      maintainAspectRatio: true,
      responsive: true,
      labels: x.map((data: any) => data.year),
      datasets: [
        {
          label: "Total Sales ",
          data: x.map((data: any) => data.totalSales),
          borderWidth: 1,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,12,192,0.4)",
          borderColor: "rgba(75,12,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,12,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,12,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
        },
        {
          label: "Total Spend ",
          data: x.map((data: any) => data.totalSpend),
          borderWidth: 1,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,12,0.4)",
          borderColor: "rgba(75,192,12,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,12,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,12,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
        },
      ],
    });
    setTotalSales(+sales.toFixed(2));
    setTotalSpend(+spend.toFixed(2));
    setTotalImpact(+impact.toFixed(2));
    setRoi(+(((sales - spend) / spend) * 100).toFixed(2) || 0);
  }, [file]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Home</h1>
      <hr style={{ width: "100%" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 4,
          mt: 4,
          mb: 4,
        }}
      >
        <Counter title={"Total Sales"} value={totalSales} />
        <Counter title={"Total Spend"} value={totalSpend} />
        <Counter title={"Total Impact"} value={totalImpact} />
        <Counter title={"ROI"} value={roi} />
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        {chartData?.datasets && (
          <Box
            sx={{
              border: "1px solid black",
              borderRadius: "8px",
              minHeight: "50%",
              // width: "850px",
              // width: 'auto',
              p: "18px",
              m: "auto",
              mb: 4,
            }}
          >
            <LineChart
              title="ROI Trend Over TIme "
              chartData={chartData}
              options={{ maintainAspectRatio: true, responsive: true }}
            />
          </Box>
        )}

        {chartData2?.datasets && (
          <Box
            sx={{
              border: "1px solid black",
              borderRadius: "8px",
              // width: "850px",
              minHeight: "50%",
              p: "18px",
              m: "auto",
              mb: 4,
            }}
          >
            <LineChart
              title="Sales VS Spend Trend Over Time"
              chartData={chartData2}
              options={{ maintainAspectRatio: true, responsive: true }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
