import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { baseURL, IMG_URL, SALES_CENTERS } from "../../Components/Api";

export default function PlacesList() {
  const [salesCenters, setSalesCenters] = useState([]);

  useEffect(() => {
    const fetchSalesCenters = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/${SALES_CENTERS}`
        );
        setSalesCenters(response.data);
      } catch (error) {
        console.error("Error fetching sales centers:", error);
      }
    };

    fetchSalesCenters();
  }, []);

  return (
    <div className="container">
      <div className="row product-edit">
        {salesCenters.map((center) => (
          <div className="col-md-4 ml-1" key={center.id}>
            <Card sx={{ maxWidth: 300 }} className="mb-5 ml-3">
              <img
                style={{ width: "80%", height: "330px", objectFit: "cover" }}
                src={`${IMG_URL}${center.imgUrl}`}
                alt={center.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {center.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {center.location} Products
                </Typography>
                <div className="d-flex justify-content-between mt-2">
                  <button className="btn btn-primary ml-2">
                    تعديل
                  </button>
                  <button className="btn btn-danger">
                    حذف
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
