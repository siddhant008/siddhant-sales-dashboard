import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import { FileContext } from "../../App";
import { Bar } from "react-chartjs-2";

const BarChartCard = () => {
  const { file } = useContext(FileContext);

  const [barChartData, setBarChartData] = useState<any>({});

  type GroupedData = Record<
    string,
    Record<string, { totalSales: number; totalInvestment: number }>
  >;
  type ResultType = Record<
    string,
    Record<string, { totalSales: number; totalInvestment: number }>
  >;

  useEffect(() => {
    // const groupedData: any = [];
    // const prodMap: any = {};
    // file.forEach((item) => {
    //   const product = item.Product;
    //   const region = item.Region;
    //   // console.log(item, region)
    //   const totalSales = parseFloat(item["Total Sales"]);
    //   const totalInvestment = parseFloat(item["Total Investment"]);

    //   if (!product) return;
    //   prodMap[product] = prodMap[product] || {};
    //   console.log(item);

    //   prodMap[product].totalSales = {
    //     ...prodMap[product].totalSales,
    //     [region]: totalSales + (prodMap[product].totalSales?.[region] || 0),
    //   };

    //   prodMap[product].totalInvestment = {
    //     ...prodMap[product].totalInvestment,
    //     [region]:
    //       totalInvestment + (prodMap[product].totalInvestment?.[region] || 0),
    //   };
    //   console.log(prodMap)
    // });
    // console.log('aslkdjalsjdkasjd', file, Object.values(prodMap));
    // delete groupedData["undefined"];

    const groupedData: GroupedData = file.reduce((result: ResultType, item) => {
      const product = item.Product;
      // const region = "totalSales";
      const region = item.Region;
      // const totalSales = item.Region;
      const totalSales = parseFloat(item["Total Sales"]);
      // const totalInvestment = item.Region;
      const totalInvestment = parseFloat(item["Total Investment"]);

      // console.log(item);
      if (!result[product]) {
        result[product] = {};
      }

      if (!result[product][region]) {
        result[product][region] = {
          totalSales: 0,
          totalInvestment: 0,
        };
      }

      result[product][region].totalSales += totalSales;
      result[product][region].totalInvestment += totalInvestment;

      return result;
    }, {});
    delete groupedData["undefined"];
    Object.keys(groupedData).length
      ? setBarChartData({
          labels: Object.keys(groupedData)
            .map((x) => Object.keys(groupedData[x]).map((y) => x + " : " + y))
            .flat(),
          // labels: Object.keys(groupedData),
          datasets: [
            {
              label: "Total Sales",
              data: Object.keys(groupedData)
                .map((p) =>
                  Object.keys(groupedData[p]).map((x: any) =>
                    groupedData[p][x]?.totalSales?.toFixed(2)
                  )
                )
                .flat(2),
              backgroundColor: "rgba(75, 192, 192, 0.6)", // Sales color
            },
            {
              label: "Total Investment",
              data: Object.keys(groupedData)
                .map((p) =>
                  Object.keys(groupedData[p]).map((x: any) =>
                    groupedData[p][x]?.totalInvestment?.toFixed(2)
                  )
                )
                .flat(2),
              backgroundColor: "rgba(255, 99, 132, 0.6)", // Investment color
            },
          ],
        })
      : setBarChartData({});

    // const a = Object.keys(groupedData).map((x) => ({
    //   label: "Total Sales",
    //   data: Object.keys(groupedData)
    //     .map((p) =>
    //       Object.keys(groupedData[p]).map(
    //         (x: any) => groupedData[p][x]?.totalSales
    //       )
    //     )
    //     .flat(2),
    //   backgroundColor: "rgba(75, 192, 192, 0.6)", // Sales color
    //   stack: "Stack 0",
    // }));
    // Object.keys(groupedData).length
    //   ? setBarChartData({
    //       labels: Object.keys(groupedData)
    //         .map((x) => Object.keys(groupedData[x]).map((y) => x))
    //         .flat(),
    //       // labels: Object.keys(groupedData),
    //       datasets: [
    //         {
    //           label: "Total Sales",
    //           data: Object.keys(groupedData)
    //             .map((p) =>
    //               Object.keys(groupedData[p]).map((x: any) =>
    //                 groupedData[p][x]?.totalSales?.toFixed(2)
    //               )
    //             )
    //             .flat(2),
    //           backgroundColor: "rgba(75, 192, 192, 0.6)", // Sales color
    //           stack: "Stack 0",
    //         },
    //         {
    //           label: "Total Investment",
    //           data: Object.keys(groupedData)
    //             .map((p) =>
    //               Object.keys(groupedData[p]).map((x: any) =>
    //                 groupedData[p][x]?.totalInvestment?.toFixed(2)
    //               )
    //             )
    //             .flat(2),
    //           backgroundColor: "rgba(255, 99, 132, 0.6)", // Investment color
    //           stack: "Stack 1",
    //         },
    //       ],
    //     })
    //   : setBarChartData({});
  }, [file]);
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
      {barChartData?.datasets?.[0]?.data ? (
        <>
          <h2 style={{ textAlign: "center" }}>
            Sales VS Investment over time(weeks)
          </h2>
          <Bar
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Sales VS Investment over time(weeks)",
                },
              },
              responsive: true,
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                },
              },
            }}
            data={barChartData}
          />
        </>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <h3>No Bar Chart Data Available</h3>
        </Box>
      )}
    </Box>
  );
};

export default BarChartCard;
