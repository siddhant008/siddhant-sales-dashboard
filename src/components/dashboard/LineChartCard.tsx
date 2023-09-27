import LineChart from "../LineChart";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useEffect, useState } from "react";
import { FileContext } from "../../App";

const LineChartCard = () => {
  const { file } = useContext(FileContext);

  const [lineChartData, setLineChartData] = useState<any>({});
  const [lineFilter, setLineFilter] = useState({
    product: "Product A",
    region: "Region 1",
  });

  // Line chart region dropdown handler
  const handleLineRegionChange = (event: SelectChangeEvent) => {
    setLineFilter((p) => ({
      ...p,
      region: event.target.value as string,
    }));
  };
  // Line chart product dropdown handler
  const handleLineProductChange = (event: SelectChangeEvent) => {
    setLineFilter((p) => ({
      ...p,
      product: event.target.value as string,
    }));
  };

  useEffect(() => {
    //WEEKLY LINE CHART
    function getWeekNumber(date: Date): number {
      const currentDate = new Date(date);
      currentDate.setHours(0, 0, 0, 0);
      currentDate.setDate(
        currentDate.getDate() + 4 - (currentDate.getDay() || 7)
      );
      const yearStart = new Date(currentDate.getFullYear(), 0, 1);
      return Math.ceil(
        ((new Date(currentDate).valueOf() - new Date(yearStart).valueOf()) /
          86400000 +
          1) /
          7
      );
    }

    // Group the data by week and calculate totals
    const weeklyData: Record<
      number,
      { totalSales: number; totalInvestment: number; totalImpact: number }
    > = {};

    const filteredData = file.filter((x) => {
      const productMatches = lineFilter.product
        ? x.Product === lineFilter.product
        : true;
      const regionMatches = lineFilter.region
        ? x.Region === lineFilter.region
        : true;

      return productMatches && regionMatches;
    });

    filteredData.forEach((item: any) => {
      const dateParts = item.Date.split("-");
      const year = parseInt(dateParts[2], 10);
      const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
      const day = parseInt(dateParts[0], 10);

      const currentDate = new Date(year, month, day);
      const weekNumber = getWeekNumber(currentDate);

      if (!weeklyData[weekNumber]) {
        weeklyData[weekNumber] = {
          totalSales: 0,
          totalInvestment: 0,
          totalImpact: 0,
        };
      }
      weeklyData[weekNumber].totalSales += parseFloat(item["Total Sales"]);
      weeklyData[weekNumber].totalInvestment += parseFloat(
        item["Total Investment"]
      );
      weeklyData[weekNumber].totalImpact += parseFloat(item["Impact"]);
    });

    setLineChartData({
      // ...chart data
      maintainAspectRatio: true,
      responsive: true,
      labels: Object.keys(weeklyData).map((data: any) => "week " + data),
      datasets: [
        {
          yAxisID: "y",
          label: "Total Sales ",
          data: Object.keys(weeklyData).map(
            (data: any) => weeklyData[data].totalSales
          ),
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
          yAxisID: "y",
          label: "Total Spend ",
          data: Object.keys(weeklyData).map(
            (data: any) => weeklyData[data].totalInvestment
          ),
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
        {
          yAxisID: "y1",
          label: "Total Impact ",
          data: Object.keys(weeklyData).map(
            (data: any) => weeklyData[data].totalImpact
          ),
          borderWidth: 1,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(122,12,12,0.4)",
          borderColor: "rgba(122,12,12,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(122,12,12,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(122,12,12,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
        },
      ],
    });
  }, [file, lineFilter.region, lineFilter.product]);

  return (
    <Box
      sx={{
        border: "1px solid black",
        borderRadius: "8px",
        width: "850px",
        p: "18px",
        m: "auto",
        mb: 2,
      }}
    >
      <Box
        sx={{
          minWidth: 120,
          display: "flex",
          justifyContent: "space-around",
          pb: 2,
          borderBottom: "1px solid black",
        }}
      >
        <FormControl sx={{ width: "250px" }}>
          <InputLabel id="region-select-label">Region</InputLabel>
          <Select
            labelId="region-select-label"
            id="region-simple-select"
            value={lineFilter.region}
            label="Region"
            onChange={handleLineRegionChange}
          >
            <MenuItem value={"Region 1"}>Region 1</MenuItem>
            <MenuItem value={"Region 2"}>Region 2</MenuItem>
            <MenuItem value={"Region 3"}>Region 3</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: "250px" }}>
          <InputLabel id="product-select-label">Product</InputLabel>
          <Select
            labelId="product-select-label"
            id="product-simple-select"
            value={lineFilter.product}
            label="Product"
            onChange={handleLineProductChange}
          >
            <MenuItem value={"Product A"}>Product A</MenuItem>
            <MenuItem value={"Product B"}>Product B</MenuItem>
            <MenuItem value={"Product C"}>Product C</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {lineChartData?.datasets?.[0]?.data?.length ? (
        <Box sx={{ width: "75%", margin: "auto" }}>
          <LineChart
            title="Sales VS Spend Trend Over Time"
            chartData={lineChartData}
            options={{
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                },
                y: {
                  type: "linear",
                  position: "left",
                  grid: {
                    borderDash: [8, 6],
                    lineWidth: 2,
                  },
                  ticks: {
                    maxTicksLimit: 6,
                  },
                },
                y1: {
                  type: "linear",
                  position: "right",
                  grid: {
                    borderDash: [8, 6],
                    lineWidth: 2,
                  },
                  ticks: {
                    maxTicksLimit: 6,
                  },
                },
              },
            }}
          />
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <h3>No Line Chart Data Available</h3>
        </Box>
      )}
    </Box>
  );
};

export default LineChartCard;
