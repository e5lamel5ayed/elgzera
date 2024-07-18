import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { baseURL, IMG_URL, SALES_CENTERS } from "../../Components/Api";
import { useNavigate } from "react-router";
import { Loading } from "../../Components/Loading";

export default function PlacesList() {
  const [salesCenters, setSalesCenters] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/${SALES_CENTERS}`);
      setSalesCenters(response.data);
      setLoading(false);

    } catch (error) {
      setLoading(false);

      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const EditRow = (id) => {
    navigate(`/AddProducts`, { state: { id } });
  };

  const DeleteRow = async (id) => {
    try {
      const res = await axios.delete(
        `${baseURL}/${SALES_CENTERS}/${id}`
      );
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="container">
      {loading && <Loading />}

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
                  <button className="btn btn-primary ml-2"
                    onClick={() => EditRow(center.id)}
                  >
                    تعديل
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => DeleteRow(center.id)}
                  >
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
