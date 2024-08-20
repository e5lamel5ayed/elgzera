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
import { baseURL, TOTAL_DAILY_REPORTS } from "../../Components/Api";

const Home = () => {
  const parseDate = (formattedDate) => {
    const [year, month, day] = formattedDate.split("-");
    return `${day}-${month}-${year}`;
  };

  // Helper function to format date
  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${year}-${month}-${day}`;
  };

  const defaultStartDate = formatDate("2024-08-13");
  const defaultEndDate = formatDate(new Date().toISOString().split('T')[0]);

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [categories, setCategories] = useState([]);
  const [all, setAll] = useState([]);

  const theme = useTheme();
  const isMobileOrMedium = useMediaQuery(theme.breakpoints.down("md"));

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

  // Fetch data for today
  useEffect(() => {
    const fetchDataAll = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${baseURL}/${TOTAL_DAILY_REPORTS}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setAll(response.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAll();
  }, []);

  // Fetch data by date from: and to:
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${baseURL}/reports/duration-total-report?from=${formatDate(startDate)}&to=${formatDate(endDate)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  const handleStartDateChange = (e) => setStartDate(formatDate(e.target.value));
  const handleEndDateChange = (e) => setEndDate(formatDate(e.target.value));

  const pastelColors = ["#FFD1DC", "#FFDEAD", "#E0BBE4", "#C6E2FF"];

  // Create the data object for the SalesBarChart
  const chartData = {
    labels: categories.map((category) =>
      parseDate(category.orderDate.split("T")[0])
    ),
    datasets: [
      {
        label: "التذاكر المباعة",
        data: categories.map((category) => category.ticketCount),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

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
        <div>
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
            {all.map((item, index) => (
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
                {/* show icon with category*/}
                {getCategoryIcon(index)}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h3>{item.category}</h3>
                  <h5>{item.quantity}</h5>
                </div>
              </Paper>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "20px",
            flexDirection: isMobileOrMedium ? "column" : "row",
          }}
        >
          <label
            style={{
              width: isMobileOrMedium ? "100%" : "50%",
              marginRight: isMobileOrMedium ? "0" : "10px",
            }}
          >
            <label className="d-flex justify-content-end" htmlFor=""> : الي </label>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "15px",
                border: "1px solid grey",
                padding: "20px",
              }}
            />
          </label>

          <label style={{ width: isMobileOrMedium ? "100%" : "50%" }}>
            <label className="d-flex justify-content-end" htmlFor=""> : من </label>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "15px",
                border: "1px solid grey",
                padding: "20px",
                marginBottom: isMobileOrMedium ? "10px" : "0",
              }}
            />
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

          <SalesBarChart data={chartData} />
          <BasicPie startDate={startDate} endDate={endDate} />
        </div>
      </div>
    </div>
  );
};

export default Home;
