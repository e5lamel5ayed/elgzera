import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";
import { baseURL, TOTAL_DAILY_REPORTS } from "../../Components/Api";

export default function BasicPie() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/${TOTAL_DAILY_REPORTS}`
        );
        const data = response.data;

        const formattedData = data.map((item, index) => ({
          id: index,
          value: item.quantity,
          label: item.category,
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <PieChart
      colors={["#FFD1DC", "#FFDEAD", "#E0BBE4", "#C6E2FF", "#FFC0CB", "#DDA0DD"]}
      series={[
        {
          data: chartData,
        },
      ]}
      height={240}
    />
  );
}
