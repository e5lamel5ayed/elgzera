/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { baseURL, IMG_URL, PRODUCTS } from "../../Components/Api";
import { useNavigate } from "react-router";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/${PRODUCTS}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
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
        `${baseURL}/${PRODUCTS}/${id}`
      );
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="row product-edit">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div className="col-md-4 ml-1" key={product.id}>
              <Card sx={{ maxWidth: 300 }} className="mb-5 ml-3">
                <div>
                  <img
                    style={{ width: "80%", marginLeft: "10%" }}
                    src={`${IMG_URL}${product.imgUrl}`}
                    alt={product.name}
                  />
                </div>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`$ ${product.price}`}
                  </Typography>
                  <div className="d-flex justify-content-between mt-2">
                    <button
                      className="btn btn-primary ml-2"
                      onClick={() => EditRow(product.id)}
                    >
                      تعديل
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => DeleteRow(product.id)}
                    >
                      حذف
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
