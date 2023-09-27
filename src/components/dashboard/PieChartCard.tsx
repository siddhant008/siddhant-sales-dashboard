import PieChart from "./PieChart";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useContext, useEffect } from "react";
import { FileContext } from "../../App";
import { useState } from "react";
import { chartColors } from "./colors";

const PieChartCard = () => {
  const { file } = useContext(FileContext);

  const [pieChartData, setPieChartData] = useState<any>({});
  const [pieFilter, setPieFilter] = useState({
    product: "Product A",
    region: "Region 1",
  });

  // Pie chart region dropdown handler
  const handleRegionChange = (event: SelectChangeEvent) => {
    setPieFilter((p) => ({
      ...p,
      region: event.target.value as string,
    }));
  };
  // Pie chart product dropdown handler
  const handleProductChange = (event: SelectChangeEvent) => {
    setPieFilter((p) => ({
      ...p,
      product: event.target.value as string,
    }));
  };

  useEffect(() => {
    const contri = {
      "Radio Contribution": 0,
      "Search Contribution": 0,
      "Social Contribution": 0,
      "Store Contribution": 0,
      "TV Contribution": 0,
      "Website Contribution": 0,
    };
    const filteredData = file.filter((x) => {
      const productMatches = pieFilter.product
        ? x.Product === pieFilter.product
        : true;
      const regionMatches = pieFilter.region
        ? x.Region === pieFilter.region
        : true;

      return productMatches && regionMatches;
    });
    // eslint-disable-next-line array-callback-return
    filteredData.map((x) => {
      contri["Radio Contribution"] += +x["Radio Contribution"];
      contri["Search Contribution"] += +x["Search Contribution"];
      contri["Social Contribution"] += +x["Social Contribution"];
      contri["Store Contribution"] += +x["Store Contribution"];
      contri["TV Contribution"] += +x["TV Contribution"];
      contri["Website Contribution"] += +x["Website Contribution"];
    });

    contri["Radio Contribution"] > 0
      ? setPieChartData({
          maintainAspectRatio: true,
          responsive: true,
          labels: [
            "Radio Contribution",
            "Search Contribution",
            "Social Contribution",
            "Store Contribution",
            "TV Contribution",
            "Website Contribution",
          ],
          datasets: [
            {
              data: [
                contri["Radio Contribution"].toFixed(2),
                contri["Search Contribution"].toFixed(2),
                contri["Social Contribution"].toFixed(2),
                contri["Store Contribution"].toFixed(2),
                contri["TV Contribution"].toFixed(2),
                contri["Website Contribution"].toFixed(2),
              ],
              backgroundColor: chartColors,
              hoverBackgroundColor: chartColors,
            },
          ],
        })
      : setPieChartData({});
  }, [file, pieFilter.region, pieFilter.product]);

  return (
    <Box
      sx={{
        border: "1px solid black",
        borderRadius: "8px",
        width: "850px",
        p: "18px",
        m: "auto",
        mb: 4,
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
            value={pieFilter?.region}
            label="Region"
            onChange={handleRegionChange}
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
            value={pieFilter?.product}
            label="Product"
            onChange={handleProductChange}
          >
            <MenuItem value={"Product A"}>Product A</MenuItem>
            <MenuItem value={"Product B"}>Product B</MenuItem>
            <MenuItem value={"Product C"}>Product C</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {pieChartData?.datasets ? (
        <Box sx={{ width: "50%", margin: "auto" }}>
          <PieChart
            chartData={pieChartData}
            title="Channel's Contribution to total sales"
          />
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <h3>No Pie Chart Data Available</h3>
        </Box>
      )}
    </Box>
  );
};

export default PieChartCard;
