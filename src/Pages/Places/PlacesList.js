/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


export default function PlacesList() {


  return (
    <div className="container">

      <div className="row product-edit ml-4">

          <h4 className="text-center font-weight-bold bg-light px-5 py-3">لا توجد اماكن </h4>

            <div className="col-md-4" >
              <Card sx={{ maxWidth: 300 }} className="mb-5">
                <img
                  style={{ width: "80%", height: "250px", objectFit: "cover", marginLeft: "10%" }}
                  src=''
                  alt=''
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    المعادي
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    20 Products
                  </Typography>
                  <div className="d-flex justify-content-between mt-2">
                    <button
                      className="btn btn-primary ml-2"
                    >
                      تعديل
                    </button>
                    <button
                      className="btn btn-danger"
                    >
                      حذف
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

      </div>
    </div>
  );
}
