import React from "react";
import Drawer from "../../Components/Drawer";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";


export default function AddProducts() {


  return (
    <div>
      <Drawer />
      <Box height={65} sx={{ direction: "rtl" }} />
      <div>
        <Link to="/AllProducts">
          <button className="btn btn-primary add-button">رجوع</button>
        </Link>
      </div>
      <Box sx={{ width: "80%", direction: "rtl" }}>
        <div className="card table-style" style={{ direction: "rtl" }}>
          <div className="card-header d-flex table-head-style">
            اضف البيانات
          </div>
          <div className="card-body">
            <form >
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name" className="d-flex">
                        الاسم
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        aria-describedby="nameHelp"
                      />
                     
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="price" className="d-flex">
                        السعر
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="price"
                        name="price"
                        aria-describedby="priceHelp"
                      />
                     
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="salesCenterId" className="d-flex">
                      اختيار المكان
                    </label>
                    <TextField
                      id="salesCenterId"
                      select
                      name="salesCenterId"
                      size="small"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="">اختر المكان</option>
                      
                    </TextField>
                    
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="image" className="d-flex">
                        اضافة صورة
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        aria-describedby="imageHelp"
                      />
                      
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary mt-4">
                حفظ
              </button>
            </form>
          </div>
        </div>
      </Box>
    </div>
  );
}
