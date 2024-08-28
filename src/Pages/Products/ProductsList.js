/* eslint-disable no-unused-vars */
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


export default function ProductList() {



  return (
    <div className="container">

      <div className="row product-edit ml-4">
          <h4 className="text-center font-weight-bold bg-light px-5 py-3">لا توجد منتجات </h4>
    
            <div className="col-md-4" >
              <Card sx={{ maxWidth: 300 }} className="mb-5">
                <div>
                  <img
                    style={{ width: "80%", height: "250px", marginLeft: "10%" }}
                    src=''
                    alt=''
                  />
                </div>
                <CardContent>

                  <Typography gutterBottom variant="h5" component="div">
                    ايس كريم
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    50
                  </Typography>

                  <Typography color="text.secondary">
                    المعادي
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
