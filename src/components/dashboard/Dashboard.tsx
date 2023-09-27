import PieChartCard from "./PieChartCard";
import LineChartCard from "./LineChartCard";
import BarChartCard from "./BarChartCard";
import Box from "@mui/material/Box";

const Home = () => {
  return (
    <>
      <Box>
        <h1>Dashboard</h1>
      </Box>
      <hr />
      <Box sx={{ mt: 4 }}>
        <PieChartCard />
        <BarChartCard />
        <LineChartCard />
      </Box>
    </>
  );
};

export default Home;
