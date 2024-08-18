import React, { useState, useEffect } from "react";
import SalesBarChart from "./SaleBarChart";
import Drawer from "../../Components/Drawer";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import PeopleIcon from "@mui/icons-material/People";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import BasicPie from "./Chart1";
import axios from "axios";
import { baseURL, TOTAL_DAILY_REPORTS, DAILY_REPORTS } from "../../Components/Api";

const Home = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [categories, setCategories] = useState([]);

  const theme = useTheme();
  const isMobileOrMedium = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    // Fetch available dates from the API
    const fetchDates = async () => {
      try {
        const response = await axios.get(`${baseURL}/${DAILY_REPORTS}`);
        const dates = response.data.map(item => item.date);
        setAvailableDates(dates); // Set available dates
      } catch (error) {
        console.error("Error fetching dates:", error);
      }
    };

    fetchDates();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/${TOTAL_DAILY_REPORTS}`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get('https://org-bay.runasp.net/api/reports/detailed-daily-report');
        const apiData = response.data;

        // Transform data to fit chart structure
        const labels = apiData.map(item => item.category);
        const dataValues = apiData.map(item => item.quantity);

        const data = {
          labels: labels,
          datasets: [
            {
              label: "Tickets Sold",
              data: dataValues,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchChartData();
  }, []);

  const getCategoryIcon = (index) => {
    switch (index % 4) {
      case 0:
        return <FamilyRestroomIcon />;
      case 1:
        return <PeopleIcon />;
      case 2:
        return <ConfirmationNumberIcon />;
      case 3:
        return <AccessibilityIcon />;
      default:
        return <PeopleIcon />;
    }
  };

  const paperData = categories.map((category, index) => ({
    label: category.category,
    count: category.quantity,
    icon: getCategoryIcon(index),
  }));

  const pastelColors = ["#FFD1DC", "#FFDEAD", "#E0BBE4", "#C6E2FF"];

  return (
    <div className="mb-5">
      <Drawer />
      <div
        style={{
          padding: "0 60px",
          fontFamily: "Arial, sans-serif",
          marginRight: isMobileOrMedium ? "0" : "240px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div className="card-header d-flex table-head-style justify-content-end">
          <h3>مبيعات اليوم</h3>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: isMobileOrMedium ? "center" : "space-between",
            flexDirection: isMobileOrMedium ? "column" : "row",
            marginTop: "10px",
          }}
        >
          {paperData.map((item, index) => (
            <Paper
              key={index}
              style={{
                textAlign: "center",
                backgroundColor: pastelColors[index % pastelColors.length],
                padding: "10px",
                borderRadius: "15px",
                width: isMobileOrMedium ? "100%" : "20%",
                marginBottom: isMobileOrMedium ? "10px" : "0",
                transition: "background-color 0.3s ease",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                margin: '5px'
              }}
              elevation={2}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#FFE4E1")
              }
              onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                pastelColors[index % pastelColors.length])
              }
            >
              <>{item.icon}</>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3>{item.label}</h3>
                <h5>{item.count}</h5>
              </div>
            </Paper>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "20px",
            flexDirection: isMobileOrMedium ? "column" : "row",
          }}
        >
          <label style={{ width: isMobileOrMedium ? "100%" : "50%" }}>
            From:
            <select
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "15px",
                border: "1px solid grey",
                padding: "20px",
                marginBottom: isMobileOrMedium ? "10px" : "0",
              }}
            >
              <option value="" disabled>Select Start Date</option>
              {availableDates.map((date, index) => (
                <option key={index} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </label>
          <label
            style={{
              width: isMobileOrMedium ? "100%" : "50%",
              marginLeft: isMobileOrMedium ? "0" : "10px",
            }}
          >
            To:
            <select
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "15px",
                border: "1px solid grey",
                padding: "20px",
              }}
            >
              <option value="" disabled>Select End Date</option>
              {availableDates.map((date, index) => (
                <option key={index} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            width: "100%",
            alignItems: "center",
            flexDirection: isMobileOrMedium ? "column" : "row",
            height: "100%",
          }}
        >
          {chartData && <SalesBarChart data={chartData} />}
          <BasicPie />
        </div>
      </div>
    </div>
  );
};

export default Home;
